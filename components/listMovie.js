import { movieDb } from '../db/movieDB.js';

export default {
	props: ['movies', 'title', 'type'],
	data() {
		return {
			localMovies: [],
		};
	},
	created() {
		this.localMovies = this.movies.items;
	},

	template: `
        <div class="column my-4 position-relative">
            <h3>{{ title }}</h3>
            <div :id="type" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button v-for="(movie, index) in localMovies" :key="index" type="button" :data-bs-target="'#'+type" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide ' + (index + 1)"></button>
                </div>
                <div class="carousel-inner d-flex flex-row" id="three-carousel-inner">
					<div v-for="(movie, index) in localMovies" :key="index" class="carousel-item mx-auto" :class="{ 'active': index === 0 }">
						<img v-if="movie.image" :src="movie.image" class="d-block mx-auto rounded" alt="Movie Poster" style="width: 400px; height: 200px;">
                    </div>
                </div>
                <button class="carousel-control-prev carousel-dark" type="button" :data-bs-target="'#'+type" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next carousel-dark" type="button" :data-bs-target="'#'+type" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div> 
    `,
	async mounted() {
		$(`#${this.type}`).on('slide.bs.carousel', async (event) => {
			const slideIndex = event.to;
			const response = await this.getItemsForSlide(slideIndex);
			this.localMovies = response;
		});
	},
	watch: {
		movies: {
			immediate: true,
			handler(newMovies) {
				this.localMovies = newMovies.items;
			},
		},
	},
	methods: {
		async handleSlide(event) {
			const slideIndex = event.to;
			const response = await this.getItemsForSlide(slideIndex);
			this.localMovies = response;
		},
		async getItemsForSlide(slideIndex) {
			const response = await movieDb.fetch(
				`get/${this.type}/?per_page=3&page=${slideIndex + 1}`
			);
			return response.items || [];
		},
	},
};
