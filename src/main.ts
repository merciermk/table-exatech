import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import Vuex from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile, faPollH, faGraduationCap, faIdBadge, faUserCheck, faUsersCog, faFolderOpen, faPen, faFolder, faFileContract, faSubway, faHandHoldingUsd, faCog, faCalendarDay, faChalkboardTeacher, faTags, faBuilding, faBell, faUserShield, faUserFriends, faHome, faTimes, faAlignJustify, faCheck, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFile, faPollH, faGraduationCap, faIdBadge, faUserCheck, faUsersCog, faFolderOpen, faPen, faFile, faFolderOpen, faFolder, faFileContract, faSubway, faHandHoldingUsd, faCog, faCalendarDay, faChalkboardTeacher, faTags, faBuilding, faBell, faUserShield, faUserFriends, faHome, faTimes, faAlignJustify, faCheck, faFilter)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
