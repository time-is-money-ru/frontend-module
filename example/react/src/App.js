import './App.css';
import {loader} from "@time-is-money/frontend-module"
import {useState} from "react";


function App() {
  const [userData, setUserData] = useState({
    lastName: "",
    firstName: "",
    inn: ""
  });

  const clickTimButtonHandler = async () => {
    const tim = await loader();
    const timClient = new tim.Client({
      id: 0,
      secret: "00000000-0000-0000-0000-000000000000",
    });

    timClient.getDocuments(['passport', "INN"])
      .then(data => {
        setUserData({
          lastName: data?.passport?.last_name || userData.lastName,
          firstName: data?.passport?.first_name || userData.firstName,
          inn: data?.INN?.number || userData.inn,
        })
      })
      .catch(err => {
        err && alert(err)
      })
  }

  return (
    <div className="App">
      <h1>Регистрация</h1>
      <button onClick={clickTimButtonHandler}>Заполнить через Tim</button>

      <form action="./refistrate">
        <label htmlFor="lastName">Фамилия</label>
        <input
          name="lastName"
          id="lastName"
          value={userData.lastName}
          onChange={event => {
            setUserData({
              ...userData,
              lastName: event.target.value
            })
          }}
        />

        <label htmlFor="firstName">Имя</label>
        <input
          name="firstName"
          id="firstName"
          value={userData.firstName}
          onChange={event => {
            setUserData({
              ...userData,
              firstName: event.target.value
            })
          }}
        />


        <label htmlFor="inn">Инн</label>
        <input
          name="inn"
          id="inn"
          value={userData.inn}
          onChange={event => {
            setUserData({
              ...userData,
              inn: event.target.value
            })
          }}
        />

        <button type="submit">Зарегистрировать</button>
      </form>
    </div>
  );
}

export default App;
