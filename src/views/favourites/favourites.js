import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { CardList } from '../../components/cardlist/cardlist.js';

export class FavouritesView extends AbstractView {
	state = {
		list: [],
		numFound: 0,
		loading: false,
		searchQuery: undefined,
		offset: 0
	}

	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.setTitle('Мои книги');
	}

	destroy() {
		onChange.unsubscribe(this.appState)
	}

	appStateHook(path) {
		if (path === 'favourites') {
			this.render();
		}
	}

	render() {
		const main = document.createElement('div');
		main.innerHTML = `
			<h1>Избранное</h1>
		`
		main.append(new CardList(this.appState, { list: this.appState.favourites }).render())
		this.app.innerHTML = '';
		this.app.append(main);
		this.renderHeader();
	}

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	}
}