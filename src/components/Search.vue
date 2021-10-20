<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more " />
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
  </div>
</template>

<script>
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
          items:[10,20,30]
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
}
</style>