<script setup>
import {loader} from "@time-is-money/frontend-module"
import { ref } from 'vue'

const userData = ref({
  lastName: "",
  firstName: "",
  inn: ""
})

async function clickTimButtonHandler() {
  const tim = await loader();
  const timClient = new tim.Client({
    id: 0,
    secret: "00000000-0000-0000-0000-000000000000",
  });

  timClient.getDocuments(['passport', "INN"])
    .then(data => {
      console.log(data)
      userData.value = {
        lastName: data?.passport?.last_name || userData.lastName,
        firstName: data?.passport?.first_name || userData.firstName,
        inn: data?.INN?.number || userData.inn,
      }
    })
    .catch(err => {
      err && alert(err)
    })
}
</script>

<template>
  <h1>Регистрация</h1>
  <button @click="clickTimButtonHandler">Заполнить через Tim</button>

  <form action="./refistrate">
    <label htmlFor="lastName">Фамилия</label>
    <input
      name="lastName"
      id="lastName"
      v-model="userData.lastName"
    />

    <label htmlFor="firstName">Имя</label>
    <input
      name="firstName"
      id="firstName"
      v-model="userData.firstName"
    />


    <label htmlFor="inn">Инн</label>
    <input
      name="inn"
      id="inn"
      v-model="userData.inn"
    />

    <button type="submit">Зарегистрировать</button>
  </form>
</template>

<style scoped>
</style>