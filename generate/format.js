const data = require('./data.json');
const fs = require('fs')

let text = `
# Актуальный список документов
`

data.forEach((obj) => {
  obj.listDocuments.forEach((item) => {
    text += `**${item.idServer} - ${item.title}**\n`

    for (let i = 0; i < item.fields.length; i++) {
      text += `- ${item.fields[i].idServer}: ${item.fields[i].title}\n`
    }

    text += '--- \n'

  })
})

fs.writeFile('./documents.md', text, function(err) {
  if (err) {
    return console.log('ERROR', err)
  }
  console.log('PASS')
})