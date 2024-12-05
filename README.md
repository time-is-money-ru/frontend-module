# Time is Money
Наш [сайт](https://time-money.shop).

Этот модуль необходим для получения данных из приложения ТиМ, установленного на смартфоне пользователя.
Все, что вам нужно - это указать необходимые документы, а плагин возьмет все взаимодействие
на себя.

* [Установка](#install)
  + [NPM](#install-npm)
  + [CDN](#install-cdn)
* [Инициализация и подключение](#init)
  + [Ручная авторизация](#init-manual)
  + [Автоматическая автоирзация](#init-auto)
  + [Отображение QR-кода](#init-show-qr)
* Запрос данных
  + [Получение данных из приложения](#get-documents)
  + [Автоматическая вставка данных](#data-inserter)
* [Запрашиваемые документы и поля](#data-schema)
* [Примеры](#example)


<a name=""></a>
<a name="install"></a>
## Установка
Доступно несколько вариантов установки:

<a name="install-npm"></a>
#### NPM (рекомендуемый способ)
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

<a name="install-cdn"></a>
#### CDN
Добавьте скрипт на страницe вашего сайта:
```html
<script src="https://frontend-module.time-money.shop/v1/index.js" defer></script>
```

<a name="init"></a>
## Инициализация и настройка клиента
<a name="init-manual"></a>
#### Ручная авторизация
Если вы хотите чтобы пользователь(сотрудник) сам вводил id и secret, достаточно просто создать объект.
```js
const timClient = new tim.Client();
```
После успешного подключения, плагин запомнит эти параметры на 10 часов и не будет запрашивать их повторно.
___


<a name="init-auto"></a>
#### Автоматическая авторизация
Если вы хотите, чтоб подключение происходило автоматически: создайте объект клиента и передайте в конструктор параметры вашего плагина. Эти параметры можно найти на сайте в личном кабинете.
```js
const timClient = new tim.Client({
  id: 0,
  secret: "00000000-0000-0000-0000-000000000000",
});
```
---


<a name="init-show-qr"></a>
#### Отображение QR-кода
Для настройки отображения QR-кода необходимо передать параметр ```isShowQrCode```. По умолчанию значение параметра```true```.
```js
const timClient = new tim.Client({
    isShowQrCode: false,
  });
```
---

<a name="get-documents"></a>
## Получение данных из приложения
Для получения данных любым способом вам понадобится названия документов их полей.
Актуальный список можно посмотреть [здесь](./documents.md).

Чтобы получить объект с списком документов и их полей вызовите функцию ```getDocuments()```
и передайте необходимые из них.
Клиент сам отобразит интерфейс ТиМ и выполнит все взаимодействия с пользователем.
После завершения вам вернется объект с данными документов или ошибка. 
Используйте функцию `get(string documentName, string fieldName)` для получения нужного значения.
```js
timClient.getDocuments(['passport', "INN"])
  .then(data => {
    // присваиваем полям значение из ответа
    document.getElementById('firstName').value = documents.get('passport', 'first_name')
    document.getElementById('lastName').value = documents.get('passport', 'last_name')
    document.getElementById('secondName').value = documents.get('passport', 'patronymic')
    document.getElementById('inn').value = documents.get('INN', 'number')
  })
  .catch(err => {
    err && alert(err) // если пользователь закрое окно ТиМ. Вернется err === null
  })
```
> для избежания проблем с виртуальным DOM, этот способ является рекомендуемым вариантом.
---


<a name="data-inserter"></a>
## Автоматическая вставка данных
Плагин поддерживает автоматическую вставку в поля формы.
Для этого вставьте в поле атрибут ```data-tim```. Значение должно быть в формате
`<название документа>.<название поля>`.
Пример:
```html
<form id="exampleForm">
  <label for="firstName">Имя</label>
  <input name="firstName" id="firstName" data-tim="passport.first_name"/>
</form>
```
Дале в JS выполните
```js
const formElement = document.getElementById('exampleForm') // элемент в котором будут искаться атрибуты
timClient = new tim.Client(); // допустим любой способ инициализации
tim.insertByAttributes(timClient, formElement)
```
код самостоятельно найдет внутри formElement все указанные в атрибутах документы,
запросит данные и вставит их в поля формы.
___
Вы можете изменить название аттрибута.

```html
<form id="exampleForm">
  <label for="firstName">Имя</label>
  <input name="firstName" id="firstName" my-custom-attr="passport.first_name"/>
</form>
```
Для этого при вызове ```insertByAttributes```, укажите третьим параметром, 
название аттрибута:
```js
tim.insertByAttributes(timClient, formElement, 'my-custom-attr')
```

<a name="data-schema"></a>
## Запрашиваемые документы и поля
Актуальная версия названия документов и полей [здесь](./documents.md).

<a name="example"></a>
## Примеры
- [простое приложение](./example/simple/).
- [на React](./example/react/).
- [на Vue](./example/vue/).