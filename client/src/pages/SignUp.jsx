import React from 'react'
import emailValidator from 'email-validator'
import Menu from "../components/Menu";
import { useNavigate } from 'react-router-dom';

export default function SignUp({server_host}) {

  React.useEffect(() => {document.title = 'Регистрация'}, [])
  const [user, setUser] = React.useState({email: '', password: ''})
  const [secondPassword, setSecondPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [disabled, setDisabled] = React.useState(false)
  const navigate = useNavigate()

  function changeUser(name, value) {
    setUser({
      ...user,
      [name] : value
    })
  }

  async function signUo() {
    setDisabled(true)
    setMessage('')
    if (!user.email || !user.password || !secondPassword) {
      setMessage("Заполните все поля")
      setDisabled(false)
      return
    }
    if (secondPassword !== user.password) {
      setMessage('Пароли не совподают')
      setDisabled(false)
      return
    }
    if (!emailValidator.validate(user.email)) {
      setMessage('Email не корректный')
      setDisabled(false)
      return
    }

    //Передаем запрос на бекент
    const res = await fetch(server_host + '/users/signup', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    if (data.ok) {
      setMessage('Регистрация прошла успешно')
      navigate('/dashboard')
    }else {
      setDisabled(false)
      setMessage('Ошибка попробуйте другие данные')
    }
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={'container text-center'}>
        <h1>
          Регистрация
        </h1>
        <div className={'message'}>{message}</div>
        <form className={'sign-up'}>
          <div>
            <label>Email</label>
            <div>
            <input type={'text'} name={'email'} onChange={e => changeUser('email', e.target.value)} value={user.email}/>
            </div>
          </div>
          <div>
            <label>Пароль</label>
            <div>
            <input type={'password'} onChange={e => changeUser('password', e.target.value)} value={user.password}/>
            </div>
          </div>
          <div>
            <label>Повторить пароль</label>
            <div>
            <input type={'password'} onChange={e => setSecondPassword(e.target.value)}/>
            </div>
          </div>
          <div>
            <button type={'button'} onClick={signUo} disabled={disabled}>Зарегистрироватся</button>
          </div>
        </form>
        <div className={'google-oauth-wrapper'}>
          <a className={'google-oauth'} href={'https://api.kvantnolimit.ru/oauth/google'}>Войти через Google</a>
        </div>
      </div>
    </div>
  )
}