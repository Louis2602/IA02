import { movieDb } from '../db/movieDb.js';

export default {
	props: ['movie'],
	data() {
		return {
			movieInfo: null,
		};
	},
	async created() {
		const response = await movieDb.fetch(`detail/movie/${this.movie.id}/`);
		this.movieInfo = await response.item;
	},
	template: ` 
    <div class="container my-5">
        <div :style="{ backgroundImage: 'url(' + movieInfo?.image + ')' }" style="padding: 30px" class="my-4">
            <div class="row">
                <div class="col-md-4">
                    <!-- Movie Poster -->
                    <img v-if="movieInfo?.image" :src="movieInfo?.image" alt="Movie Poster" class="img-fluid w-100 h-100" style="object-fit: contain">
                </div>
                <div class="col-md-8 my-2" style="background-color: #343a40; color: #ffffff; padding: 20px;opacity: 0.8;">
                    <!-- Movie Details -->
                    <h2 class="mb-4">{{movieInfo?.title}}</h2>
                    <p><strong>Rating:</strong> {{movieInfo?.ratings?.imDb}}</p>
                    <p v-if="movieInfo?.languages"><strong>Languages:</strong> {{movieInfo?.languages}}</p>
                    <p v-if="movieInfo?.releaseDate"><strong>Release Date:</strong> {{movieInfo?.releaseDate}}</p>
                    <p v-else><strong>Release Year:</strong> {{movieInfo?.year}}</p>
                    <p v-if="movieInfo?.runtimeStr"><strong>Length:</strong> {{movieInfo?.runtimeStr}}</p>
                    <p><strong>Genre:</strong> {{movieInfo?.genreList.map(genre => genre.key).join(', ') }}</p>
                    <p><strong>Plot:</strong> {{movieInfo?.plot}}</p>
                    <p><strong>Director:</strong> {{movieInfo?.directorList.map(dir => dir.name).join(', ') }}</p>
                    <p v-if="movieInfo?.writerList"><strong>Writer:</strong> {{movieInfo?.writerList.map(wri => wri.name).join(', ') }}</p>
                    <p v-if="movieInfo?.companies"><strong>Companies:</strong> {{movieInfo?.companies }}</p>
                    <p v-if="movieInfo?.keywords"><strong>Keywords:</strong> {{movieInfo?.keywords}}</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="movieInfo?.plotFull">
            <h2 class="mb-4">Summary:</h2>
            <div v-html="movieInfo?.plotFull"></div>
        </div>
        <div class="row">
            <h2 class="mb-4">Cast:</h2>
            <div v-for="(cast, index) in movieInfo?.actorList" :key="index" class="col-md-2 my-3 text-center" @click="handleSelectActor(cast)" style="cursor: pointer;">
                <img v-if="cast?.image" :src="cast?.image" alt="Cast Image" width="100" height="100" class="rounded-circle">
                <p>{{cast?.name}}</p>
            </div>
        </div>
        <div class="row" v-if="movieInfo?.similars">
            <h2 class="mb-4">Similar Movies:</h2>
            <div v-for="(similar, index) in movieInfo?.similars" :key="index" class="col-md-4 my-3 text-center" @click="handleSelectSimilar(similar)" style="cursor: pointer;">
                <img v-if="similar?.image" :src="similar?.image" alt="Similar Image" width="300" height="300" class="rounded">
                <p>{{movie?.title}}</p>
            </div>
        </div>
    </div>
    `,
	watch: {
		movie: {
			immediate: true,
			async handler(newMovie) {
				const response = await movieDb.fetch(
					`detail/movie/${newMovie.id}/`
				);
				this.movieInfo = await response.item;
			},
		},
	},
	methods: {
		handleSelectSimilar(similar) {
			this.$parent.handleSelectedMovie(similar);
		},
		handleSelectActor(actor) {
			this.$parent.handleSelectedActor(actor);
		},
	},
};
