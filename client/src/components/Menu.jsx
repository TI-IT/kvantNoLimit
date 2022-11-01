import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu({server_host}) {

  const [loading, setLoading] = React.useState(true);
  const [authorised, setAuthorised] = React.useState(undefined);
  const [role, setRole] = React.useState(undefined);

  React.useEffect(() => {
    (async () => {
      await checkAuth()
    })()
  }, [])

  async function checkAuth() {
    const res = await fetch(server_host + '/users/check/auth', {
      method: 'post',
      credentials: 'include',
    })
    const data = await res.json()
    if(data.ok) {
      setLoading(false)
      setAuthorised(true)
      setRole(data.role)
    }else {
      setLoading(false)
    }
  }

  return (
    <div className={'menu'}>
      <span><NavLink to={'/'}>Главная</NavLink></span>
      {!authorised && <span><NavLink to={'/login'}>Вход</NavLink></span>}
      {!authorised && <span><NavLink to={'/signup'}>Регистрация</NavLink></span>}
      {role === 'admin' && <span><NavLink to={'/admin'}>Admin</NavLink></span>}
      {authorised && <span><NavLink to={'/dashboard'}>Личный Кабинет</NavLink></span>}
      {authorised && <span><a href={server_host + '/users/logout'} >Выход</a></span>}
    </div>
  )
}