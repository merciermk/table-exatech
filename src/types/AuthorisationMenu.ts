
/* eslint-disable no-unused-vars */
import { Ability } from '@/types/Ability'
import { Menu } from '@/types/Menu'
import store from '@/store/index'

/* Droits des utilisateurs */
const RH_SPS_DOSSIER_OWN_MANAGE = Ability.RH_SPS_DOSSIER_OWN_MANAGE
const RH_SPS_MANAGE = Ability.RH_SPS_MANAGE
const ADM_INI_MANAGE = Ability.ADM_INI_MANAGE
const RH_ADM_MANAGE = Ability.RH_ADM_MANAGE
const ADM_PAR_MANAGE = Ability.ADM_PAR_MANAGE
const RH_SIGNATURE = Ability.RH_SIGNATURE

/* **********************************************************
   **** Gestion des élements du menu **************************
   **** id: utilisé pour bootstrap accordion ******************
   **** dataBsParent : id de la balise principale du menu *****
   **** childElement : true si il y a un sous menu ************
   **** Le premier et le dernier element du menu se ************
   *************************************************************/

const dashboard: Menu = {
  name: 'TABLEAU DE BORD',
  id: 'dashboard',
  auth: [true],
  icon: 'home',
  dataBsParent: '#cmp-nav-left',
  childElement: false,
  topElement: true,
  path: '/dashboard'
}

const dossierAcademiques: Menu = {
  name: 'DOSSIERS ACADÉMIQUES',
  id: 'dossiersAcademiques',
  auth: [RH_SPS_MANAGE],
  icon: 'graduation-cap',
  dataBsParent: '#cmp-nav-left',
  childElement: true,
  sousMenu: [
    {
      subName: 'Dossiers académiques',
      auth: [RH_SPS_MANAGE],
      subIcon: 'id-badge',
      subPath: '/dossiers_academiques'
    },
    {
      subName: 'Sélection des intervenants',
      auth: [RH_SPS_MANAGE],
      subIcon: 'user-check',
      subPath: '/selections'
    },
    {
      subName: 'Affectation des intervenants',
      auth: [RH_SPS_MANAGE],
      subIcon: 'users-cog',
      subPath: '/affectations'
    }
  ]
}

const dossierAdministratif: Menu = {
  name: 'DOSSIERS ADMINISTRATIFS',
  id: 'DOSSIERADMINISTRATIFS',
  auth: [RH_ADM_MANAGE],
  icon: 'folder-open',
  dataBsParent: '#cmp-nav-left',
  childElement: true,
  sousMenu: [
    {
      subName: 'Types de contrat',
      auth: [RH_ADM_MANAGE],
      subIcon: 'file',
      subPath: '/contrats_types'
    },
    {
      subName: 'Barèmes de rémunérations',
      auth: [RH_ADM_MANAGE],
      subIcon: 'poll-h',
      subPath: '/baremes_remunerations'
    },
    {
      subName: 'Dossiers administratifs',
      auth: [RH_ADM_MANAGE],
      subIcon: 'folder',
      subPath: '/dossiers_administratifs'
    },
    {
      subName: 'Contrats',
      auth: [RH_ADM_MANAGE],
      subIcon: 'file-contract',
      subPath: '/dossiers_administratifs/contrats'
    },
    {
      subName: 'Ordres de mission',
      auth: [RH_ADM_MANAGE],
      subIcon: 'subway',
      subPath: '/dossiers_administratifs/ordres_mission'
    },
    {
      subName: 'Demandes de remboursement',
      auth: [RH_ADM_MANAGE],
      subIcon: 'hand-holding-usd',
      subPath: '/dossiers_administratifs/demandes_remboursement'
    }
  ]
}

const signatureDesDocuments: Menu = {
  name: 'SIGNATURE DES DOCUMENTS',
  id: 'signatureDoc',
  auth: [RH_SIGNATURE],
  icon: 'pen',
  dataBsParent: '#cmp-nav-left',
  childElement: false,
  path: '/signature_documents'
}

const configurations: Menu = {
  name: 'CONFIGURATIONS',
  id: 'CONFIGURATIONS',
  auth: [ADM_PAR_MANAGE],
  icon: 'cog',
  dataBsParent: '#cmp-nav-left',
  childElement: true,
  bottomElement: true,
  sousMenu: [
    {
      subName: 'Sessions',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'calendar-day',
      subPath: '/sessions'
    },
    {
      subName: 'Postes',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'chalkboard-teacher',
      subPath: '/postes'
    },
    {
      subName: 'Matières',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'tags',
      subPath: '/matieres'
    },
    {
      subName: 'Etablissements',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'building',
      subPath: '/etablissements'
    },
    {
      subName: 'Modèles de notification',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'bell',
      subPath: '/notificationTemplates'
    },
    {
      subName: 'RGPD',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'user-shield',
      subPath: '/etatDataRgpd'
    },
    {
      subName: 'Utilisateurs',
      auth: [ADM_PAR_MANAGE],
      subIcon: 'user-friends',
      subPath: '/users'
    }
  ]
}

const functionsForAuth = {
  menuElements: [
    dashboard,
    dossierAcademiques,
    dossierAdministratif,
    signatureDesDocuments,
    configurations
  ], // tableau des elements du menu, celui utilisé pour checker les droits

  /**
   * fonction de filtre des droits. Parcours les éléments du menu, renvois un array avec les elements authorisés et les acréditations
    */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  theFilterFunction (menuElements: any) {
    const menuFilter: any[] = []
    for (const menu of menuElements) {
      if (menu.auth.indexOf(true) !== -1) {
        menuFilter.push(menu)
      }
      for (const ua of menu.auth) {
        if (store.getters['auth/can'](ua)) {
          menuFilter.push(menu)
        }
      }
    }
    return menuFilter
  },

  /**
   * Fonction utilisant userAuth et theFilterFunction. Controle le menu et les sous-menu, renvois le tableau final pret pour SideBarLeft. Utilise theFilterFunction
    */
  menuFiltered (menuElements: Menu[]) {
    // console.log('chargement menu')
    const menuFiltered = this.theFilterFunction(menuElements)
    for (const element of menuFiltered) {
      if (element.childElement) {
        element.sousMenu = this.theFilterFunction(element.sousMenu)
      }
    }
    console.log(menuFiltered)
    return menuFiltered
  }
}

export { functionsForAuth }
