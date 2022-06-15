import { IsEnum } from 'class-validator'
import { TopLevelCategory } from '@app/top-page/top-page.model'

export class FindTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory
}
