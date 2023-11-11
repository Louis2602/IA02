export function parseRevenue(revenueString) {
	const numericValue = parseInt(revenueString.replace(/[^0-9]/g, ''), 10);
	return isNaN(numericValue) ? null : numericValue;
}

export function parseQuery(query) {
	const [type, className, rest] = query.split('/');
	const [pattern, paramsString] = rest.split('?');
	const params = Object.fromEntries(new URLSearchParams(paramsString));
	return { type, class: className, pattern, params };
}
