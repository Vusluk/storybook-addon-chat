import React, {FC} from 'react'
import { styled } from "@storybook/theming";

const TextTag = styled(({ as: Element, ...props }) => (
  <Element {...props} />
))`
  color: #383838;
`
export interface IProps {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

const Text: FC<IProps> = ({ as, children, className }) => {
  return (
    <TextTag as={as} className={className}>
      {children}
    </TextTag>
  )
}

Text.defaultProps = {
  as: 'span',
}

export default Text
