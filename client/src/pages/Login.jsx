import React from "react";
import {useNavigate} from "react-router-dom";
import Menu from "../components/Menu";

export default function Login({server_host}) {

  const [user, setUser] = React.useState({email: '', password: ''});
  const [message, setMessage] = React.useState('');

  const navigate = useNavigate()

  async function login() {
    setMessage('')
    if(!user.email || !user.password){
      setMessage('Заполните оба поля')
    }

    const res = await fetch(server_host + '/users/login', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json()

    if(data.ok){
      setMessage('')
      setMessage('Сейчас будет выполнено переадресация')
      navigate('/dashboard')
    }else {
      setMessage('')
      setMessage('Неверный логин или пароль')
    }
  }

 function changeUser(name, value) {
    setUser({
      ...user,
      [name] : value
    })
  }

  return (
    <div>
      <Menu />
      <div className={'container text-center'}>
        <h1>
          Вход
        </h1>
        <div className={'message'}>{message}</div>
        <div>
          <form className={'login'}>
            <div>
              <input type={'text'} name={'email'} placeholder={'email'} onChange={e=> changeUser('email', e.target.value)} value={user.email}/>
            </div>
            <div>
              <input type={'password'} name={'password'} placeholder={'пароль'} onChange={e=> changeUser('password', e.target.value)} value={user.password}/>
            </div>
            <button type={'button'} onClick={login}>Войти</button>
          </form>
        </div>
      </div>
    </div>
  )
}