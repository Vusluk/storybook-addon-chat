import {styled} from "@storybook/theming";

export const RootTag = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr 60px 34px;
  grid-gap: 8px;
  height: 100%;
  width: 100%;
  padding: 0 8px 8px;
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid hsla(203, 50%, 30%, 0.15);
`

export const ProfileUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ProfileControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`

export const MessagesTag = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  overflow: auto;
`

export const MessageTag = styled.div<{ selfMessage: boolean }>`
  align-self: ${({ selfMessage }) => selfMessage ? 'flex-end' : 'flex-start'};
  display: flex;
  gap: 8px;
  width: 90%;
  align-items: flex-end;
`

export const MessageContent = styled.div<{ selfMessage: boolean, isEdit: boolean }>`
  flex: 1 1 auto;
  padding: ${({ selfMessage }) => selfMessage ? '0 8px 8px' : '8px'};
  border-radius: 4px;
  background-color: ${({ selfMessage, isEdit }) => selfMessage && isEdit ? '#defade' : selfMessage ? '#d8f9d8' : '#f9fef9'};
`

export const Avatar = styled.div<{ src: string }>`
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: url("${({ src }) => src}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const Author = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #333333;
`

export const MessageTimestamp = styled.div`
  font-size: 12px;
  color: #777777;
  margin-left: auto;
`

export const MessageText = styled.div`
  font-size: 14px;
  color: #333333;
`

export const MessageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Controls = styled.div`
  display: grid;
  grid-template-areas: "a a";
  grid-auto-columns: 1fr;
`
