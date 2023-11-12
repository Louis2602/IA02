import HighestRevenueMovie from './highestRevenueMovie.js';
import ListMovie from './listMovie.js';

export default {
	components: { HighestRevenueMovie, ListMovie },
	template: `
        <div class="column mb-lg-5">
            <HighestRevenueMovie :type="'topboxoffice'" />
            <ListMovie :title="'Most Popular'" :type="'mostpopular'"/>
            <ListMovie :title="'Top Rating'" :type="'top50'"/>
        </div>
    `,
};
