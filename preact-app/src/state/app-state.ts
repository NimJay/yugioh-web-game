import { Card } from "./card";

let appState: AppState;

interface AppState {
  numOfCoins: number;
  ownedCards: Card[];
  currentDuel?: Duel;
}

async function getAppState(): Promise<AppState> {
  // Already loaded?
  if (appState) {
    return appState;
  }
  // Load from local storage
  const appStateStr = localStorage.getItem('appState');
  if (appStateStr) {
    appState = JSON.parse(appStateStr);
  } else {
    // New user. So create AppState from scratch
    appState = {
      numOfCoins: 100.00, // Needed to buy 40 cards
      currentDuel: undefined,
      ownedCards: []
    };
  }
  return appState;
}

async function saveAppState(): Promise<void> {
  localStorage.setItem('appState', JSON.stringify(appState));
}

export { getAppState, saveAppState };
