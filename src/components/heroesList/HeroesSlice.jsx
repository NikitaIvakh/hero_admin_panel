import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
	const { request } = useHttp()
	return await request('http://localhost:3001/heroes')
})

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
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
	extraReducers: builder => {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.heroesLoadingStatus = 'loading'
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroes = action.payload
				state.heroesLoadingStatus = 'idle'
			})
			.addCase(fetchHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error'
			})
			.addDefaultCase(() => {})
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
