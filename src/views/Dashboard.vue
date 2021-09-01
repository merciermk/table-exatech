<template>
  <div class="dashboard"
  v-if="dashboardReady"
  >
    <div @click="settingModalFunc()" class="setting-icon">
      <p>Settings</p>
    </div>
    <dashboard-settings-modal
    v-if="toggleSettingModal"
    @close="settingModalFunc"
    :data="dashboardElements"
    >
    </dashboard-settings-modal>

    <div :class="dashboardElement.show ? 'vfor-dashboard': ''" v-for="(dashboardElement, index) in dashboardElements" :key="index"
    >
      <div v-if="dashboardElement.show" class='dashboard-element'>
        <big-card
          :cardIcon="dashboardElement.cardIcon"
          :allCards="dashboardElement.allCards"
        >
      </big-card>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BigCard from '@/components/dashboardComp/DashboardCard.vue'
import { functionsForDashboard } from '@/types/dashboard'
import { mapGetters, mapState } from 'vuex'
import DashboardSettingsModal from '@/components/dashboardComp/DashboardSettingsModal.vue'

@Component({
  computed: {
    ...mapGetters('auth', ['authUser', 'can', 'cannot', 'isA', 'isNotA']),
    ...mapState('auth', ['user', 'authUser'])
  },
  components: {
    BigCard,
    DashboardSettingsModal
  }
})
export default class Dashboard extends Vue {
  dashboardElements: any
  dashboardReady = false

  toggleSettingModal =false

  settingModalFunc () : void {
    this.dashboardElements = JSON.parse(window.localStorage.getItem('dashboardElements') || '{}')
    this.toggleSettingModal = !this.toggleSettingModal
  }

  initMenu ():void {
    // console.log('init du menu')
    if (!window.localStorage.getItem('dashboardElements')) {
      window.localStorage.setItem('dashboardElements', JSON.stringify(functionsForDashboard.dashboardFiltered(functionsForDashboard.dashboardElements)))
    }
    this.dashboardElements = JSON.parse(window.localStorage.getItem('dashboardElements') || '{}')
    this.dashboardReady = true
  }

  mounted ():void {
    this.dashboardElements = window.localStorage.getItem('dashboardElements')
    console.log('mounted')
    if (this.$store.state.auth.user.abilities && this.$store.state.auth.user.abilities.length !== 0) {
      this.initMenu()
      if (!window.localStorage.getItem('dashboardElements')) {
        window.localStorage.setItem('dashboardElements', JSON.stringify(this.dashboardElements))
      }
    }
    console.log(this.dashboardElements)
    console.log('dashelement')
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Product Sans";
  src: local("/fonts/ProductSans-Regular.ttf") format("truetype");
}

.dashboard {
  font-family: "Product Sans", sans-serif;
}
/* Variables */
$dashboard-margin-top: 5rem;
$dashboard-margin-left: 4rem;
$dashboard-margin-bottom: 20px;
$dashboard-margin-right: 20px;

.dashboard {
  position: absolute;
  width: 95%;
  font-size: 14px;
  min-height: calc(100vh - 50px - 50px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: $dashboard-margin-top $dashboard-margin-right $dashboard-margin-bottom
    $dashboard-margin-left;
}

.dashboard-element{
  display: flex;
  justify-content: flex-start;
  width: 100%;
  min-height: 0;
  padding: 0;
  margin: 0;
}
.dashboard-element-hide{}
.vfor-dashboard:nth-child(even) .dashboard-element {
  background-color: rgba(163, 163, 163, 0.116);
}

.setting-icon{
  position: relative;
  font-size: 30px;
  color: rgba(163, 163, 163, 0.116);
}

.vfor-dashboard{
  display: flex;
  flex-direction: row;
  width: 100%
}

big-card{
  align-self: center;
  height: 100%
}

</style>
