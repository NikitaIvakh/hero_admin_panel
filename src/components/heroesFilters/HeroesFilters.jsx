import classNames from 'classnames'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	activeFilterChanged,
	filtersError,
	filtersFetched,
	filtersFetching,
} from '../../actions'
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../spinner/Spinner'

const HeroesFilters = () => {
	const { filters, filtersLoadingStatus, activeFilter } = useSelector(
		state => state
	)
	const { request } = useHttp()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(filtersFetching())
		request('http://localhost:3001/filters')
			.then(data => dispatch(filtersFetched(data)))
			.catch(() => filtersError())
	}, [])

	if (filtersLoadingStatus === 'loading') {
		return <Spinner />
	} else if (filtersLoadingStatus === 'error') {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
	}

	const renderFilters = filters => {
		if (filters.length === 0) {
			return <h5 className='text-center mt-5'>Фильтров пока нет</h5>
		}

		return filters.map(({ label, name, className }) => {
			const btnActive = classNames('btn', className, {
				active: name === activeFilter,
			})

			return (
				<button
					key={name}
					id={name}
					className={btnActive}
					onClick={() => dispatch(activeFilterChanged(name))}
				>
					{label}
				</button>
			)
		})
	}

	const elements = renderFilters(filters)

	return (
		<div className='card shadow-lg mt-4'>
			<div className='card-body'>
				<p className='card-text'>Отфильтруйте героев по элементам</p>
				<div className='btn-group'>{elements}</div>
			</div>
		</div>
	)
}

export default HeroesFilters
