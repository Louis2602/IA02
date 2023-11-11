import HighestRevenueMovie from './highestRevenueMovie.js';
import ListMovie from './listMovie.js';

export default {
	props: ['topBoxOfficeData', 'mostPopularData', 'topRatingData', 'darkMode'],
	components: { HighestRevenueMovie, ListMovie },
	template: `
        <div class="column mb-lg-5">
            <HighestRevenueMovie :movies="topBoxOfficeData" :darkMode="darkMode"/>
            <ListMovie :movies="mostPopularData" :title="'Most Popular'" :type="'mostpopular'" :darkMode="darkMode"/>
            <ListMovie :movies="topRatingData" :title="'Top Rating'" :type="'top50'" :darkMode="darkMode"/>
        </div>
    `,
};
