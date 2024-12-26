import './home-page.css';

function HomePage() {
	return (
		<div className="HomePage">
			<section>
        <a href="/duel">Duel</a>
        <a href="/my-deck">My deck</a>
        <a href="/store">Buy cards</a>
        <a href="/all-cards">Browse all cards</a>
			</section>
		</div>
	);
}

export { HomePage };
