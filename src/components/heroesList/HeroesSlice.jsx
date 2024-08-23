import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroesFetching: state => {
			state.heroesLoadingStatus = 'loading'
		},
		heroesFetched: (state, action) => {
			state.heroes = action.payload
			state.heroesLoadingStatus = 'idle'
		},
		heroesFetchingError: state => {
			state.heroesLoadingStatus = 'error'
		},
		createNewHero: (state, action) => {
			state.heroes.push(action.payload)
		},
		createNewHeroError: state => {
			state.heroesLoadingStatus = 'error'
		},
		deleteHero: (state, action) => {
			state.heroes = state.heroes.filter(item => item.id !== action.payload)
		},
		deleteHeroError: state => {
			state.heroesLoadingStatus = 'error'
		},
	},
})

const { actions, reducer } = heroesSlice

export default reducer
export const {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	createNewHero,
	createNewHeroError,
	deleteHero,
	deleteHeroError,
} = actions
