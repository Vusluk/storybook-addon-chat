import React, {FC} from 'react'

import * as S from './styles'

export interface IProps {
  children: string | React.ReactNode
  href: string
  target: '_blank' | '_parent' | '_self' | '_top'
}

const Link: FC<IProps> = ({ href, children, target }) => {
  return (
    <S.Link target={target} href={href}>
      {children}
    </S.Link>
  )
}

Link.defaultProps = {
  target: '_blank',
}

export default Link
