import {createApp} from 'vue'
import App from './App'
import router from './routes/index.js'

createApp(App)
  .use(router)    //use : 특정 plugin 을 연결할 때 사용
  .mount('#app')