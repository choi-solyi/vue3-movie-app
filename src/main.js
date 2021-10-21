import {createApp} from 'vue'
import App from './App'

import router from './routes/index.js'  //index.js 생략 가능
import store from './store/index.js'    //마찬가지ㅇㅇ /store 로 작성해도ok

createApp(App)
  .use(router)    //use : 특정 plugin 을 연결할 때 사용
  .use(store)
  .mount('#app')