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


## Использование
### Инициализация клиента
#### Автоматическое подключение
Если вы хотите, чтоб данные плагина подставлялись автоматически: создайте объект клиента и передайте в конструктор параметры вашего плагина. Эти параметры можно найти на сайте в личном кабинете.
```js
const timClient = new tim.Client({
  id: 0,
  secret: "00000000-0000-0000-0000-000000000000",
});
```
---
#### Ручной ввод
Если вы хотите чтобы пользователь(сотрудник) сам вводил параметры клиента, необходимо создать объект клиента без параметров.
Для сотрудника
Шаг 1. Создайте клиент.
```js
const timClient = new tim.Client();
```
___
### Получение данных из приложения
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
> для избежания проблем с виртуальным DOM, способ описанный выше является рекомендуемым вариантом.
---
#### Автоматическая вставка данных
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

## Примеры
- [простое приложение](./example/simple/).
- [на React](./example/react/).
- [на Vue](./example/vue/).

## Документы и поля
Актуальная версия названия документов и полей [здесь](./documents.md).