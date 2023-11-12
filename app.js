import Header from './components/header.js';
import Nav from './components/nav.js';
import Footer from './components/footer.js';
import Content from './components/content.js';
import Search from './components/search.js';
import MovieDetail from './components/movie-detail.js';
import ActorDetail from './components/actor-detail.js';
import Loading from './components/loading.js';
import { movieDb } from './db/movieDb.js';

export default {
	data() {
		return {
			topBoxOfficeData: {},
			darkMode: false,
			searchData: {},
			page: 'home',
			currentPageSearch: 1,
			searchInput: '',
			selectedMovie: null,
			selectedActor: null,
			loading: true,
		};
	},
	components: {
		Header,
		Nav,
		Footer,
		Content,
		Search,
		MovieDetail,
		ActorDetail,
		Loading,
	},
	methods: {
		handleDarkTheme(isDarkTheme) {
			this.darkMode = isDarkTheme;
			if (isDarkTheme) {
				$('#app').css({
					'background-color': 'var(--dark-background-color)',
					color: 'white',
				});
				$(
					'.carousel-control-prev-icon, .carousel-control-next-icon'
				).css({
					filter: 'invert(0%)',
				});
			} else {
				$('#app').css({
					'background-color': 'var(--light-background-color)',
					color: 'black',
				});
				$(
					'.carousel-control-prev-icon, .carousel-control-next-icon'
				).css({
					filter: 'invert(100%)',
				});
			}
		},
		async handleSearch(searchInput, page) {
			this.page = page;
			this.searchInput = searchInput;
			let response;
			response = await movieDb.fetch(
				`search/movie/${searchInput}?per_page=6&page=${this.currentPageSearch}`
			);

			this.searchData = response;
			// Not found by movie name then maybe it's an actor name
			if (this.searchData.total === 0) {
				response = await movieDb.fetch(
					`search/name/${searchInput}?per_page=6&page=${this.currentPageSearch}`
				);
				this.searchData = response;
			}
		},
		async changePage(page) {
			this.currentPageSearch = page;
			await this.handleSearch(this.searchInput, this.page);
		},
		handleSelectedMovie(movie) {
			this.selectedMovie = movie;
			this.page = 'movie-detail';
		},
		handleSelectedActor(actor) {
			this.selectedActor = actor;
			this.page = 'actor-detail';
		},
	},
	mounted() {
		setTimeout(() => {
			this.loading = false;
		}, 2000);
	},
	watch: {
		page(newPage) {
			if (newPage === 'home') {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
				}, 2000);
			}
		},
	},
	template: `
	<div class="container p-2" style="width: 1200px;">
		<Loading v-if="page==='home' && loading"/>
		<Header @dark-mode="handleDarkTheme"/>
		<Nav :darkMode="darkMode" @search="handleSearch"/>
		<div style="min-height: 100vh;">
			<Content v-if="page==='home'" @selected-movie="handleSelectedMovie"/>
			<Search v-else-if="page==='search'" :movies="searchData" :currentPageSearch="currentPageSearch" @page-change="changePage"/>
			<MovieDetail v-else-if="page==='movie-detail'" :movie="selectedMovie"/>
			<ActorDetail v-else-if="page==='actor-detail'" :actor="selectedActor"/>
		</div>
		<Footer :darkMode="darkMode"/>
    </div>
    `,
};
