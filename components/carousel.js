export default {
	props: ['movies', 'darkMode'],
	template: `
    <div id="movie-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button v-for="(movie, index) in movies.items" :key="index" type="button" data-bs-target="#movie-carousel" :data-bs-slide-to="index" :class="{ 'active': index === 0 }" aria-current="true" :aria-label="'Slide ' + (index + 1)"></button>
        </div>
        <div class="carousel-inner">
            <div v-for="(movie, index) in movies.items" :key="index" class="carousel-item" :class="{ 'active': index === 0 }">
                <img v-if="movie.movie.image" :src="movie.movie.image" class="d-block mx-auto rounded my-2" alt="Movie Poster" style="max-width: 400px; max-height: 800px; object-fit: contain;">
                <div class="carousel-caption d-none d-md-block text-wrap"           style="max-width: 400px; margin: auto;">
                    <h5 style="color: var(--text-yellow-color)">{{ movie.movie.fullTitle }}</h5>
                    <p style="color: var(--text-yellow-color)">[{{ movie.movie.genreList.map(genre => genre.key).join(', ') }}]</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev carousel-dark" type="button" data-bs-target="#movie-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next carousel-dark" type="button" data-bs-target="#movie-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `,
};
