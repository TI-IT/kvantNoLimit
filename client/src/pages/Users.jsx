import React from 'react'
import Menu from "../components/Menu";
import User from "../components/User";

export default function Users({server_host}) {

  React.useEffect(() => {document.title = 'Пользователи'}, [])
  const [users, setUsers] = React.useState([])
  const [params, setParams] = React.useState({name: '', about: '', minAge: 0, maxAge: 100})
  React.useEffect(loadUsers, [])

  function loadUsers() {
    setUsers([])
    fetch(server_host + '/users/get/all', {
      method: 'get',
      credentials: 'include',
    }).then(res => {
      return res.json()
    }).then(data => {
      // console.log(data)
      if (data.ok) {
        setUsers(data.users)
      }else {
        console.log("datta no ok")
      }
    })
  }

  function search(name, value) {

    const updatedParams = {
      ...params,
      [name]: value
    }

    setParams(updatedParams)
    fetch(server_host 
      + '/users/search?about=' + updatedParams.about 
      + "&name=" + updatedParams.name
      + "&minAge=" + updatedParams.minAge
      + "&maxAge=" + updatedParams.maxAge
      , {
      method: 'get',
      credentials: 'include',
    }).then(res => {
      return res.json()
    }).then(data => {
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
          Пользователи
        </h1>
        <div style={{marginBottom: "10px"}}>
          <form>
            <input type={"text"} onChange={e => search(e.target.value)}/> &nbsp;
            <input type={"number"} onChange={e => search(e.target.value)}/>-
            <input type={"number"} onChange={e => search(e.target.value)}/>
          </form>
        </div>
        <div>{users.map(user => <User server_host={server_host} user={user} key={user._id}/>)}</div>
      </div>
    </div>
  )
}