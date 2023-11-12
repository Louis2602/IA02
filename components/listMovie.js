import MovieDetail from './movie-detail.js';
import { movieDb } from '../db/movieDb.js';

export default {
	props: ['title', 'type'],
	data() {
		return {
			movies: [],
			currentSlideIndex: 0,
			selectedMovie: null,
		};
	},
	async created() {
		await this.getMoviesForSlide(this.currentSlideIndex);
	},
	components: { MovieDetail },

	template: `
        <div class="column my-4 position-relative">
            <h3>{{ title }}</h3>
            <div :id="type" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner" id="three-carousel-inner">
					<div class="carousel-item active d-flex flex-row" style="cursor: pointer" @click="showMovieDetail(movie)">
						<div class="mx-auto" v-for="(movie, index) in movies.items" :key="index">
							<img v-if="movie.image" :src="movie.image" class="d-block rounded" alt="Movie Poster" style="width: 400px; height: 200px;">
						</div>
					</div>
                </div>
                <button class="carousel-control-prev carousel-dark" type="button" :data-bs-target="'#'+type" data-bs-slide="prev" @click="prevSlide">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next carousel-dark" type="button" :data-bs-target="'#'+type" data-bs-slide="next" @click="nextSlide">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
				<MovieDetail :movie="selectedMovie" />
        </div> 
    `,
	methods: {
		async nextSlide() {
			console.log('next');
			let newSlideIndex = this.currentSlideIndex + 1;
			if (newSlideIndex >= this.movies.total_page) {
				newSlideIndex = 0; // Loop back to the first slide if we've reached the end
			}
			await this.getMoviesForSlide(newSlideIndex);
		},

		// Method to navigate to the previous slide and fetch data
		async prevSlide() {
			console.log('prev');
			let newSlideIndex = this.currentSlideIndex - 1;
			if (newSlideIndex < 0) {
				newSlideIndex = this.movies.total_page - 1; // Loop to the last slide if we've reached the beginning
			}
			await this.getMoviesForSlide(newSlideIndex);
		},
		async getMoviesForSlide(slideIndex) {
			// Fetch movies for the given slide index
			const response = await movieDb.fetch(
				`get/${this.type}/?per_page=3&page=${slideIndex + 1}`
			);
			this.movies = response || [];
			this.currentSlideIndex = slideIndex; // Update the current slide index
		},
		showMovieDetail(movie) {
			this.selectedMovie = movie;
		},
	},
};
