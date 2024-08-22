import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
	deleteHero,
	deleteHeroError,
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
} from '../../actions'
import { useHttp } from '../../hooks/http.hook'
import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'
import './heroesList.scss'

const HeroesList = () => {
	const { filteredHeroes, heroesLoadingStatus } = useSelector(state => state)
	const { request } = useHttp()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(heroesFetching())
		request('http://localhost:3001/heroes')
			.then(data => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesFetchingError()))
	}, [])

	const onDeleteHero = useCallback(
		id => {
			request(`http://localhost:3001/heroes/${id}`, 'DELETE')
				.then(dispatch(deleteHero(id)))
				.catch(() => dispatch(deleteHeroError()))
		},
		[request]
	)

	if (heroesLoadingStatus === 'loading') {
		return <Spinner />
	} else if (heroesLoadingStatus === 'error') {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
	}

	const renderHeroesList = arr => {
		if (arr.length === 0) {
			return (
				<CSSTransition timeout={0} classNames='hero'>
					<h5 className='text-center mt-5'>Героев пока нет</h5>
				</CSSTransition>
			)
		}

		return arr.map(({ id, ...props }) => {
			return (
				<CSSTransition key={id} timeout={500} classNames='hero'>
					<HeroesListItem {...props} onDeleteHero={() => onDeleteHero(id)} />
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(filteredHeroes)
	return <TransitionGroup component='ul'>{elements}</TransitionGroup>
}

export default HeroesList
