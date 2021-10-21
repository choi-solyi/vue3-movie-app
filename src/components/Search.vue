<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
<<<<<<< HEAD
      placeholder="Search for Movies, Series & more " />
=======
      placeholder="Search for Movies, Series & more " 
      @keyup.enter="apply" />
>>>>>>> e009a43edd37ea0bf38594143655f100c5c0724d
    <div class="selects">
      <select
        v-for="f in filters"
        v-model="$data[f.name]"
        :key="f.name"
        class="form-select">
        <option
          v-if="f.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in f.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
<<<<<<< HEAD
=======
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button> 
>>>>>>> e009a43edd37ea0bf38594143655f100c5c0724d
  </div>
</template>

<script>
<<<<<<< HEAD
=======

>>>>>>> e009a43edd37ea0bf38594143655f100c5c0724d
export default {
  data(){
    return{
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters:[
        {name:'type',
        items:['movie', 'series', 'episode']
        },
        {
          name: 'number',
<<<<<<< HEAD
          items:[10,20,30]
=======
          items:[10, 20, 30]
>>>>>>> e009a43edd37ea0bf38594143655f100c5c0724d
        },
        {
          name: 'year',
          items: (()=>{
            const years =[]
            const thisYear = new Date().getFullYear()
              for (let i = thisYear; i>= 1900; i--){
                years.push(i)
              }
            return years
          })()
        }
      ]
    }
<<<<<<< HEAD
=======
  },
  methods:{
    async apply(){    //async =비동기
      // const OMDB_API_KEY = 'ab697f6f'//'7035c60c'
      // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`)
      // console.log(res)

      // dispatch 를 이용해서 searchMovies를 불러오고, 오브젝트 인수를 넘겨줌
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
>>>>>>> e009a43edd37ea0bf38594143655f100c5c0724d
  }
}
</script>


<style lang="scss" scoped>
.container{
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child{
      margin-right: 0;
    };
  }
  .selects{
    display: flex;
    select{
      width:120px; 
      margin-right: 10px;
      &:last-child {
      margin-right: 0;
    };
    }
  }
<<<<<<< HEAD
=======

  .btn {
    width:120px;
    height:50px;
    font-weight: 700;
    flex-shrink: 0; //flex 비율 감소되지 않도록
  }
>>>>>>> e009a43edd37ea0bf38594143655f100c5c0724d
}
</style>