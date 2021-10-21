import axios from 'axios'
import { rest } from 'lodash'
import _uniqBy from 'lodash/uniqBy'

export default {
  //module 화 명시
  namespaced: true,

  //data == 상태
  stats: ()=>{
    []
  },

  //computed 계산된 데이터들
  // getters: {
  //   movieIds(state){
  //     return state.movies.map(m => m.imdbID)
  //   }
  // },

  //methods - 변이 여기에 있어야만 변경을 할수 있음
  mutations: {
    updateState(state, payload){
      //배열 생성
      /// ['movies','message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.movies = []
    }
  },
  //methods - 변경 허용 X  비동기로 처리가 되도록 되어있음
  actions: {
    async searchMovies({ state, commit }, payload){
      try {
        const res = await _fetcheMove({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID') 
        })
        console.log(totalResults) //frozen 268개
        console.log(typeof totalResults)  //string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil( total / 10)
  
        //추가 요청 전송
        if( pageLength > 1){
          for(let page = 2; page <= pageLength; page++){
            if( page > (payload.number / 10) ) break
            const res = await _fetcheMove({
              ...payload,
              page: page  //page <라고 생략가능
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch (err) {
        commit('updateState', {
          movies: [],
          message: err
        })
      }
    }
  }
}

function _fetcheMove(payload){  // 언더바 == 여기서만 쓸꺼임
 const { title, type, year, page } = payload
 const OMDB_API_KEY = 'ab697f6f'
 const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
//  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

 return new Promise((resolve, reject) => { 
   axios.get(url)
    .then(res => {
      // omdb의 경우 에러가 발생해도 200 코드를 반환하는 경우가 있으므로
      // 따로 예외처리를 해주어야 한다
      if(res.data.Error){       
        reject(res.data.Error)
        return
      }
      resolve(res)
    })
    .catch(err => {
      reject(err.message)
    })
 })
}