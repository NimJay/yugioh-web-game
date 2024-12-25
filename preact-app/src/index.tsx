import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { AllCards } from './pages/AllCards/index.jsx';
import { Duel } from './pages/Duel/index.jsx';
import { Home } from './pages/Home/index.jsx';
import { MyDeck } from './pages/MyDeck/index.jsx';
import { Store } from './pages/Store/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
          <Route path="/" component={Home} />
          <Route path="/all-cards" component={AllCards} />
          <Route path="/duel" component={Duel} />
          <Route path="/my-deck" component={MyDeck} />
          <Route path="/store" component={Store} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
