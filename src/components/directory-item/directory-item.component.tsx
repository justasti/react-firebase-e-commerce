import { Category } from '../../store/categories/category.types'
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from './directory-item.styles'

type DirectoryItemProps = {
  category: Category
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { imageUrl, title } = category
  return (
    <DirectoryItemContainer to={`shop/${title}`}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
