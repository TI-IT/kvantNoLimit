import React from 'react'
import Menu from "../components/Menu";

export default function Users({server_host}) {

  React.useEffect(() => {document.title = 'Пользователи'}, [])
  const [users, setUsers] = React.useState([])
  React.useEffect(loadUsers, [])

  function loadUsers() {
    setUsers([])
    fetch(server_host + '/users/get/all', {
      method: 'get',
      credentials: 'include',
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      if (data.ok) {
        setUsers(data.users)
      }else {
        console.log("datta no ok")
      }
    })
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={'container text-center'}>
        <h1>
          Пользователи 777
        </h1>
        <div>{JSON.stringify(users)}</div>
      </div>
    </div>
  )
}