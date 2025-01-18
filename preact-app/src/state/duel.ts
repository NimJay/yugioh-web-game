import { Card } from "./card";
import { notifyOnChangeListeners } from "./on-change-listeners";

enum Phase {
  DRAW = 'DRAW',
  STANDBY = 'STANDBY',
  MAIN_1 = 'MAIN_1',
  BATTLE = 'BATTLE',
  MAIN_2 = 'MAIN_2',
  END = 'END',
}

interface Zone {
  card?: Card;
  isCardFaceUp: boolean;
}

interface Player {
  name: string; // If this is "User", then it's the user.
  lifePoints: number;
  deck: Card[];
  hand: Card[];
  monsterZones: Zone[];
  spellTrapZones: Zone[];
  fieldZones: Zone;
  graveyard: Card[];
  banished: Card[];
}

class Duel {

  p1: Player;
  p2: Player;
  currentTurnPlayer: Player;
  currentPhase: Phase = Phase.DRAW;

  // Use createNewDuel() to create a new Duel.
  private constructor() { }

  public static createNewDuel(
    p1Name: string,
    p2Name: string,
    p1Deck: Card[],
    p2Deck: Card[],
    isP1First = true,
  ): Duel {
    const duel = new Duel();
    duel.p1 = {
      name: p1Name,
      lifePoints: 4000,
      deck: p1Deck,
      hand: [],
      monsterZones: duel.createZones(5),
      spellTrapZones: duel.createZones(5),
      fieldZones: duel.createZones(5)[0],
      graveyard: [],
      banished: [],
    };
    duel.p2 = {
      name: p2Name,
      lifePoints: 4000,
      deck: p2Deck,
      hand: [],
      monsterZones: duel.createZones(5),
      spellTrapZones: duel.createZones(5),
      fieldZones: duel.createZones(5)[0],
      graveyard: [],
      banished: [],
    };
    Duel.shuffleDeck(duel.p1.deck);
    Duel.shuffleDeck(duel.p2.deck);
    for (let i = 0; i < 5; i++) {
      duel.p1.hand.push(duel.p1.deck.pop());
      duel.p2.hand.push(duel.p1.deck.pop());
    }
    duel.currentTurnPlayer = isP1First ? duel.p1 : duel.p2;
    return duel;
  }

  private static shuffleDeck(deck: Card[]): void {
    deck.sort(() => Math.random() - 0.5);
  }

  public static buildDuelFromParsedJsonObject(object: object): Duel {
    return Object.assign(new Duel(), object);
  }

  private createZones(numOfZones: number): Zone[] {
    const zones = [];
    for (let i = 0; i < numOfZones; i++) {
      zones.push({ card: undefined, isCardFaceUp: false });
    }
    return zones;
  }

  public enterNextPhase(): Phase {
    switch (this.currentPhase) {
      case Phase.DRAW:
        this.currentPhase = Phase.STANDBY;
        break;
      case Phase.STANDBY:
        this.currentPhase = Phase.MAIN_1;
        break;
      case Phase.MAIN_1:
        this.currentPhase = Phase.BATTLE;
        break;
      case Phase.BATTLE:
        this.currentPhase = Phase.MAIN_2;
        break;
      case Phase.MAIN_2:
        this.currentPhase = Phase.END;
        break;
      case Phase.END:
        this.currentPhase = Phase.DRAW;
        this.currentTurnPlayer = this.currentTurnPlayer === this.p1
          ? this.p2
          : this.p1;
        break;
    }
    notifyOnChangeListeners(
      'gameState.currentDuel.currentPhase',
      this.currentPhase,
    );
    return this.currentPhase;
  }

}

export { Duel, Phase };
