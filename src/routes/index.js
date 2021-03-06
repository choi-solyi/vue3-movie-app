import { createRouter , createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // 1. hash 모드   ~~~주소~~~ /#/search
  // 2.history모드  서버에 설정?    
  history: createWebHashHistory(), 
  scrollBehavior() {
    return { top: 0 }
  },
  routes:[  //page 구분
    {
      //google.com/ <가장 메인 페이지
      path: '/',
      component: Home
    },
    {
      path: '/movie/:movieID',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})