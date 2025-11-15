import { PUBLIC_API_URL } from '../../backend/config/apiConfig.js'
import { URL_SERVER } from '../../backend/config/apiConfig.js'
import { fetchDataFromAPI } from '../../backend/services/dataSeeder.js'
import { post, del } from '../src/api/script.js'

import cors from 'cors'

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
del(URL_SERVER);
//берем данные с API
fetchDataFromAPI(PUBLIC_API_URL)
  .then(data => {
        data.forEach(student => {
            post(URL_SERVER, student) // заполняем базу данных
              .then(data => {
                console.log('data import', data)
              })
        })  
      .catch (error => console.log('error import ', error))
  })
  .catch(error => console.log('error fetchDataFromAPI', error))

})