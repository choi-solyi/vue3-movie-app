import axios from 'axios'
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
    async searchMovies({state, commit}, payload){
      const { title, type, number, year } = payload
      const OMDB_API_KEY = 'ab697f6f'
      
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)

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
          if( page > (number / 10) ) break
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [
              ...state.movies, ..._uniqBy(Search, 'imdbID')
            ]
          })
        }
      }
    }
  }
}