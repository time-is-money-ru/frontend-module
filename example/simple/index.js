window.addEventListener('load', () => {
  const timClient = new tim.Client({
    id: 0,
    secret: "00000000-0000-0000-0000-000000000000",
  });

  document.getElementById('timButton').addEventListener('click', () => {
      timClient.getDocuments(['passport', "INN"])
        .then(documents => {
          document.getElementById('firstName').value = documents.get('passport', 'first_name')
          document.getElementById('lastName').value = documents.get('passport', 'last_name')
          document.getElementById('secondName').value = documents.get('passport', 'patronymic')
          document.getElementById('inn').value = documents.get('INN', 'number')
        })
        .catch(err => {
          err && alert(err)
        })
    })
})


