<template>
  <div>
    <!--NavBar top-->
    <nav-bar-top></nav-bar-top>

    <!-- Side navigation -->
    <side-bar-left></side-bar-left>

    <!-- Page content -->
    <router-view></router-view>

  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import NavBarTop from '@/components/NavBarTop'
import SideBarLeft from '@/components/SideBarLeft.vue'

@Component({
  computed: {

  },
  components: {
    'nav-bar-top': NavBarTop,
    'side-bar-left': SideBarLeft
  }
})
export default class App extends Vue {

}
</script>

<style>
@font-face {
  font-family: 'Product Sans';
  src: local('/fonts/ProductSans-Regular.ttf') format('truetype');
}
</style>
