<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name" 
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"   
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink> 
      </div>
    </div>
  </header>
</template>


<script>
import Logo from '~/components/Logo'
export default {
  components:{
    Logo
  },
  data(){
    return{
      navigations:[
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/    // '/movie'로 시작하는경우에 일치시키겟다
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      if (!path ) return false
      console.log(this.$router)
      return path.test(this.$route.fullPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo{
      margin-right: 40px;
    }
  }
</style>