import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'
export default {
  //module 화 명시
  namespaced: true,

  //data == 상태
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),

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
      state.movies = [],
      state.message = _defaultMessage,
      state.loading = false
    }
  },
  //methods - 변경 허용 X  비동기로 처리가 되도록 되어있음
  actions: {
    async searchMovies({ state, commit }, payload){
      if(state.loading) return

      //검색이 시작되면 메세지를 초기화
      commit('updateState',{
        message: '',
        loading: true
      })
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
      } catch ({ message }) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState',{
          loading: false
        })
      }
    },
    async searchMovieWithID( {state, commit}, payload){
      if(state.loading) return

      //검색이 시작되면 메세지를 초기화
      commit('updateState',{
        theMovie: {}, //화면전환했을때 잠깐이라도 노출되는것을 방지
        loading: true
      })

      try{
        const res = await _fetcheMove(payload)
        console.log(res.data);
        commit('updateState',{
          theMovie: res.data
        })
      } catch (err) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState',{
          loading: false
        })
      }
    }
  }
}

async function _fetcheMove(payload){  // 언더바 == 여기서만 쓸꺼임
  return await axios.post('/.netlify/functions/movie', payload)
}