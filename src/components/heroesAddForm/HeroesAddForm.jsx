import { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useCreateHeroMutation } from '../../api/apiHero'
import store from '../../store'
import { selectAll } from '../heroesFilters/HeroesFilterSlice'

const HeroesAddForm = () => {
	const [createHero] = useCreateHeroMutation()
	const [state, setState] = useState({ name: '', description: '', element: '' })
	const filters = selectAll(store.getState())
	const { filtersLoadingStatus } = useSelector(state => state.filters)

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

		createHero(newHero).unwrap()

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
