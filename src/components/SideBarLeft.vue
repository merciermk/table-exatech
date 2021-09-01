<template>
  <!-- le composant est alimenté par  -->
  <div>
    <nav
      id="cmp-nav-left"
      @mouseover="openNavbar()"
      @mouseleave="closeNavbar()"
      :class="navStyle"
      v-if="dataReady"
    >
      <!-- Element central du menu -->
      <ul class="nav-elements">
        <!-- elements -->
        <li
          v-for="(menu, index) in navElements"
          :key="'middle' + index"
          :class="
            menu.topElement
              ? 'firstElement'
              : '' || menu.bottomElement
              ? 'lastElement'
              : ''
          "
        >
          <!-- logique avec des sous-elements -->
          <div v-if="menu.childElement">
            <div>
              <div
                :id="'heading' + menu.id"
                class="pt-3 pb-3 collapsed d-flex align-items-center "
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + menu.id"
                aria-expanded="false"
                :aria-controls="menu.id"
              >
                <a>
                  <font-awesome-icon :icon="menu.icon" class="nav-icon" />
                  {{ menu.name }}</a
                >
                <span class="accordion-state">&#9658;</span>
              </div>
              <ul
                :id="menu.id"
                class="collapse"
                :aria-labelledby="'heading' + menu.id"
                :data-bs-parent="menu.dataBsParent"
              >
                <!-- Sous-menus -->
                <li
                  class="sousmenu"
                  v-for="(sousMenu, index) in menu.sousMenu"
                  :key="'sub1' + index"
                  @click="closeNavbar()"
                >
                  <router-link
                    :to="sousMenu.subPath"
                  >
                    <font-awesome-icon
                      :icon="sousMenu.subIcon"
                      class="nav-submenu-icon"
                    />
                    {{ sousMenu.subName }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- logique sans sous-elements -->
          <div v-if="!menu.childElement" @click="closeNavbar()">
            <div>
              <router-link
                :to="menu.path"
                class="pt-3 pb-3 d-flex align-items-center hover"
                :id="menu.id"
              >
                <font-awesome-icon :icon="menu.icon" class="nav-icon" />
                {{ menu.name }}
              </router-link>
            </div>
          </div>
          <!-- barre sous le premier élément -->
          <hr v-if="index === 0" class="top-hr" />
        </li>
      </ul>
    </nav>
    <div>
      <!-- Button Wrap -->
      <div class="toggle-btn" :class="toggled ? 'btn-is-close' : 'btn-is-open'" @click="toggled ? openNavbar() : closeNavbar()">
        <font-awesome-icon
          :icon="buttonIcon"
          aria-hidden="true"
          class="toggle-btn-icon"
        />
      </div>

      <!-- lower btn vient se placer derriere le menu afin de creer un clic de fermeture dans la fenetre. activé uniquement sur les ecrans tactiles  -->
      <div :class="toggled ? '' : 'lowerBtn'" @click="closeNavbar()"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapState } from 'vuex'
import { functionsForAuth } from '@/types/AuthorisationMenu'

@Component({
  computed: {
    ...mapGetters('auth', ['authUser', 'can', 'cannot', 'isA', 'isNotA']),
    ...mapState('auth', ['user', 'authUser'])
  }
})
export default class SideBarLeft extends Vue {
  navElements!: string[]
  dataReady = false

  initMenu () {
    // console.log('init du menu')
    this.navElements = functionsForAuth.menuFiltered(functionsForAuth.menuElements)
    this.dataReady = true
  }
  /* état de la barre
    navStyle change la classe 'is-close'/'is-open'
  */

  toggled = true;
  navStyle = 'is-close';

  /* gestion de l'icone du toggle btn */
  toggleBtnOpenIt = 'align-justify';
  toggleBtnCloseBtn = 'times';
  buttonIcon = this.toggleBtnOpenIt;

  closeNavbar (): void {
    if (!this.toggled) {
      this.navStyle = 'is-close'
      this.toggled = !this.toggled
      this.buttonIcon = this.toggleBtnOpenIt
    }
  }

  openNavbar (): void {
    if (this.toggled) {
      this.navStyle = 'is-open'
      this.toggled = !this.toggled
      this.buttonIcon = this.toggleBtnCloseBtn
    }
  }

  mounted () {
    // console.log('mounted sidebarleft')
    if (this.$store.state.auth.user.abilities && this.$store.state.auth.user.abilities.length !== 0) {
      this.initMenu()
      // console.log(this.$store.state.auth.user.abilities)
    }
  }
}
</script>
<style scoped lang="scss">
button:not(:disabled),
[type="button"]:not(:disabled),
[type="reset"]:not(:disabled),
[type="submit"]:not(:disabled),
.btn:disabled {
  padding-left: 0 !important;
}

.hover:hover,
a:hover{
  color: rgb(255, 255, 255) !important;
}

.router-link-exact-active {
  background-color: rgb(0, 0, 0, 0.075) !important;
}

/* Cache le scroll */
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

button, [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: none;
}

@import './src/style.scss';

</style>
