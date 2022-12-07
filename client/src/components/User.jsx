import { NavLink } from "react-router-dom";

export default function User({user, server_host}) {
  return (
    <NavLink to={'/users/' + user._id} style={{textDecoration: "none"}}>
    <div className={'user-card'}>
      <div><b>{user.name}</b></div>
      <div><b>{user.username}</b></div>
    </div>
    </NavLink>
  )
}