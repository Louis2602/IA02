import Carousel from './carousel.js';
import { movieDb } from '../db/movieDb.js';

export default {
	props: ['type'],
	data() {
		return {
			movies: [],
		};
	},
	async created() {
		this.movies = await movieDb.fetch(`get/${this.type}/`);
	},
	components: { Carousel },
	template: `
        <div class="column">
            <Carousel :movies="movies" @selected-movie="handleSelectedMovie"/>
        </div>    
    `,
	methods: {
		handleSelectedMovie(movie) {
			this.$emit('selected-movie', movie);
		},
	},
};
