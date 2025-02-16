/**
 * @fileoverview This file contains the <PlaymatsDiv> component.
 * It's called "Playmats..." instead of "Playmat..." because it contains both players' playmats.
 */

import { Component } from "preact";
import { Card } from "../../state/card";
import './playmats-div.css';
import { Duel, Phase, Zone } from "../../state/duel";
import { registerOnChangeListener, unregisterOnChangeListener } from "../../state/on-change-listeners";
import { CurrentEventDiv } from "./current-event-div";

interface PlaymatsDivProps {
  duel: Duel;
  onMouseEnterCard: (card: Card) => void;
}

interface PlaymatsDivState {
  currentPhase: Phase;
  isUserTurn: boolean;
}

function PlaymatZoneDiv(props: { zone?: Zone, cards?: Card[], isRotated?: boolean }) {
  const { zone, cards, isRotated } = props;
  return (
    <div className="PlaymatZoneDiv">
      <img src={isRotated ? "/public/card-back-rotated-90.png" : "/public/card-back.png"} />
    </div>
  );
}

class PlaymatsDiv extends Component<PlaymatsDivProps, PlaymatsDivState> {

  constructor(props: PlaymatsDivProps) {
    super(props);
    const { duel } = props;
    this.state = {
      currentPhase: duel.currentPhase,
      isUserTurn: duel.currentTurnPlayer === duel.p1,
    };
    // TODO: Add listener for monsterZones (for each player)
    // TODO: Add listener for spellTrapZones (for each player)
    // TODO: Add listener for fieldCard (for each player)
    // TODO: Add listener for graveyard (for each player)
    this.onPhaseChange = this.onPhaseChange.bind(this);
  }

  componentDidMount(): void {
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

  onPhaseChange(): void {
    const { duel } = this.props;
    const isUserTurn = duel.currentTurnPlayer === duel.p1;
    this.setState({
      currentPhase: duel.currentPhase,
      isUserTurn,
    });
  }

  render() {
    const { duel, onMouseEnterCard } = this.props;
    const { currentPhase, isUserTurn } = this.state;
    return (
      <div className="PlaymatsDiv">
        <CurrentEventDiv duel={duel} />
        <div className="PlaymatRowsDiv">
          <div className="PlaymatRowDiv">
            <PlaymatZoneDiv cards={duel.p2.deck} />
            <PlaymatZoneDiv zone={duel.p2.spellTrapZones[4]} />
            <PlaymatZoneDiv zone={duel.p2.spellTrapZones[3]} />
            <PlaymatZoneDiv zone={duel.p2.spellTrapZones[2]} />
            <PlaymatZoneDiv zone={duel.p2.spellTrapZones[1]} />
            <PlaymatZoneDiv zone={duel.p2.spellTrapZones[0]} />
            <PlaymatZoneDiv cards={duel.p2.extraDeck} />
          </div>
          <div className="PlaymatRowDiv">
            <PlaymatZoneDiv cards={duel.p2.graveyard} />
            <PlaymatZoneDiv zone={duel.p2.monsterZones[4]} />
            <PlaymatZoneDiv zone={duel.p2.monsterZones[3]} isRotated={true} />
            <PlaymatZoneDiv zone={duel.p2.monsterZones[2]} />
            <PlaymatZoneDiv zone={duel.p2.monsterZones[1]} />
            <PlaymatZoneDiv zone={duel.p2.monsterZones[0]} />
            <PlaymatZoneDiv cards={[duel.p2.fieldCard]} />
          </div>
          <div className="PlaymatRowDiv">
            <PlaymatZoneDiv cards={[duel.p1.fieldCard]} />
            <PlaymatZoneDiv zone={duel.p1.monsterZones[0]} isRotated={true} />
            <PlaymatZoneDiv zone={duel.p1.monsterZones[1]} />
            <PlaymatZoneDiv zone={duel.p1.monsterZones[2]} />
            <PlaymatZoneDiv zone={duel.p1.monsterZones[3]} isRotated={true} />
            <PlaymatZoneDiv zone={duel.p1.monsterZones[4]} isRotated={true} />
            <PlaymatZoneDiv cards={duel.p1.graveyard} />
          </div>
          <div className="PlaymatRowDiv">
            <PlaymatZoneDiv cards={duel.p1.extraDeck} />
            <PlaymatZoneDiv zone={duel.p1.spellTrapZones[0]} />
            <PlaymatZoneDiv zone={duel.p1.spellTrapZones[1]} />
            <PlaymatZoneDiv zone={duel.p1.spellTrapZones[2]} />
            <PlaymatZoneDiv zone={duel.p1.spellTrapZones[3]} />
            <PlaymatZoneDiv zone={duel.p1.spellTrapZones[4]} />
            <PlaymatZoneDiv cards={duel.p1.deck} />
          </div>
        </div>
      </div>
    );
  }

}

export { PlaymatsDiv };
