import { configureStore } from '@reduxjs/toolkit'
import filters from '../reducers/filters'
import heroes from '../reducers/heroes'

const stringMiddleware = store => next => action => {
	if (typeof action === 'string') {
		return next({
			type: action,
		})
	}

	return next(action)
}

const enhancer =
	createStore =>
	(...args) => {
		const store = createStore(...args)

		const oldDispatch = store.dispatch
		store.dispatch = action => {
			if (typeof action === 'string') {
				return oldDispatch({
					type: action,
				})
			}

			return oldDispatch(action)
		}

		return store
	}

const store = configureStore({
	reducer: { heroes, filters },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
	enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(enhancer),
})

export default store
