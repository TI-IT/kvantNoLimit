import React from 'react'
import emailValidator from 'email-validator'
import Menu from "../components/Menu";

export default function SignUp() {

  const [user, setUser] = React.useState({email: '', password: ''})
  const [secondPassword, setSecondPassword] = React.useState('')
  const [message, setMessage] = React.useState('')

  function changeUser(name, value) {
    setUser({
      ...user,
      [name] : value
    })
    console.log(user)
  }

  async function signuo() {
    setMessage('')
    if (!user.email || !user.password || !secondPassword) {
      setMessage("Заполните все поля")
      return
    }
    if (secondPassword !== user.password) {
      setMessage('Пароли не совподают')
      return
    }
    if (!emailValidator.validate(user.email)) {
      setMessage('Email не корректный')
      return
    }

    //Передаем запрос на бекент
    const res = await fetch('http://localhost:9001/users/signup', {
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
    }else {
      setMessage('Ошибка попробуйте другие данные')
    }
  }

  return (
    <div>
      <Menu />
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
            <button type={'button'} onClick={signuo}>Зарегистрироватся</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}