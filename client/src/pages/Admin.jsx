import React from 'react'
import Menu from "../components/Menu";

export default function Admin({server_host}) {
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
      <div className={'container'}>
        <h1>
          Admin
        </h1>
        <div>
          <table>
            <thead>
              <td>Email</td>
              <td>Пароль</td>
              <td>Роль</td>
            </thead>
            <tbody>
              {users.map(user => <tr>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}