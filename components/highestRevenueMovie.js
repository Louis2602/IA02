import Carousel from './carousel.js';

export default {
	props: ['movies'],
	components: { Carousel },
	template: `
        <div class="column">
            <Carousel :movies="movies"/>
        </div>    
    
    `,
};
