import {Timestamp} from "firebase/firestore";

export type TMessage = {
  userUid: string
  content: string
  storyId: string
  timestamp: Timestamp
  uuid: string
}

export type TMessageInput = {
  content: string
}

export type TUser = {
  email: string
  photoURL: string
  uid: string
  displayName: string
}

export type TUserInput = TUser