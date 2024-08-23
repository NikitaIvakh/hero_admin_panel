import {
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
} from '../components/heroesList/HeroesSlice'

import {
	filtersError,
	filtersFetched,
	filtersFetching,
} from '../components/heroesFilters/HeroesFilterSlice'

export const fetchHeroes = request => dispatch => {
	dispatch(heroesFetching())
	request('http://localhost:3001/heroes')
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}

export const fetchingFilters = request => dispatch => {
	dispatch(filtersFetching())
	request('http://localhost:3001/filters')
		.then(data => dispatch(filtersFetched(data)))
		.catch(() => filtersError())
}
