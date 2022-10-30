import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className={'menu'}>
      <span><NavLink to={'/'}>Главная</NavLink></span>
      <span><NavLink to={'/login'}>Вход</NavLink></span>
      <span><NavLink to={'/signup'}>Регистрация</NavLink></span>
    </div>
  )
}