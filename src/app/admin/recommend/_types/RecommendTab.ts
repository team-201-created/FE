import {
  BlendMapsItemResponse,
  ProductMapsItemResponse,
  ProductPoolsItemResponse,
} from './index'

export type RecommendListItem =
  | BlendMapsItemResponse
  | ProductPoolsItemResponse
  | ProductMapsItemResponse

export interface RecommendTabProps<T extends RecommendListItem> {
  data: T[]
  onTogglePublish?: (id: number) => void
}
