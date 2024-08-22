const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	filteredHeroes: [],
	activeFilter: 'all',
	filtersLoadingStatus: 'idle',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading',
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				filteredHeroes:
					state.activeFilter === 'all'
						? action.payload
						: action.payload.filter(
								item => item.element === state.activeFilter
						  ),
				heroesLoadingStatus: 'idle',
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		case 'FILTERS_FETCHING':
			return {
				...state,
				filtersLoadingStatus: 'loading',
			}
		case 'FILTERS_FETCHED':
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: 'idle',
			}
		case 'FILTERS_ERROR':
			return {
				...state,
				filtersLoadingStatus: 'error',
			}
		case 'ACTIVE_FILTER_CHANGED':
			return {
				...state,
				activeFilter: action.payload,
				filteredHeroes:
					action.payload === 'all'
						? state.heroes
						: state.heroes.filter(item => item.element === action.payload),
			}
		case 'CREATE_NEW_HERO':
			const newListHeroes = [...state.heroes, action.payload]
			return {
				...state,
				heroes: newListHeroes,
				filteredHeroes:
					state.activeFilter === 'all'
						? newListHeroes
						: newListHeroes.filter(item => item.element === state.activeFilter),
			}
		case 'CREATE_NEW_HERO_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		case 'DELETE_HERO':
			const newHeroList = state.heroes.filter(
				item => item.id !== action.payload
			)
			return {
				...state,
				heroes: newHeroList,
				filteredHeroes:
					state.activeFilter === 'all'
						? newHeroList
						: newHeroList.filter(item => item.element === action.payload),
			}
		case 'DELETE_HERO_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		default:
			return state
	}
}

export default reducer
