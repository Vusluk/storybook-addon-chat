import React, {FC} from 'react'

import * as S from './styles'

export interface IProps {
  children: React.ReactNode
}
const List: FC<IProps> = ({ children }) => {
  return <S.List>{children}</S.List>
}

export interface IListProps {
  left: React.ReactNode
  right: React.ReactNode
}
const ListItem: FC<IListProps> = ({ left, right }) => {
  return (
    <S.ListItem>
      <S.Left>{left}</S.Left>
      <S.Right>{right}</S.Right>
    </S.ListItem>
  )
}

export { ListItem, List }
