import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import {useParameter, useStorybookState} from "@storybook/manager-api";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {collection, doc, Firestore, getDocs, getFirestore, query, setDoc, where} from 'firebase/firestore'
import {getAuth, onAuthStateChanged, User, signOut} from "firebase/auth";

import Login from "../Login";
import {USERS_COLLECTION_NAME} from "../constants";
import {v4 as uuid} from "uuid";
import {TUserInput} from "../types";
import {Loader} from "@storybook/components";

export type TParams = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}

type TRootContext = {
  app: FirebaseApp
  db: Firestore
  storyId: string
  // signIn: () => void
  signOut: () => void
  user: User
};

const RootContext = createContext<TRootContext>(null!)

export const useRoot = () => useContext(RootContext)

export const RootProvider = ({ children, active }: { children: ReactNode, active: boolean }) => {
  const params = useParameter<TParams | undefined>('chat')
  const state = useStorybookState()

  const [app, appSet] = useState<FirebaseApp | null>(null)
  const [db, dbSet] = useState<Firestore | null>(null)
  const [user, userSet] = useState<User | null>(null)
  const [loading, loadingSet] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (params && getApps().length === 0) {
      const app = initializeApp(params)
      const db = getFirestore(app)
      if (app) appSet(app)
      if (db) dbSet(db)
    }
  }, [params, appSet, dbSet])

  const userChangeHandle = useCallback(async (u: User) => {
    const q = query(collection(db, USERS_COLLECTION_NAME), where('uid', '==', u.uid))
    const snap = await getDocs(q)
    const userData: TUserInput = {
      displayName: u.displayName,
      email: u.email,
      uid: u.uid,
      photoURL: u.photoURL,
    }
    console.log('USER_CHANGE_HANDLE', u, snap)
    if (!snap.size) { // Юзер залогинился в первый раз
      const id = uuid()
      await setDoc(doc(db, USERS_COLLECTION_NAME, id), userData)
    } else {
      if (snap.size > 1) console.log('ЮЗЕРОВ с одинаковым UID больше одного')
      let id
      snap.forEach(data => id = data.id)
      console.log('USER_CHANGE_HANDLE', id)
      await setDoc(doc(db, USERS_COLLECTION_NAME, id), userData)
    }
    userSet(u)
  }, [userSet, db])

  const logOut = useCallback(async () => {
    if (app) {
      loadingSet(true)
      const auth = getAuth()
      try {
        await signOut(auth)
        userSet(null)
      } catch (e) {
        console.log('SIGN_OUT_ERROR: ', e)
      }
      loadingSet(false)
    }
  }, [app, userSet, loadingSet])

  useEffect(() => {
    if (app && db) {
      const auth = getAuth()
      onAuthStateChanged(auth, async (u) => {
        loadingSet(true)
        if (u) await userChangeHandle(u)
        else userSet(null)
        loadingSet(false)
      })
    }
  }, [db, app, userSet, userChangeHandle, loadingSet])

  const value = useMemo<TRootContext>(() => ({
    user,
    app,
    db,
    storyId: state.storyId,
    signOut: logOut
  }), [app, db, state.storyId, user, logOut])

  return !active ? null : (
    <RootContext.Provider value={value}>
      {!app || loading ? (
        <Loader />
      ) : !params || !params.apiKey ? (
        'Please provide correct firebase config.'
      ) : !user ? (
        <Login />
      ) : children}
    </RootContext.Provider>
  )
}

export default RootProvider
