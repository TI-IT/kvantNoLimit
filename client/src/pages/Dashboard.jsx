import React from "react";
import Menu from "../components/Menu";

export default function Dashboard({server_host}) {
  const [loading, setLoading] = React.useState(true)
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
      setUser(data.user)
    }
  }

  if(loading){
    return (
      <div className={'container text-center'}>
        <h2>Загрузка...</h2>
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
      </div>
      
    </div>
  )
}