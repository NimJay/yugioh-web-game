/*
Since we keep state management classes/functions separate from
the UI components (e.g., we don't manage the game state in Preact state),
we need a way to notify the UI components when the game state changes.
*/

type ListenerFunction = (value: any) => void;

type SubjectId = 'gameState.numOfCoins'
  | 'gameState.currentDuel.currentPhase';

const onChangeListenersMap: Map<SubjectId, ListenerFunction[]> = new Map();

function registerOnChangeListener(
  subjectId: SubjectId,
  listenerFunction: ListenerFunction,
): void {
  if (!onChangeListenersMap.has(subjectId)) {
    onChangeListenersMap.set(subjectId, []);
  }
  onChangeListenersMap.get(subjectId).push(listenerFunction);
}

function notifyOnChangeListeners(
  subjectId: SubjectId,
  value: any,
): void {
  const listeners = onChangeListenersMap.get(subjectId);
  if (listeners) {
    for (const listener of listeners) {
      listener(value);
    }
  }
}

function unregisterOnChangeListener(
  subjectId: SubjectId,
  listenerFunction: ListenerFunction,
): void {
  const listeners = onChangeListenersMap.get(subjectId);
  if (listeners) {
    const index = listeners.indexOf(listenerFunction);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
}

export {
  registerOnChangeListener,
  notifyOnChangeListeners,
  unregisterOnChangeListener,
};
