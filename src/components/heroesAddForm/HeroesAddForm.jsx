import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { createNewHero, createNewHeroError } from '../../actions/index'
import { useHttp } from '../../hooks/http.hook'

const HeroesAddForm = () => {
	const [state, setState] = useState({ name: '', description: '', element: '' })
	const { filters, filtersLoadingStatus } = useSelector(state => state.filters)
	const { request } = useHttp()
	const dispatch = useDispatch()

	const onChangeValues = event => {
		setState(perviousState => ({
			...perviousState,
			[event.target.name]: event.target.value,
		}))
	}

	const onSubmit = event => {
		event.preventDefault()

		const newHero = {
			id: uuidv4(),
			name: state.name,
			description: state.description,
			element: state.element,
		}

		request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
			.then(dispatch(createNewHero(newHero)))
			.catch(() => dispatch(createNewHeroError()))

		setState({
			name: '',
			description: '',
			element: '',
		})
	}

	const filtersRendering = (filters, status) => {
		if (status === 'loading') <option>Фильтры загружаются...</option>
		else if (status === 'error') <option>Ошибка загрузки</option>

		return filters
			.filter(({ name }) => name !== 'all')
			.map(({ name, label }) => {
				return (
					<option key={name} value={name}>
						{label}
					</option>
				)
			})
	}

	return (
		<form className='border p-4 shadow-lg rounded' onSubmit={onSubmit}>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label fs-4'>
					Имя нового героя
				</label>
				<input
					required
					type='text'
					name='name'
					className='form-control'
					id='name'
					placeholder='Как меня зовут?'
					value={state.name}
					onChange={onChangeValues}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='text' className='form-label fs-4'>
					Описание
				</label>
				<textarea
					required
					name='description'
					className='form-control'
					id='text'
					placeholder='Что я умею?'
					style={{ height: '130px' }}
					value={state.description}
					onChange={onChangeValues}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='element' className='form-label'>
					Выбрать элемент героя
				</label>
				<select
					required
					className='form-select'
					id='element'
					name='element'
					value={state.element}
					onChange={onChangeValues}
				>
					<option>Я владею элементом...</option>
					{filtersRendering(filters, filtersLoadingStatus)}
				</select>
			</div>

			<button type='submit' className='btn btn-primary'>
				Создать
			</button>
		</form>
	)
}

export default HeroesAddForm
