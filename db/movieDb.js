import movies from './data.js';
import { parseQuery, parseRevenue } from './helper.js';

export const movieDb = {
	fetch: async (query) => {
		const { type, class: className, pattern, params } = parseQuery(query);

		let result;
		switch (type) {
			case 'search':
				result = await search(className, pattern, params);
				break;
			case 'detail':
				result = await detail(className, pattern);
				break;
			case 'get':
				result = await get(className, params);
				break;
			default:
				throw new Error('Invalid query type');
		}

		return result;
	},
};

async function search(className, pattern, params) {
	let filteredMovies;

	switch (className) {
		case 'movie':
			filteredMovies = movies.Movies.filter((movie) =>
				movie.title.toLowerCase().includes(pattern.toLowerCase())
			);
			break;

		case 'name':
			filteredMovies = movies.Movies.filter((movie) =>
				movie.actorList.some((actor) =>
					actor.name.toLowerCase().includes(pattern.toLowerCase())
				)
			);
			break;
	}

	return {
		search: pattern,
		page: parseInt(params.page) || 1,
		per_page: parseInt(params.per_page) || 6,
		total_page: Math.ceil(
			filteredMovies.length / (parseInt(params.per_page) || 6)
		),
		total: filteredMovies.length,
		items: filteredMovies.slice(
			(parseInt(params.page) - 1) * parseInt(params.per_page) || 0,
			parseInt(params.page) * parseInt(params.per_page) ||
				filteredMovies.length
		),
	};
}

async function detail(className, id) {
	const movie = movies.find((movie) => movie.id === id);

	return {
		detail: id,
		item: movie,
	};
}

async function get(className, params) {
	let moviesData;
	switch (className) {
		case 'topboxoffice':
			const moviesWithRevenue = movies.Movies.map((movie) => {
				let revenue;
				if (movie.boxOffice?.cumulativeWorldwideGross) {
					revenue = parseRevenue(
						movie.boxOffice?.cumulativeWorldwideGross
					);
				} else {
					revenue = 0;
				}
				return { movie, revenue };
			});

			// Sort movies based on cumulative worldwide gross revenue
			moviesWithRevenue.sort((a, b) => {
				const revenueA = a.revenue;
				const revenueB = b.revenue;
				return revenueB - revenueA;
			});

			// Get the top 5 movies
			moviesData = moviesWithRevenue.slice(0, 5);
			break;
		case 'top50':
			moviesData = movies.Top50Movies;
			break;
		case 'mostpopular':
			moviesData = movies.MostPopularMovies;
			break;
		case 'movie':
			moviesData = movies.Movies;
			break;
		case 'name':
			moviesData = movies.Names;
			break;
	}
	return {
		get: className,
		page: parseInt(params.page) || 1,
		per_page: parseInt(params.per_page) || 3,
		total_page: Math.ceil(24 / (parseInt(params.per_page) || 3)),
		total: 24,
		items: moviesData.slice(
			(parseInt(params.page) - 1) * parseInt(params.per_page) || 0,
			parseInt(params.page) * parseInt(params.per_page) ||
				moviesData.length
		),
	};
}
