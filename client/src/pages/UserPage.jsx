import  React from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import getAge from "get-age";

export default function UserPage({server_host}) {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {document.title = 'Пользователь'}, [])
  const params = useParams()
  React.useEffect(loadUser, [])

  function loadUser() {
        fetch(server_host + "/users/id/" + params.id, {
            credentials: "include"
        }).then(res => {
            return res.json()
        }).then(data => {
            setLoading(false)
            setUser(data.user)
        }).catch(e => {
            setLoading(false)
           console.error(e)
        })
    }

    if (loading) {
        return <div className={'container'}><h1>Загрузка</h1></div>
    }


    return (
        <div>
            <Menu server_host={server_host} />
            <div className={'container'}>
                <h1>{user.name}</h1>
                <div>{user.username}</div>
                <div>Возраст: {getAge(user.birthday)}</div>
                <div>{user.about}</div>
            </div>
        </div>
    )
}