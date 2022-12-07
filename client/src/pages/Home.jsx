import  React from "react";
import Menu from "../components/Menu";

export default function Home({server_host}) {

  React.useEffect(() => {document.title = 'Главная'}, [])
  return (
    <div>
      <Menu server_host={server_host} />
      <div className={'container text-center'}>
        <h1>
          Главная 1:03:04
        </h1>
      </div>
    </div>
  )
}