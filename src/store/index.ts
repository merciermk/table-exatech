import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataForTest: {
      fields: [
        {
          key: 'nom',
          label: 'nom',
          sortable: true
        },
        {
          key: 'Poste',
          sortable: false
        },
        {
          key: 'filieres',
          label: 'Filiere',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: 'danger'
        },
        {
          key: 'matiere',
          label: 'matiere',
          sortable: false
        },
        {
          key: 'etats',
          sortable: false
        }
      ],
      datas: [
        {
          nom: 'Mercier',
          Poste: 'Docteur',
          filieres: 'MP',
          matiere: 'Math',
          etat: 'ok'
        },
        {
          nom: 'Mercier',
          Poste: 'Docteur',
          filieres: 'MP',
          matiere: 'Math',
          etat: 'ok'
        },
        {
          nom: 'Mercier',
          Poste: 'Docteur',
          filieres: 'MP',
          matiere: 'Math',
          etat: 'ok'
        }
      ],
      filterSection: [{
        libelle: 'nom',
        defautOptionlibelle: 'Rechercher un',
        model: 'nom',
        value: '',
        index: 'name',
        datas: [],
        loading: false,
        options:
          { type: 'form' }
      },
      {
        libelle: 'poste',
        defautOptionlibelle: 'Tous les',
        model: 'posteSouhaits',
        value: '-',
        index: 'name',
        datas: [{ name: 'Poste1' }, { name: 'Poste2' }, { name: 'Poste3' }],
        loading: false,
        options: { type: 'deroulant' }

      },
      {
        libelle: 'Filiere',
        defautOptionlibelle: 'Toutes les',
        model: 'concour',
        value: '-',
        index: 'name',
        datas: [{ name: 'Fil1' }, { name: 'Fil2' }, { name: 'Fil3' }],
        loading: false,
        options: { type: 'deroulant' }
      },
      {
        libelle: 'matiere',
        defautOptionlibelle: 'Toutes les',
        model: 'matiere',
        value: '-',
        index: 'name',
        datas: [{ name: 'Matiere1' }, { name: 'matiere2' }, { name: 'Matiere3' }],
        loading: false,
        options: { type: 'deroulant' }
      },
      {
        libelle: 'etats',
        defautOptionlibelle: 'Tous les',
        model: 'etat',
        value: '-',
        index: 'id',
        datas: [{ name: 'bien' }, { name: 'pas bien' }, { name: 'moyen bien' }],
        loading: false,
        options: { type: 'deroulant' }

      }
      ]
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getDatas (state) {
      return state.dataForTest
    },
    datas (state) {
      return state.dataForTest.datas
    },
    filtersSection (state) {
      return state.dataForTest.filterSection
    },
    fields (state) {
      return state.dataForTest.fields
    }
  },
  modules: {
    auth
  }
})