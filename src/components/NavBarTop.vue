<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm" v-if="authUser">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="../assets/logo_navbar.png" class="rounded" alt="logo CMP">
        </a>
        <div id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ authUser.firstName }} {{ authUser.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-haut" aria-labelledby="navbarDropdownMenuLink" id="dropdown_choice">
                <li><router-link class="dropdown-item" to="/otpparam" id="link_to_otp">Authentification à deux facteurs</router-link></li>
                <li><a id="link_to_logout" class="dropdown-item" href="#" @click="logout()">Se déconnecter</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
/* import { mapGetters } from 'vuex' */
/* import initialState from '@/store' */

@Component({
/*   computed: {
    ...mapGetters('auth', ['authUser', 'isAdmin'])
  } */
})

export default class NavBarTop extends Vue {
  //  A virer
  authUser ={
    firstName: 'coucou',
    name: 'Hello'
  }

  // libelle_page = 'ACCUEIL'
  // Déconnexion
  logout () {
    this.$store.dispatch('auth/logout').then(() => {
      this.$store.dispatch('reset')
    })
  }
}

</script>

<style scoped lang="scss">
$secondary: red;

.dropdown-menu-haut.show {
    margin-left: -8rem;
}
.navbar{
  max-height: 4rem !important;
  z-index: 10400 !important;
}
.sidebar a:hover:not(.active), .router-link-exact-active {
  background-color: $secondary !important;
}

@media (max-width: 1025px) {
  #dropdown_choice{
    position:absolute !important;
    margin-left: -150px;
  }
}

</style>
