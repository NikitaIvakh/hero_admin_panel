import { createReducer } from '@reduxjs/toolkit'
import {
	createNewHero,
	createNewHeroError,
	deleteHero,
	deleteHeroError,
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
} from '../actions'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
	builder
		.addCase(heroesFetching, state => {
			state.heroesLoadingStatus = 'loading'
		})
		.addCase(heroesFetched, (state, action) => {
			state.heroes = action.payload
			state.heroesLoadingStatus = 'idle'
		})
		.addCase(heroesFetchingError, state => {
			state.heroesLoadingStatus = 'error'
		})
		.addCase(createNewHero, (state, action) => {
			state.heroes.push(action.payload)
		})
		.addCase(createNewHeroError, state => {
			state.heroesLoadingStatus = 'error'
		})
		.addCase(deleteHero, (state, action) => {
			state.heroes = state.heroes.filter(item => item.id !== action.payload)
		})
		.addCase(deleteHeroError, state => {
			state.heroesLoadingStatus = 'error'
		})
		.addDefaultCase(() => {})
})

export default heroes

// const heroes = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'HEROES_FETCHING':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'loading',
// 			}
// 		case 'HEROES_FETCHED':
// 			return {
// 				...state,
// 				heroes: action.payload,
// 				heroesLoadingStatus: 'idle',
// 			}
// 		case 'HEROES_FETCHING_ERROR':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'error',
// 			}
// 		case 'CREATE_NEW_HERO':
// 			return {
// 				...state,
// 				heroes: [...state.heroes, action.payload],
// 			}
// 		case 'CREATE_NEW_HERO_ERROR':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'error',
// 			}
// 		case 'DELETE_HERO':
// 			return {
// 				...state,
// 				heroes: state.heroes.filter(item => item.id !== action.payload),
// 			}
// 		case 'DELETE_HERO_ERROR':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'error',
// 			}
// 		default:
// 			return state
// 	}
// }

// const heroes = createReducer(
// 	initialState,
// 	{
// 		[heroesFetching]: state => {
// 			state.heroesLoadingStatus = 'loading'
// 		},
// 		[heroesFetched]: (state, action) => {
// 			state.heroesLoadingStatus = 'idle'
// 			state.heroes = action.payload
// 		},
// 		[heroesFetchingError]: state => {
// 			state.heroesLoadingStatus = 'error'
// 		},
// 		[createNewHero]: (state, action) => {
// 			state.heroes.push(action.payload)
// 		},
// 		[createNewHeroError]: (state, action) => {
// 			state.heroesLoadingStatus = 'error'
// 		},
// 		[deleteHero]: (state, action) => {
// 			state.heroes = state.heroes.filter(item => item.id !== action.payload)
// 		},
// 		[deleteHeroError]: (state, action) => {
// 			state.heroesLoadingStatus = 'error'
// 		},
// 	},
// 	[],
// 	state => state
// )
