import { Component, render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { AllCardsPage } from './pages/all-cards-page/all-cards-page.js';
import { DuelPage } from './pages/duel-page/duel-page.js';
import { HomePage } from './pages/home-page/home-page.js';
import { MyDeckPage } from './pages/my-deck-page/my-deck-page.js';
import { StorePage } from './pages/store-page/store-page.js';
import { NotFoundPage } from './pages/_404.jsx';
import './style.css';
import { GameState } from './state/game-state.js';

interface AppComponentState {
  gameState?: GameState;
}

class AppComponent extends Component<{}, AppComponentState> {

  async componentDidMount(): Promise<void> {
    const gameState = await GameState.loadGameState();
    this.setState({ gameState });
  }

  render() {
    const { gameState } = this.state as AppComponentState;

    if (!gameState) {
      return <div>Loading...</div>;
    }

    return (
      <LocationProvider>
        <main>
          <Router>
            <Route path="/" component={HomePage} />
            <Route path="/all-cards" component={AllCardsPage} />
            <Route path="/duel" component={DuelPage} gameState={gameState} />
            <Route path="/my-deck" component={MyDeckPage} gameState={gameState} />
            <Route path="/store" component={StorePage} gameState={gameState} />
            <Route default component={NotFoundPage} />
          </Router>
        </main>
      </LocationProvider>
    );
  }
}

render(<AppComponent />, document.getElementById('app'));
