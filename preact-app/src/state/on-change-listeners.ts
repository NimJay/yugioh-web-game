/*
Since we keep state management classes/functions separate from
the UI components (e.g., we don't manage the game state in Preact state),
we need a way to notify the UI components when the game state changes.
*/

type ListenerFunction = (value: any) => void;

type SubjectId = 'gameState.numOfCoins'
  | 'gameState.currentDuel.currentPhase'
  | 'gameState.currentDuel.p1.deck'
  | 'gameState.currentDuel.p1.hand'
  | 'gameState.currentDuel.p1.lifePoints'
  | 'gameState.currentDuel.p1.monsterZones'
  | 'gameState.currentDuel.p1.spellTrapZones'
  | 'gameState.currentDuel.p1.fieldZone'
  | 'gameState.currentDuel.p1.graveyard'
  | 'gameState.currentDuel.p2.deck'
  | 'gameState.currentDuel.p2.hand'
  | 'gameState.currentDuel.p2.lifePoints'
  | 'gameState.currentDuel.p2.monsterZones'
  | 'gameState.currentDuel.p2.spellTrapZones'
  | 'gameState.currentDuel.p2.fieldZone'
  | 'gameState.currentDuel.p2.graveyard';

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
