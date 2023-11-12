import { movieDb } from '../db/movieDb.js';
import Pagination from './pagination.js';

export default {
	props: ['actor'],
	data() {
		return {
			actorInfo: null,
			castMovies: [],
		};
	},
	components: {
		Pagination,
	},
	async created() {
		const response = await movieDb.fetch(`detail/name/${this.actor.id}/`);
		this.actorInfo = await response.item;
		if (response.item.length !== 0) {
			response.item?.castMovies.map(async (movie) => {
				const foundMovie = await movieDb.fetch(
					`detail/movie/${movie.id}/`
				);
				if (foundMovie.item.length !== 0) {
					this.castMovies.push(foundMovie.item);
				}
			});
		}
	},
	template: ` 
    <div class="container my-5">
        <div class="row">
            <div class="col-md-4">
                <!-- Actor Poster -->
                <img v-if="actor?.image" :src="actor?.image" alt="Actor Poster" class="img-fluid w-100 h-100" style="object-fit: contain">
            </div>
            <div class="col-md-8 my-2" style="background-color: #343a40; color: #ffffff; padding: 20px;opacity: 0.8;">
                <!-- Actor Details -->
                <h2 class="mb-4">{{actor?.name}}</h2>
                <p v-if="actor?.asCharacter"><strong>As character:</strong> {{actor?.asCharacter}}</p>
                <div v-if="actorInfo">
                    <p><strong>Birthday:</strong> {{actorInfo?.birthDate || "Update soon ..."}}</p>
                    <p v-if="actorInfo?.deathDate"><strong>Deathday:</strong> {{actorInfo?.deathDate || "Update soon ..."}}</p>
                    <p><strong>Summary:</strong> {{actorInfo?.summary || "Update soon ..."}}</p>
                    <p><strong>Role:</strong> {{actorInfo?.role || "Update soon ..."}}</p>
                    <p><strong>Awards:</strong> {{actorInfo?.awards || "Update soon ..."}}</p>
                </div>
            </div>
        </div>
        <div class="row" v-if="actorInfo?.similars">
            <h2 class="mb-4">Similar Movies:</h2>
            <div v-for="(similar, index) in actorInfo?.similars" :key="index" class="col-md-4 my-3" @click="handleSelectSimilar(similar)" style="cursor: pointer;">
                <img v-if="similar?.image" :src="similar?.image" alt="Similar Image" width="300" height="300" class="rounded">
            </div>
        </div>
        <div class="row" v-if="castMovies.length !== 0">
            <h2 class="mb-4">Cast Movies:</h2>
            <div v-for="(movie, index) in castMovies" :key="index" class="col-md-4 my-3" @click="handleSelectCastMovie(movie)" style="cursor: pointer;">
                <img v-if="movie?.image" :src="movie?.image" alt="Movie Poster" width="300" height="300" class="rounded">
                <p>{{movie?.title}}</p>
            </div>
        </div>
        <!-- Pagination -->
		<div class="col-md-12">
			<Pagination :pages="castMovies.length" @page-change="loadPage" :currentPage="currentPageSearch"/>
		</div>
    </div>
    `,
	watch: {
		actor: {
			immediate: true,
			async handler(newMovie) {
				const response = await movieDb.fetch(
					`detail/actor/${newMovie.id}/`
				);
				this.actorInfo = await response.item;
			},
		},
	},
	methods: {
		handleSelectCastMovie(similar) {
			this.$parent.handleSelectedMovie(similar);
		},
		handleSelectActor(actor) {
			this.$parent.handleSelectedActor(actor);
		},
	},
};
