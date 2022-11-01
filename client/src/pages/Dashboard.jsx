import React from "react";
import Menu from "../components/Menu";
import { NavLink } from 'react-router-dom';

export default function Dashboard({server_host}) {
  const [loading, setLoading] = React.useState(true)
  const [needAuth, setNeedAuth] = React.useState(false)
  const [user, setUser] = React.useState({})

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
      await loadData()
    }else {
      setNeedAuth(true)
      setLoading(false)
    }
  }

  async function loadData() {
    const res = await fetch(server_host + "/users/me/", {
      method: 'get',
      credentials: 'include',
    })
    const data = await res.json()
    if(data.ok) {
      setUser(data.users)
    }
  }

  if(loading){
    return (
      <div className={'container text-center'}>
        <h2>Загрузка...</h2>
        </div>
    )
  }

  if (needAuth){
    return (
      <div className={'container text-center'}>
        <h2>Необхадимо войти</h2>
        <div><NavLink to={'/login'}>Перейти на форму входа</NavLink></div>
        </div>
    )
  }

  return (
    <div>
      <Menu />
      <div className={'container text-center'}>
        <h1>
          Личный кабинет
        </h1>
        <div>{JSON.stringify(user)}</div>
        <span><a href={server_host + "/users/logout"}>Выход</a></span>
      </div>
      
    </div>
  )
}