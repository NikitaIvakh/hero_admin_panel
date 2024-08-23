import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const initialState = {
	filters: [],
	activeFilter: 'all',
	filtersLoadingStatus: 'idle',
}

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	async () => {
		const { request } = useHttp()
		return await request('http://localhost:3001/filters')
	}
)

const heroesFilterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilters.pending, state => {
				state.filtersLoadingStatus = 'loading'
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filters = action.payload
				state.filtersLoadingStatus = 'idle'
			})
			.addCase(fetchFilters.rejected, state => {
				state.filtersLoadingStatus = 'error'
			})
	},
})

const { actions, reducer } = heroesFilterSlice

export default reducer
export const {
	activeFilterChanged,
	filtersError,
	filtersFetched,
	filtersFetching,
} = actions
