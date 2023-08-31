import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import { keyBy } from 'lodash'
import { DateTime } from 'luxon'
import {IconButton, Icons} from "@storybook/components";

import TextArea from "../../components/TextArea";
import Button from "../../components/Button";

import {useRoot} from "../Provider";
import {useMessages, useUsers} from "../hooks";

import * as S from './styles'
import {TMessage} from "../types";

export interface IProps {
}

const Chat: FC<IProps> = () => {
  const listRef = useRef<HTMLDivElement>(null)
  const { storyId, user, signOut } = useRoot()

  const [message, messageSet] = useState<string>('')
  const [messageEdit, messageEditSet] = useState<TMessage | null>(null)

  const { list, create, update, remove } = useMessages(storyId)
  const { list: users } = useUsers()
  const usersByUid = useMemo(() => keyBy(users, 'uid'), [users])

  console.log('USERS', usersByUid)
  console.log('MESSAGES', list)

  const messageSendHandle = useCallback(() => {
    create({ content: message })
    messageSet('')
  }, [message, create, messageSet])

  const messageEditHandle = useCallback(async () => {
    await update({ uuid: messageEdit.uuid, content: messageEdit.content })
    messageEditSet(null)
  }, [messageEdit, update, messageEditSet])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') messageSendHandle()
  }, [messageSendHandle])

  useEffect(() => {
    const el = listRef.current
    if (el) console.log({ scrollHeight: el.scrollHeight, clientHeight: el.clientHeight, offsetHeight: el.offsetHeight, scrollTop: el.scrollTop })
    if (el && el.scrollHeight > el.clientHeight) {
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
  }, [list.length, listRef.current])

  return (
    <S.RootTag>
      <S.Profile>
        <S.ProfileUser>
          <S.Avatar src={user.photoURL} />
          <S.Author>{user.displayName}</S.Author>
        </S.ProfileUser>
        <S.ProfileControls>
          <IconButton style={{ marginTop: '0' }} disabled><Icons icon='controls'/></IconButton>
          <IconButton style={{ marginTop: '0' }} onClick={signOut}><Icons icon='proceed'/></IconButton>
        </S.ProfileControls>
      </S.Profile>
      <S.MessagesTag ref={listRef}>
        {list.map((message, i) => {
          const isSelf = user.uid === message.userUid
          const isEdit = messageEdit && message.uuid === messageEdit.uuid
          return (
            <S.MessageTag key={`${message.storyId}_${i}`} selfMessage={isSelf}>
              {!isSelf && (
                <S.Avatar src={usersByUid[message.userUid]?.photoURL}/>
              )}

              <S.MessageContent selfMessage={isSelf} isEdit={isEdit}>

                <S.MessageHeader>
                  {isSelf ? (
                    <S.MessageControls>
                      <IconButton style={{ marginTop: '0' }} onClick={() => messageEditSet({...message})}><Icons icon='edit'/></IconButton>
                      <IconButton style={{ marginTop: '0' }} onClick={() => remove(message.uuid)}><Icons icon='trash'/></IconButton>
                    </S.MessageControls>
                    ) : (
                    <S.Author>
                      {usersByUid[message.userUid]?.displayName}
                    </S.Author>
                  )}

                  <S.MessageTimestamp>
                    {DateTime.fromSeconds(message.timestamp.seconds).toFormat('dd.MM.yy HH:mm')}
                  </S.MessageTimestamp>
                </S.MessageHeader>

                <S.MessageText>
                  {message.content}
                </S.MessageText>

              </S.MessageContent>
            </S.MessageTag>
          )
        })}
      </S.MessagesTag>
      <TextArea
        name='message'
        value={messageEdit ? messageEdit.content : message}
        onChange={(e) => messageEdit ? messageEditSet(messageEdit ? {...messageEdit, content: e.target.value} : messageEdit) : messageSet(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <S.Controls>
        {messageEdit ? (
          <>
            <Button onClick={() => messageEditSet(null)}>Отмена</Button>
            <Button onClick={messageEditHandle}>Сохранить</Button>
          </>
        ) : (
          <Button onClick={messageSendHandle}>Отправить</Button>
        )}
      </S.Controls>
    </S.RootTag>
  )
}

export default Chat
