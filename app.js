import Header from './components/header.js';
import Nav from './components/nav.js';
import Footer from './components/footer.js';
import Content from './components/content.js';
import { movieDb } from './db/movieDB.js';

export default {
	data() {
		return {
			topBoxOfficeData: {},
			mostPopularData: {},
			topRatingData: {},
			darkMode: false,
		};
	},
	components: {
		Header,
		Nav,
		Footer,
		Content,
	},
	methods: {
		async fetchData() {
			try {
				this.topBoxOfficeData = await movieDb.fetch(
					'get/topboxoffice/'
				);
				this.mostPopularData = await movieDb.fetch(
					'get/mostpopular/?per_page=3&page=1'
				);

				this.topRatingData = await movieDb.fetch(
					'get/top50/?per_page=3&page=1'
				);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		},
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
		handleSearch(form) {
			const searchInput = form.searchInput;
			console.log(searchInput);
		},
	},
	async mounted() {
		await this.fetchData();
	},
	template: `
	<div class="container p-2" style="width: 1200px;">
		<Header @dark-mode="handleDarkTheme"/>
		<Nav :darkMode="darkMode" @submit="handleSearch"/>
		<Content :topBoxOfficeData="topBoxOfficeData" :mostPopularData="mostPopularData" :topRatingData="topRatingData" :darkMode="darkMode"/>
        <Footer :darkMode="darkMode"/>
    </div>
    `,
};
