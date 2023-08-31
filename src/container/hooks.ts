import {useCallback, useEffect, useState} from "react";
import {doc, setDoc, getDoc, getDocs, collection, query, where, Timestamp, deleteDoc} from "firebase/firestore";
import { v4 as uuid } from 'uuid'

import {MESSAGES_COLLECTION_NAME, USERS_COLLECTION_NAME} from "./constants";
import {useRoot} from "./Provider";
import {TMessage, TMessageInput, TUser, TUserInput} from "./types";
import {User} from "firebase/auth";

type TUseMessages = {
  loading: boolean,
  list: TMessage[]
  create: (data: TMessageInput) => void,
  update: (data: Pick<TMessage, 'content' | 'uuid'>) => void
  remove: (uuid: string) => void
}

export const useMessages = (storyId: string): TUseMessages => {
  const { db, user } = useRoot()

  const [messages, messagesSet] = useState<TMessage[]>([])
  const [loading, loadingSet] = useState<boolean>(false)

  const messagesLoad = useCallback(async () => {
    const c = collection(db, MESSAGES_COLLECTION_NAME)
    const q = query(c, where('storyId', '==', storyId))
    const m: TMessage[] = []
    const snap = await getDocs(q)
    snap.forEach((res) => {
      m.push({ ...res.data() as TMessage, uuid: res.id } )
    })
    messagesSet(m.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis()))
  }, [db, storyId, messagesSet])

  const messageCreate = useCallback(async (data: TMessageInput) => {
    const id = uuid()
    const d = doc(db, MESSAGES_COLLECTION_NAME, id)
    await setDoc(d, {
      ...data,
      storyId,
      timestamp: Timestamp.now(),
      userUid: user.uid
    })
    const messageCreated = await getDoc(d)

    if (messageCreated.exists()) {
      const messageUserData = messageCreated.data() as TMessage
      messagesSet(prev => [...prev, {...messageUserData, uuid: id}])
    } else {
      console.log('USE_MESSAGES_CREATE: created doc not found')
    }
  }, [db, storyId, user, messagesSet])

  const messageUpdate = useCallback(async (data: Pick<TMessage, 'content' | 'uuid'>) => {
    const d = doc(db, MESSAGES_COLLECTION_NAME, data.uuid)
    await setDoc(d, { content: data.content }, { merge: true })
    const messageUpdated = await getDoc(d)

    if (messageUpdated.exists()) {
      const messageData = messageUpdated.data() as TMessage
      messagesSet(prev => {
        const updatedIndex = prev.findIndex(m => m.uuid === data.uuid)
        const prevCopy = [...prev]
        prevCopy[updatedIndex] = messageData
        return prevCopy
      })
    } else {
      console.log('USE_MESSAGES_CREATE: created doc not found')
    }
  }, [db, messagesSet])

  const messageRemove = useCallback(async (uuid: string) => {
    const d = doc(db, MESSAGES_COLLECTION_NAME, uuid)
    await deleteDoc(d)
    messagesSet(prev => prev.filter(m => m.uuid !== uuid))
  }, [db, messagesSet])

  useEffect(() => {
    messagesLoad()
  }, [messagesLoad])

  return { loading, list: messages, create: messageCreate, update: messageUpdate, remove: messageRemove }
}

export const useUsers = () => {
  const { db } = useRoot()

  const [users, usersSet] = useState<TUser[]>([])

  const usersLoad = useCallback(async () => {
    const c = collection(db, USERS_COLLECTION_NAME)
    const q = query(c)
    const u: TUser[] = []
    const snap = await getDocs(q)
    snap.forEach((res) => {
      u.push(res.data() as TUser)
    })
    usersSet(u)
  }, [db, usersSet])

  const usersCreate = useCallback(async (user: User) => {
    const id = uuid()
    const d = doc(db, USERS_COLLECTION_NAME, id)
    const u: TUserInput = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
    }
    await setDoc(d, u)
    const userCreated = await getDoc(d)
    if (userCreated.exists()) {
      const createdUserData = userCreated.data() as TUser
      usersSet(prev => [...prev, createdUserData])
    } else {
      console.log('USE_USERS_CREATE: created doc not found')
    }
  }, [db, usersSet])

  useEffect(() => {
    usersLoad()
  }, [usersLoad])

  return { list: users, create: usersCreate }
}