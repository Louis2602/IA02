import Header from './components/header.js';
import Nav from './components/nav.js';
import Footer from './components/footer.js';
import Content from './components/content.js';
import { movieDb } from './db/movieDB.js';
import { computed } from 'vue';

export default {
	data() {
		return {
			topBoxOfficeData: {},
			mostPopularData: {},
			topRaingData: {},
		};
	},
	components: {
		Header,
		Nav,
		Footer,
		Content,
	},
	prodiver() {
		return {
			topBoxOfficeData: computed(() => this.topBoxOfficeData),
			mostPopularData: computed(() => this.mostPopularData),
			topRatingData: computed(() => this.topRatingData),
		};
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
				console.log(this.mostPopularData);

				this.topRaingData = await movieDb.fetch(
					'get/top50/?per_page=3&page=1'
				);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		},
	},
	async mounted() {
		await this.fetchData();
	},
	template: `
	<div class="container p-2" style="width: 1200px;">
		<Header/>
		<Nav/>
		<Content :topBoxOfficeData="topBoxOfficeData" :mostPopularData="mostPopularData" :topRatingData="topRatingData"/>
        <Footer/>
    </div>
    `,
};
