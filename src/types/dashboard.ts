
/* eslint-disable no-unused-vars */
import { Ability } from '@/types/Ability'
import store from '@/store/index'

/* Droits des utilisateurs */
// eslint-disable-next-line
const RH_SPS_DOSSIER_OWN_MANAGE = Ability.RH_SPS_DOSSIER_OWN_MANAGE
// eslint-disable-next-line
const RH_SPS_MANAGE = Ability.RH_SPS_MANAGE
// eslint-disable-next-line
const ADM_INI_MANAGE = Ability.ADM_INI_MANAGE
// eslint-disable-next-line
const RH_ADM_MANAGE = Ability.RH_ADM_MANAGE
// eslint-disable-next-line
const ADM_PAR_MANAGE = Ability.ADM_PAR_MANAGE
// eslint-disable-next-line
const RH_SIGNATURE = Ability.RH_SIGNATURE

// Affichage quand la personne a terminé les taches
interface DashboardDoneInformations {
  type: string,
  doneText: string,
  doneBottomText?: string, // utilisable si SmallCardRegularInterface
}

// Interface des cartes
interface SmallCardRegularInterface {
  cardType: string // regular
  auth: string[]

  title: string
  numberShow: number
  textShowSingular: string
  textShowPlural: string
  link: string
  bottomText?: string | undefined
  done: DashboardDoneInformations
}

interface SmallCardThreeInformationsInterface {
  cardType: string // threeInformations
  auth: string[]
  title: string
  link: string

  information1Number: number
  information1TextSingular: string
  information1TextPlural: string

  information2Number: number
  information2TextSingular: string
  information2TextPlural: string

  information3Number?: number
  information3TextSingular?: string
  information3TextPlural?: string
  done: DashboardDoneInformations
}

interface SmallCardProgressBarInterface {
  cardType: string // progressBar
  auth: string[]
  title: string
  fractionNumber1: number
  fractionNumber2: number
  textShowSingular: string
  textShowPlural: string
  link: string
  done: DashboardDoneInformations
}

interface SmallCardDuoCardInterface{
  cardType: string // DUOCARD
  auth: string[]

  titleFirstCard: string
  numberShowFirstCard: number
  textShowSingularFirstCard: string
  textShowPluralFirstCard: string
  linkFirstCard: string
  doneFirstCard: DashboardDoneInformations

  titleSecondCard: string
  numberShowSecondCard: number
  textShowSingularSecondCard: string
  textShowPluralSecondCard: string
  linkSecondCard: string
  doneSecondCard: DashboardDoneInformations
}

// interface spécifique a signature des documents. Affiche un chiffre + texte en mode normal puis un graphique en mode Done
interface SmallCardSignatureInterface{
  cardType: string // SIGNATURECARD
  auth: string[]

  title: string
  numberShow: number
  textShowSingular: string
  textShowPlural: string
  link: string
  bottomText?: string | undefined
  done: {
    doneText: string
    graphNumber1: number
    graphNumber2: number
    graphText1: string
    graphText2: string
  }
}

// Interface de chaque ligne de cartes
interface bigCard {
  show: boolean
  cardIcon: string,
  auth: string[],
  allCards: (SmallCardRegularInterface | SmallCardThreeInformationsInterface | SmallCardProgressBarInterface | SmallCardDuoCardInterface | SmallCardSignatureInterface)[]
}

interface doubleCardGraphInterface {
  cardType: string, // 'DOUBLECARDGRAPH'
  auth: string[]
  title: string,
  link: string,
  numberShow: number,
  textShowSingular: string,
  textShowPlural: string,
    bottomText: string,
    doneText: string,
    doneBottomText: string
}

const recrutementAcadémiques: bigCard = {
  show: true,
  cardIcon: 'graduation-cap',
  auth: [RH_SPS_MANAGE],
  allCards: [
    {
      cardType: 'threeinformations',
      title: 'Sélection des intervenants',
      auth: [RH_SPS_MANAGE],
      information1Number: 888,
      information1TextSingular: 'Intervenant manquant',
      information1TextPlural: 'Intervenants manquants',

      information2Number: 25,
      information2TextSingular: 'Procès verbal à signer',
      information2TextPlural: 'Procès-verbaux à signer',
      link: '/selections',
      done: {
        type: 'string',
        doneText: 'doneSingular'
      }
    },
    {
      cardType: 'progressbar',
      auth: [RH_SPS_MANAGE],
      title: 'Affectation des intervenants',
      fractionNumber1: 3,
      fractionNumber2: 3,
      textShowSingular: 'Intervenant manquant',
      textShowPlural: 'Intervenants manquants',
      link: '/affectations',
      done: {
        type: 'string',
        doneText: 'Toutes les affectations sont effectuées'
      }
    }
  ]
}

const dossiersAdministratifs: bigCard = {
  show: true,
  cardIcon: 'folder-open',
  auth: [RH_ADM_MANAGE],
  allCards: [
    {
      cardType: 'threeinformations',
      title: 'dossiers académiques',
      auth: [RH_ADM_MANAGE],
      information1Number: 0,
      information1TextSingular: 'Dossier à vérifier',
      information1TextPlural: 'Dossiers à vérifier',

      information2Number: 0,
      information2TextSingular: 'en attente de remplissage',
      information2TextPlural: 'en attente de remplissage',

      information3Number: 1,
      information3TextSingular: 'Dossier total',
      information3TextPlural: 'Dossier totaux',
      link: '/dossiers_academiques',
      done: {
        type: 'string',
        doneText: 'doneSingular'
      }
    },
    {
      cardType: 'threeinformations',
      title: 'Contrats',
      auth: [RH_ADM_MANAGE],
      information1Number: 0,
      information1TextSingular: 'Contrat créé',
      information1TextPlural: 'Contrats créés',

      information2Number: 0,
      information2TextSingular: 'Information à valider',
      information2TextPlural: 'Informations à valider',
      link: '/dossiers_administratifs/contrats',
      done: {
        type: 'string',
        doneText: 'doneSingular'
      }
    },
    {
      cardType: 'duocard',
      auth: [RH_ADM_MANAGE],

      titleFirstCard: 'Demandes de remboursement',
      numberShowFirstCard: 1,
      textShowSingularFirstCard: 'Remboursement à traiter',
      textShowPluralFirstCard: 'Remboursements à traiter',
      linkFirstCard: '/dossiers_administratifs/demandes_remboursement',
      doneFirstCard: {
        type: 'doneRegular',
        doneText: 'Pas de demandes à traiter'
      },

      titleSecondCard: 'Ordres de mission',
      numberShowSecondCard: 1,
      textShowSingularSecondCard: 'Ordre de mission à traiter',
      textShowPluralSecondCard: 'Ordres de mission à traiter',
      linkSecondCard: '/dossiers_administratifs/ordres_mission',
      doneSecondCard: {
        type: 'doneRegular',
        doneText: 'Pas de demandes à traiter'
      }
    }
  ]
}

const signatureDeLaDirection = {
  show: true,
  cardIcon: 'pen',
  auth: [RH_SIGNATURE],
  allCards: [
    {
      cardType: 'SIGNATURECARD', // SIGNATURECARD
      auth: [RH_SIGNATURE],
      title: 'SIGNATURE DES DOCUMENTS',
      numberShow: 14,
      textShowSingular: 'Document à signer',
      textShowPlural: 'Documents à signer',
      link: '/signature_documents',
      bottomText: 'xx' + ' Documents au total',
      done: {
        doneText: 'texte alternatif',
        graphNumber1: 0,
        graphNumber2: 24,
        graphText1: 'SPS',
        graphText2: 'SOL'
      }
    }
  ]
}

const test = {
  show: true,
  cardIcon: 'pen',
  auth: [RH_SIGNATURE],
  allCards: [
    {
      cardType: 'DOUBLECARDGRAPH',
      auth: [RH_SIGNATURE],
      title: 'eachCard.title',
      link: 'eachCard.link',
      numberShow: 12,
      chartOption: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red' // color at 0% position
          }]
        }
      }

    },
    {
      cardType: 'DOUBLECARDGRAPH',
      auth: [RH_SIGNATURE],
      title: 'Double Card Graph',
      link: 'eachCard.link',
      chartOption: {
        color: ['#6bbeb7', '#6bbeb7', '#6bbeb7'],
        tooltip: {},
        legend: {
          data: ['Val1', 'Val2', 'Val3']
        },
        xAxis: {
          data: ['Val1', 'Val2', 'Val3']
        },
        yAxis: {},
        series: [{
          name: 'Val1',
          type: 'bar',
          data: [5, 20, 36]
        },
        {
          name: 'Val2',
          type: 'bar',
          data: [10, 30, 12]
        },
        {
          name: 'Val3',
          type: 'bar',
          data: [10, 30, 12]
        }
        ]
      }
    }
  ]
}

const functionsForDashboard = {
  dashboardElements: [
    signatureDeLaDirection,
    recrutementAcadémiques,
    dossiersAdministratifs,
    test
  ],

  // eslint-disable-next-line
  /** Fonction qui filtre les entrées du menu en fonction des droits de l'user */
  dashboardFilterFunction (dashboardElements: bigCard[] | SmallCardThreeInformationsInterface[] | SmallCardRegularInterface[] | SmallCardRegularInterface[] | doubleCardGraphInterface[]): unknown {
    const dashboardElementsFilter = []
    for (const element of dashboardElements) {
      for (const ua of element.auth) {
        if (store.getters['auth/can'](ua)) {
          dashboardElementsFilter.push(element)
        }
      }
    }
    return dashboardElementsFilter
  },

  /**
   * Fonction utilisant userAuth et theFilterFunction. Controle le menu et les sous-menu, renvois le tableau final pret pour SideBarLeft. Utilise theFilterFunction
    */
  // eslint-disable-next-line
  dashboardFiltered(dashboardElements: any[]): any {
    const dashboardFiltered = this.dashboardFilterFunction(dashboardElements)
    console.log('filtered')
    console.log(dashboardFiltered)
    for (const element of dashboardElements) {
      if (element.allCards) {
        element.allCards = this.dashboardFilterFunction(element.allCards)
      }
    }
    console.log(dashboardFiltered)
    return dashboardFiltered
  }
}

export { functionsForDashboard, SmallCardRegularInterface, SmallCardProgressBarInterface, SmallCardThreeInformationsInterface, SmallCardDuoCardInterface, doubleCardGraphInterface }
