import React, {FC, ReactNode, ButtonHTMLAttributes} from 'react'

import * as S from './styles'
import {Loader} from "@storybook/components";

export type TProps = {
  children: ReactNode
  onClick: () => void
  variant?: 'primary'
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<TProps> = ({ children, onClick, loading }) => {
  return (
    <S.Button onClick={loading ? undefined : onClick} loading={loading}>
      {loading && (<Loader size={24} />)}
      <span>{children}</span>
    </S.Button>
  )
}

Button.defaultProps = {
  variant: 'primary',
}

export default Button
