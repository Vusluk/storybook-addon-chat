import React from "react";

import { styled } from "@storybook/theming";


const LoaderTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Loader = () => {
  return <LoaderTag>Loading...</LoaderTag>;
};

export default Loader;
