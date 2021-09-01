/* eslint-disable */
const auth = {
  namespaced: true,
  state: {
    user:
    {
      id: 2,
      civility: 'M.',
      name: 'LE PAVEC',
      firstName: 'Aurélie',
      email: 'a.lepavec@exatech-group.com',
      emailVerified: true,
      rgpdAccepted: true,
      passwordChanged: true,
      twoFactor: false,
      phone: '__vue_devtool_undefined__',
      mobile: '__vue_devtool_undefined__',
      abilities:

        [

          { id: 1, name: 'adm.par-manage', title: 'Adm.par manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 2, name: 'adm.ini-manage', title: 'Adm.ini manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 3, name: 'adm.util-manage', title: 'Adm.util manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 4, name: 'rh.sps-manage', title: 'Rh.sps manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 5, name: 'rh.sps-validate', title: 'Rh.sps validate', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 6, name: 'rh.adm-manage', title: 'Rh.adm manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 7, name: 'rh.signature', title: 'Rh.signature', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null }

        ],

      abilities_ids: []
    },

    /* User sans acces */
    name2:
    {
      id: 2,
      civility: 'M.',
      name: 'LE PAVEC',
      firstName: 'Aurélie',
      email: 'a.lepavec@exatech-group.com',
      emailVerified: true,
      rgpdAccepted: true,
      passwordChanged: true,
      twoFactor: false,
      phone: '__vue_devtool_undefined__',
      mobile: '__vue_devtool_undefined__',
      abilities:

        [

          { id: 2, name: 'adm.ini-manage', title: 'Adm.ini manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 3, name: 'adm.util-manage', title: 'Adm.util manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null },

          { id: 4, name: 'rh.sps-manage', title: 'Rh.sps manage', entity_id: null, entity_type: null, only_owned: false, options: [], scope: null }
        ],
      abilities_ids: []
    }

  },
  getters: {

    can: (state : any) => (inter: string) => {
      const user = state.user.abilities
      const some = user.some((user: { name: string }) => inter === user.name)
      return some
    },

    authUser: (state : any) => true,

    abilities: (state: any) => {
      return state.user.abilities
    }

  }
}

export default auth
