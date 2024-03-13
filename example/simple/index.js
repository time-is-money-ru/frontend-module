window.addEventListener('load', () => {
  const timClient = new tim.Client({
    id: 0,
    secret: "00000000-0000-0000-0000-000000000000",
  });

  document.getElementById('timButton').addEventListener('click', () => {
      timClient.getDocuments(['passport', "INN"])
        .then(data => {
          document.getElementById('data').innerHTML = JSON.stringify(data)
          document.getElementById('firstName').value = data?.passport?.first_name
          document.getElementById('lastName').value = data?.passport?.last_name
          document.getElementById('secondName').value = data?.passport?.patronymic
          document.getElementById('inn').value = data?.INN?.number
        })
        .catch(err => {
          err && alert(err)
        })
    })
})


