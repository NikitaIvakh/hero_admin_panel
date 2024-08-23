import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	filters: [],
	activeFilter: 'all',
	filtersLoadingStatus: 'idle',
}

const heroesFilterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersFetching: state => {
			state.filtersLoadingStatus = 'loading'
		},
		filtersFetched: (state, action) => {
			state.filters = action.payload
			state.filtersLoadingStatus = 'idle'
		},
		filtersError: state => {
			state.filtersLoadingStatus = 'error'
		},
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload
		},
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
