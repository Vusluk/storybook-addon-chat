import { styled } from "@storybook/theming";

const Button = styled.button<{ loading?: boolean }>`
  position: relative;
  border: none;
  background-color: #1EA7FD;
  padding: 8px 20px;
  color: #fff;
  cursor: ${({loading}) => loading ? 'default' : 'pointer'};

  &:hover {
    cursor: pointer;
    background-color: #40a9ff;
  }
  
  & > span {
    opacity: ${({loading}) => loading ? '0' : '1'};
    transition: opacity 100ms;
  }
`

export { Button }
