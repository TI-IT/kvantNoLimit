import Menu from "../components/Menu";

export default function Home({server_host}) {
  return (
    <div>
      <Menu server_host={server_host} />
      <div className={'container text-center'}>
        <h1>
          Главная 45:31
        </h1>
      </div>
    </div>
  )
}