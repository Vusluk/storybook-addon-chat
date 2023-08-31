import React, {FC, useCallback, useState} from 'react'
import { styled } from "@storybook/theming";

import HeadingBase from '../../components/Heading'
import TextBase from '../../components/Text'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import Button from "../../components/Button";

const LoginTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;

  max-width: 300px;
  margin: 0 auto;
`

const HeadingTag = styled(HeadingBase)`
  margin-bottom: 15px;
`

const TextTag = styled(TextBase)`
  margin-bottom: 15px;
`

const authProvider = new GoogleAuthProvider()

interface IProps {
}

const Login: FC<IProps> = () => {
  const [loading, loadingSet] = useState<boolean>(false)

  const signInHandle = useCallback(async () => {
    loadingSet(true)
    try {
      const auth = getAuth()
      auth.languageCode = 'ru'
      await signInWithPopup(auth, authProvider)
    } catch (err) {
      console.log('AUTH_ERROR', err)
    }
    loadingSet(false)
  }, [loadingSet])

  return (
    <LoginTag>
      <HeadingTag as='h3'>Вход</HeadingTag>

      <TextTag>
        Чтобы писать комменты, нужно залогиниться через гугл.
      </TextTag>

      <Button loading={loading} onClick={signInHandle}>
        Залогиниться
      </Button>
    </LoginTag>
  )
}

export default Login
