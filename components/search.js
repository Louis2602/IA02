import Pagination from './pagination.js';

export default {
	props: ['movies', 'currentPageSearch'],
	components: { Pagination },
	template: `
    <div class="container my-4">
        <div class="row">
            <div v-for="(movie, index) in movies.items" :key="index" class="col-md-4 my-3"> 
                <div class="card h-100" style="width: 350px;">
                    <img :src="movie.image" class="card-img-top" alt="Movie Poster">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center">
                        <h5 class="card-title">{{ movie.fullTitle }}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div> 
            </div>
        </div>
        <!-- Pagination -->
		<div class="col-md-12">
			<Pagination :pages="movies.total_page" @page-change="loadPage" :currentPage="currentPageSearch"/>
		</div>
    </div>
    `,
	methods: {
		loadPage(page) {
			this.$emit('page-change', page);
		},
	},
};
