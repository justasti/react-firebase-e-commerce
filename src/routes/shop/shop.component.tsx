import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import CategoriesPreview from '../categories-preview/categories-preview.component.tsx'
import Category from '../category/category.component.tsx'
import { fetchCategoriesStart } from '../../store/categories/category.action.ts'

import './shop.styles.scss'
import { useDispatch } from 'react-redux'

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop
