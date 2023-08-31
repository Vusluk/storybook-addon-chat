import React, {FC} from 'react'

import * as S from './styles'

export interface IProps {
  name: string
  value: string
  placeholder?: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const TextArea: FC<IProps> = ({
  className,
  name,
  value,
  onChange,
  placeholder,
  onKeyPress,
}) => {
  return (
    <S.TextArea
      className={className}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  )
}

export default TextArea
