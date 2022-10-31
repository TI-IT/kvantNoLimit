import React from "react";
import Menu from "../components/Menu";

export default function Users() {

  const [users, setUsers] = React.useState([]);

 React.useEffect(loadUsers, []);

  function loadUsers() {
    fetch('http://localhost:9001/users/get/all', {
      method: "get",
      credentials: 'include'
    }).then(res => {
      return res.json()
    }).then(data => {
      if(data.ok){
        setUsers(data.users)
      }
    })
  }

  console.log(users)
  return (
    <div>
      <Menu />
      <div className={'container text-center'}>
        <h1>
          Пользователи
        </h1>
        <div>{JSON.stringify(users)}</div>
      </div>
      
    </div>
  )
}