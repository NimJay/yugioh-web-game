/*
The <CurrentEventDiv> is responsible for displaying the most
central and current event taking place during the Duel.
It maintains a queue of components (per event).
Events include phase changes, card activations, and monster summonings.
In some cases, events may come (from the Duel/state) at a faster rate
than we can (in a user-friendly way) display them. That's expected.
*/

import { Component, JSX } from "preact";
import { registerOnChangeListener, unregisterOnChangeListener } from "../../state/on-change-listeners";
import { Duel, Phase } from "../../state/duel";
import "./current-event-div.css";

interface CurrentEventDivProps {
  duel: Duel;
}

// <CurrentEventDiv> maintains a queue of components (per event)
// that it presents to the user.
interface ComponentInQueue {
  // Depending on the event, the contents of the <CurrentEventDiv> will vary.
  // For instance, a card activation will need to display an image while
  // a phase change will not. So we maintain a queue of components — rather
  // than a queue of strings describing the event. In other words, the queue
  // is designed to be flexible.
  component: JSX.Element;
  millisecondsOnDisplay: number;
}

interface CurrentEventDivState {
  childComponentsQueue: ComponentInQueue[];
}

class CurrentEventDiv extends Component<CurrentEventDivProps, CurrentEventDivState> {

  constructor(props: CurrentEventDivProps) {
    super(props);
    this.state = {
      childComponentsQueue: [],
    };
    this.onPhaseChange = this.onPhaseChange.bind(this);
    this.queueChildComponentAndEnsureDequeue =
      this.queueChildComponentAndEnsureDequeue.bind(this);
    this.resumeDequeuingChildComponents =
      this.resumeDequeuingChildComponents.bind(this);
  }

  componentDidMount() {
    registerOnChangeListener(
      'gameState.currentDuel.currentPhase',
      this.onPhaseChange,
    );
  }

  componentWillUnmount(): void {
    unregisterOnChangeListener(
      'gameState.currentDuel.currentPhase',
      this.onPhaseChange,
    );
  }

  onPhaseChange(newPhase: Phase): void {
    const { duel } = this.props;
    let paragraph: string;
    const isUserTurn = duel.currentTurnPlayer === duel.p1;
    switch (newPhase) {
      case Phase.DRAW:
        paragraph = 'Draw Phase: ';
        if (isUserTurn) {
          paragraph += `You draw 1 card.`;
        } else {
          paragraph += `${duel.p2.name} draws 1 card.`;
        }
        break;
      case Phase.STANDBY:
        paragraph = 'Standby Phase';
        break;
      case Phase.MAIN_1:
        paragraph = 'Main Phase 1';
        break;
      case Phase.BATTLE:
        paragraph = 'Battle Phase';
        break;
      case Phase.MAIN_2:
        paragraph = 'Main Phase 2';
        break;
      case Phase.END:
        paragraph = 'End Phase: ';
        if (isUserTurn) {
          paragraph += `You end your turn.`;
        } else {
          paragraph += `${duel.p2.name} ends their turn.`;
        }
        break;
    }
    const childComponent = <ParagraphDiv paragraph={paragraph} />;
    this.queueChildComponentAndEnsureDequeue(childComponent, 2500);
  }

  queueChildComponentAndEnsureDequeue(
    component: JSX.Element, millisecondsOnDisplay: number,
  ): void {
    const { childComponentsQueue } = this.state;
    childComponentsQueue.push({ component, millisecondsOnDisplay });
    this.setState(
      { childComponentsQueue },
      () => {
        // If this component is the first element in the queue, then
        // it means there's no dequeueing currently in progress.
        // This also ensures that when multiple events are queued at the same time,
        // only the first event will resume dequeuing.
        const firstChildComponent = childComponentsQueue[0].component;
        const shouldDequeuingResumeHere = firstChildComponent === component;
        if (shouldDequeuingResumeHere) {
          this.resumeDequeuingChildComponents();
        }
      },
    );
  }

  resumeDequeuingChildComponents(): void {
    const { childComponentsQueue } = this.state;
    const firstChild = childComponentsQueue[0];
    setTimeout(
      () => {
        // Dequeue the first element in the queue.
        childComponentsQueue.shift();
        const shouldKeepDequeuing = childComponentsQueue.length > 0;
        this.setState(
          { childComponentsQueue },
          () => {
            if (shouldKeepDequeuing) {
              this.resumeDequeuingChildComponents();
            }
          }
        );
      },
      firstChild.millisecondsOnDisplay,
    );
  }

  render() {
    const { childComponentsQueue } = this.state;
    if (childComponentsQueue.length === 0) {
      return null;
    }
    return (
      <div class="CurrentEventDiv">
        {childComponentsQueue[0].component}
      </div>
    );
  }
}

function ParagraphDiv(props: { paragraph: string }) {
  return (
    <div class="CurrentEventDivParagraphDiv">
      <p>{props.paragraph}</p>
    </div>
  );
}

export { CurrentEventDiv };
