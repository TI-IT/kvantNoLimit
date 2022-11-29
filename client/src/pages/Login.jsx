import React from 'react'
import Menu from "../components/Menu";
import { useNavigate } from 'react-router-dom';

export default function Login({server_host}) {

  const [user, setUser] = React.useState({email: '', password: ''})
  const [message, setMessage] = React.useState('')

  const navigate = useNavigate()

  async function login() {
    setMessage('')
    if (!user.email || !user.password) {
      setMessage('Заполните оба поля')
    }

    const res = await fetch(server_host + '/users/login', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (data.ok) {
      setMessage('Сейчас будет выполнено переадресация')
      navigate('/dashboard')
    }else {
      setMessage('неверный логин или пароль')
    }
  }

  function changeUser(name, value) {
    setUser({
      ...user,
      [name] : value
    })
    console.log(user)
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={'container text-center'}>
        <h1>
          Вход
        </h1>
        <div>{message}</div>
        <form className={'login'}>
          <div>
            <input type={'text'} name={'email'} placeholder={'email'} 
            onChange={e => changeUser('email', e.target.value)} value={user.email} />
          </div>
          <div>
            <input type={'password'} name={'password'} placeholder={'Пароль'}
            onChange={e => changeUser('password', e.target.value)} value={user.password} />
          </div>
          <div>
            <button type={'button'} onClick={login}>Войти</button>
          </div>
        </form>
        <div className={'google-oauth-wrapper'}>
          <a className={'google-oauth'} href={server_host + '/oauth/google'}>Войти через Google</a>
        </div>
      </div>
    </div>
  )
}