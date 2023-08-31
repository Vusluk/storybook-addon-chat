import React, { FC } from 'react'
import { styled } from "@storybook/theming";

const HeadingTag = styled(({ as: Element, ...props }) => (
  <Element {...props} />
))``

export interface IProps {
  as: React.ElementType
  children: string
  className?: any
}

const Heading: FC<IProps> = ({ as, children, className }) => {
  return (
    <HeadingTag className={className} as={as}>
      {children}
    </HeadingTag>
  )
}

Heading.defaultProps = {
  as: 'h1',
}

export default Heading
