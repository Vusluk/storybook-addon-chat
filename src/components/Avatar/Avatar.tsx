import React, {FC} from 'react'

import * as S from './styles'

export interface IProps {
  source: string
}

/**
 * **Avatar** is in charge of rendering
 * the user's profile picture
 */
const Avatar: FC<IProps> = ({ source }) => {
  return (
    <S.Avatar>
      <S.Image src={source} alt='user-avatar' />
    </S.Avatar>
  )
}

export default Avatar
