import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { AllCardsPage } from './pages/all-cards-page/all-cards-page.js';
import { DuelPage } from './pages/duel-page/duel-page.js';
import { HomePage } from './pages/home-page/home-page.js';
import { MyDeckPage } from './pages/my-deck-page/my-deck-page.js';
import { StorePage } from './pages/store-page/store-page.js';
import { NotFoundPage } from './pages/_404.jsx';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<main>
				<Router>
          <Route path="/" component={HomePage} />
          <Route path="/all-cards" component={AllCardsPage} />
          <Route path="/duel" component={DuelPage} />
          <Route path="/my-deck" component={MyDeckPage} />
          <Route path="/store" component={StorePage} />
					<Route default component={NotFoundPage} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
