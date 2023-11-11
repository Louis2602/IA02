import { movieDb } from '../db/movieDB.js';

export default {
	props: ['movies', 'title'],
	data() {
		return {
			localMovies: [],
		};
	},
	template: `
        <div class="column my-2 position-relative">
            <h3>{{ title }}</h3>
            <div id="popular-movie-carousel" class="carousel slide" data-bs-ride="carousel" @slid.bs.carousel="onSlideChange">
                <div class="carousel-indicators">
                    <button v-for="(movie, index) in movies.items" :key="index" type="button" data-bs-target="#popular-movie-carousel" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide ' + (index + 1)"></button>
                </div>
                <div class="carousel-inner" id="three-carousel-inner">
					<div v-for="(movieItem, index) in movies.items" :key="index" class="carousel-item" :class="{ 'active': index === 0 }">
						<div class="d-flex justify-content-around">
							<div v-for="(innerMovie, innerIndex) in getItemsForSlide(index)" :key="innerIndex" class="carousel-item-inner">
								<img v-if="innerMovie.image" :src="innerMovie.image" class="d-block mx-auto rounded" alt="Movie Poster" style="width: 400px; height: 200px;">
							</div>
						</div>
					</div>
                </div>
                <button class="carousel-control-prev carousel-dark" type="button" data-bs-target="#popular-movie-carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next carousel-dark" type="button" data-bs-target="#popular-movie-carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
        </div> 
    `,
	methods: {
		async onSlideChange(event) {
			const slideIndex = event.to;
			const response = await this.getItemsForSlide(slideIndex);
			this.localMovies = response;
			const propKey = 'movies';
			this.$set(this, propKey, response);
		},
		async getItemsForSlide(slideIndex) {
			const response = await movieDb.fetch(
				`get/mostpopular/?per_page=3&page=${slideIndex + 1}`
			);

			response.items.map((a) => {
				console.log(a);
			});

			return response.items || [];
		},
	},
};
