import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle',
})

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
	const { request } = useHttp()
	return await request('http://localhost:3001/heroes')
})

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		createNewHero: (state, action) => {
			heroesAdapter.addOne(state, action.payload)
		},
		createNewHeroError: state => {
			state.heroesLoadingStatus = 'error'
		},
		deleteHero: (state, action) => {
			heroesAdapter.removeOne(state, action.payload)
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
				heroesAdapter.setAll(state, action.payload)
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
const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
	state => state.filters.activeFilter,
	selectAll,
	(filter, heroes) => {
		if (filter === 'all') return heroes
		return heroes.filter(item => item.element === filter)
	}
)

export const {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	createNewHero,
	createNewHeroError,
	deleteHero,
	deleteHeroError,
} = actions
