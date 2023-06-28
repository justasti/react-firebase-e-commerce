import { useSelector } from 'react-redux'
import CategoryPreview from '../../components/category-preview/category-preview.component.tsx'
import {
  selectCategoriesLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector.ts'
import Spinner from '../../components/spinner/spinner.component.tsx'

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesLoading)

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      )}
    </>
  )
}

export default CategoriesPreview