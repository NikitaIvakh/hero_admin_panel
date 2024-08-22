const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
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
				heroesLoadingStatus: 'idle',
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		case 'CREATE_NEW_HERO':
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			}
		case 'CREATE_NEW_HERO_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			}
		case 'DELETE_HERO':
			return {
				...state,
				heroes: state.heroes.filter(item => item.id !== action.payload),
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

export default heroes
