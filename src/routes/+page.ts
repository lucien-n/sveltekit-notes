export function load({ url }) {
	const tag = url.searchParams.get('filter');

	return {
		filterTag: tag ? tag : ''
	};
}
