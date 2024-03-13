# Time is Money
Наш [сайт](https://time-money.shop).

Этот модуль необходим для получения данных из приложения ТиМ, установленного на смартфоне пользователя.
Все, что вам нужно - это указать необходимые документы, а плагин возьмет все взаимодействие
на себя.

## Установка
Доступно несколько вариантов установки:

#### npm
Выполните команду в терминале:
```
npm i @time-is-money/frontend-module
```

Перед использованием дождитесь загрузки модуля, 
внутри обработчика кнопки вызова плагина.
```jsx
import {loader} from "@time-is-money/frontend-module"

const clickTimButtonHandler = async () => {
  const tim = await loader()

  // работа с плагином
}
```

#### CDN
Добавьте скрипт внутри тега ```<head>``` на страницe вашего сайта:
```html
<script src="https://frontend-module.time-money.shop/v1/index.js" defer></script>
```


## Пример использование
Создайте клиент и передайте в конструктор параметры вашего плагина. Эти параметры можно найти на сайте в личном кабинете.
```js
const timClient = new tim.Client({
  id: 0,
  secret: "00000000-0000-0000-0000-000000000000",
});
```

Вызовите функцию getDocuments() и передайте необходимый список документов.
Актуальный список документов можно посмотреть [здесь](./documents.md).
Клиент сам отобразит интерфейс ТиМ и выполнит все взаимодействия с пользователем.
После завершения вам вернется объект с данными документов или ошибка.
```js
timClient.getDocuments(['passport', "INN"])
  .then(data => {
    // присваиваем полям значение из ответа
    document.getElementById('firstName').value = data?.passport?.first_name
    document.getElementById('inn').value = data?.INN?.number
  })
  .catch(err => {
    err && alert(err) // если пользователь закрое окно ТиМ. Вернется err === null
  })
```
Пример результата ```getDocuments(['passport', "INN"])```
```json
{
  "passport": {
    "series": "2385",
    "number": "658927",
    "last_name": "Летов",
    "first_name": "Егор",
    "patronymic": "Федорович",
    "birth_date": "1964-09-10",
    "sex": "Мужской",
    "birthplace": "Омск, город Омск, Омская область",
    "department_name": "Мвд города Омск",
    "issue_date": "1975-06-01",
    "department_number": "333-000",
    "registration_address": "Омск, улица Ленина, 22"
  },
  "INN": {
    "number": "122356789865004835000"
  }
}
```
**Внимание!** В ответе будут только объекты документов, которые заполнены у пользователя. Это значит, что если
в приложении Tim у пользователя не заполнены, например, паспортные данные, то ``getDocuments(['passport])`` вернет пустой объект.

# Примеры
- [простое приложение](./example/simple/).
- [на React](./example/react/).
- [на Vue](./example/vue/).