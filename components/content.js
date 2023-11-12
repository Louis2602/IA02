import HighestRevenueMovie from './highestRevenueMovie.js';
import ListMovie from './listMovie.js';

export default {
	components: { HighestRevenueMovie, ListMovie },
	template: `
        <div class="column mb-lg-5">
            <HighestRevenueMovie :type="'topboxoffice'" @selected-movie="handleSelectedMovie"/>
            <ListMovie :title="'Most Popular'" :type="'mostpopular'" @selected-movie="handleSelectedMovie"/>
            <ListMovie :title="'Top Rating'" :type="'top50'" @selected-movie="handleSelectedMovie"/>
        </div>
    `,
	methods: {
		handleSelectedMovie(movie) {
			this.$emit('selected-movie', movie);
		},
	},
};
