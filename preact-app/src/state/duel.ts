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
  extraDeck: Card[]; // Fusion cards, etc.
  hand: Card[];
  monsterZones: Zone[];
  spellTrapZones: Zone[];
  fieldCard?: Card;
  graveyard: Card[];
  banished: Card[];
  number: 1 | 2;
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
      extraDeck: [], // TODO: Add parameter to createNewDuel()
      hand: [],
      monsterZones: duel.createZones(5),
      spellTrapZones: duel.createZones(5),
      graveyard: [],
      banished: [],
      number: 1,
    };
    duel.p2 = {
      name: p2Name,
      lifePoints: 4000,
      deck: p2Deck,
      extraDeck: [], // TODO: Add parameter to createNewDuel()
      hand: [],
      monsterZones: duel.createZones(5),
      spellTrapZones: duel.createZones(5),
      graveyard: [],
      banished: [],
      number: 2,
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

  private waitForActivationsToComplete(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        // TODO: Implement waiting for card activations
        // (both existing activations and new player-triggered activations).
        const shouldWaitMore = false;
        if (shouldWaitMore) {
          await this.waitForActivationsToComplete(milliseconds);
        }
        resolve();
      }, milliseconds);
    });
  }

  public async resumeDuel(): Promise<void> {
    switch (this.currentPhase) {
      case Phase.DRAW:
        await this.waitForActivationsToComplete(3000);
        // Caution: Drawing and entering the Standby phase must be atomic
        // (immediately after each other). The user should not be able to
        // exit the page in between (unless we keep track of whether the
        // user has drawn for this phase/turn). We will need to fix this
        // before supporting activations between drawing and entering the
        // Standby phase (e.g., "Just after you draw a card..." effects).
        this.drawCard(this.currentTurnPlayer);
        this.enterNextPhase();
        this.resumeDuel();
        break;
      case Phase.STANDBY:
        await this.waitForActivationsToComplete(3000);
        this.enterNextPhase();
        break;
      case Phase.MAIN_1:
        break;
      case Phase.BATTLE:
        break;
      case Phase.MAIN_2:
        break;
      case Phase.END:
        break;
    }
  }

  public drawCard(player: Player): void {
    if (player.deck.length === 0) {
      this.setLifePoints(player, 0);
    }
    player.hand.push(player.deck.pop());
    notifyOnChangeListeners(
      `gameState.currentDuel.p${player.number}.deck`,
      player.deck,
    );
    notifyOnChangeListeners(
      `gameState.currentDuel.p${player.number}.hand`,
      player.hand,
    );
  }

  public increaseLifePoints(player: Player, amount: number): void {
    const newLifePoints = player.lifePoints + amount;
    this.setLifePoints(player, newLifePoints);
  }

  public reduceLifePoints(player: Player, amount: number): void {
    const newLifePoints = Math.max(0, player.lifePoints - amount);
    this.setLifePoints(player, newLifePoints);
  }

  public setLifePoints(player: Player, lifePoints: number): void {
    player.lifePoints = Math.max(lifePoints, 0);
    notifyOnChangeListeners(
      `gameState.currentDuel.p${player.number}.lifePoints`,
      lifePoints,
    );
    if (player.lifePoints === 0) {
      this.pauseDuel();
    }
  }

  public pauseDuel(): void {
    // TODO: Implement this.
  }

  public enterNextPhase(): Phase {
    const phaseBefore = this.currentPhase;
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
    const didPhaseChange = phaseBefore !== this.currentPhase;
    if (didPhaseChange) {
      console.log(`Entering next phase: ${this.currentPhase}.`);
      notifyOnChangeListeners(
        'gameState.currentDuel.currentPhase',
        this.currentPhase,
      );
    }
    return this.currentPhase;
  }

  /**
   * Check if a given card can be summoned right now.
   */
  public canSummonCard(card: Card): boolean {
    // TODO: Eventually check for card effects preventing summoning
    const hasAvailableMonsterZone = this.p1.monsterZones.some(zone => !zone.card);
    const isMonster = [
      'Normal Monster', 'Effect Monster', 'Flip Effect Monster',
    ].includes(card.type)
    if (card.level > 4) {
      // TODO: Support summoning of high-level monsters by checking field
      return false;
    }
    return isMonster
      && this.currentTurnPlayer === this.p1
      && hasAvailableMonsterZone
      && [Phase.MAIN_1, Phase.MAIN_2].includes(this.currentPhase);
  }

  public canSetMonsterCard(card: Card): boolean {
    return this.canSummonCard(card);
  }

}

export { Duel, Phase, Zone };
