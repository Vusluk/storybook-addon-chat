import React, {FC} from 'react'

import * as S from './styles'

export interface IProps {
  name: string
  value?: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  type: 'text' | 'password'
  className?: any
  placeholder?: string
}

const Input: FC<IProps> = ({
  name,
  value,
  placeholder,
  onChange,
  type,
  className,
}) => {
  return (
    <S.Input
      className={className}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

Input.defaultProps = {
  type: 'text',
}

export default Input
