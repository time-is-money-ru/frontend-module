window.addEventListener('load', () => {
  const formElement = document.getElementById('form')

  const timClient = new tim.Client({
    id: 0,
    secret: "00000000-0000-0000-0000-000000000000",
  });

  document.getElementById('timButton').addEventListener('click', () => {
      tim.insertByAttributes(timClient, formElement)
    })
})


