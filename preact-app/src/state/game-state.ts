import { Card } from "./card";
import { Duel } from "./duel";
import { notifyOnChangeListeners } from "./on-change-listeners";

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

  public static async loadGameState(): Promise<GameState> {
    // Already loaded?
    if (gameState) {
      return gameState;
    }
    // Load from local storage
    const gameStateStr = localStorage.getItem('gameState');
    if (gameStateStr) {
      gameState = JSON.parse(gameStateStr);
      gameState = Object.assign(new GameState(), gameState);
      if (gameState.currentDuel) {
        gameState.currentDuel = Duel.buildDuelFromParsedJsonObject(gameState.currentDuel);
      }
    } else {
      // New user. So create gameState from scratch
      gameState = await GameState.createNewGameState();
    }
    return gameState;
  }

  public updateNumOfCoins(numOfCoins: number): void {
    this.numOfCoins = numOfCoins;
    notifyOnChangeListeners('gameState.numOfCoins', this.numOfCoins);
  }

}

export { GameState };
