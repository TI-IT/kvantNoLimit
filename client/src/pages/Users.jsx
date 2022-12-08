import Menu from "../components/Menu";
import {useEffect, useState} from "react";
import User from "../components/User";

export default function Users({server_host}) {

    const [users, setUsers] = useState([])
    const [params, setParam] = useState({name: '', about: '', minAge: 0, maxAge: 100})

    useEffect(loadUsers, [])

    function loadUsers() {
        fetch(server_host + '/users/get/all', {
            method: 'get',
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.ok) {
                setUsers(data.users)
            }
        })
    }

    function search(name, value) {



        const updatedParams = {
            ...params,
            [name]: value
        }

        console.log(name, value)
        setParam(updatedParams)

        fetch(server_host + '/users/search?about=' + updatedParams.about + "&name=" + updatedParams.name
            + "&minAge=" + updatedParams.minAge
            + "&maxAge=" + updatedParams.maxAge, {
            method: 'get',
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.ok) {
                setUsers(data.users)
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
                <div style={{marginBottom: 10}}>
                    <form>
                        <input type={"text"} placeholder={"name"} onChange={e => search('name', e.target.value)} />&nbsp;
                        <input type={"text"} placeholder={"about"} onChange={e => search('about', e.target.value)} />&nbsp;
                        <input type={"number"} placeholder={"min"} onChange={e => search('minAge', e.target.value)} />-
                        <input type={"number"}  placeholder={"max"} onChange={e => search('maxAge', e.target.value)} />
                    </form>
                </div>
                <div>{users.map(user => <User server_host={server_host} user={user} key={user._id}/>)}</div>
            </div>
        </div>
    )
}