import HighestRevenueMovie from './highestRevenueMovie.js';
import ListMovie from './listMovie.js';

export default {
	props: ['topBoxOfficeData', 'mostPopularData'],
	components: { HighestRevenueMovie, ListMovie },
	template: `
        <div class="column">
            <HighestRevenueMovie :movies="topBoxOfficeData"/>
            <ListMovie :movies="mostPopularData" :title="'Most Popular'"/>
            <ListMovie :movies="mostPopularData" :title="'Top Rating'"/>
        </div>
    `,
};
