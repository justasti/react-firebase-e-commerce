import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import {
  selectCategoriesLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector.ts'

import { CategoryContainer, Title } from './category.styles.tsx'
import Spinner from '../../components/spinner/spinner.component'

type CategoryRouteParams = {
  category: string
}

const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesLoading)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryContainer>
      )}
    </Fragment>
  )
}

export default Category
