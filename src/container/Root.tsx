import React, {FC} from "react";
import RootProvider from "./Provider";
import Chat from "./Chat";

export const Root: FC<{ active: boolean }> = ({ active }) => {
  return (
    <RootProvider active={active}>
      <Chat />
    </RootProvider>
  )
}