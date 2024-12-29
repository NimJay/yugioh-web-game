import { Card } from "./card";

let gameState: GameState;

class GameState {

  numOfCoins: number;
  ownedCards: Card[];
  currentDuel?: Duel;

  // The constructor is private.
  // If you want to create a new GameState, use the createNewGameState method.
  private constructor() {}

  public static async createNewGameState(): Promise<GameState> {
    const gameState = new GameState();
    gameState.numOfCoins = 100.00; // Needed to buy 40 cards
    gameState.currentDuel = undefined;
    gameState.ownedCards = [];
    return gameState;
  }

  public async saveInLocalStorage(): Promise<void> {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

}

async function loadGameState(): Promise<GameState> {
  // Already loaded?
  if (gameState) {
    return gameState;
  }
  // Load from local storage
  const gameStateStr = localStorage.getItem('gameState');
  if (gameStateStr) {
    gameState = JSON.parse(gameStateStr);
  } else {
    // New user. So create gameState from scratch
    gameState = await GameState.createNewGameState();
  }
  return gameState;
}

export { GameState, loadGameState };
