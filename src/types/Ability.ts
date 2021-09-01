export enum Ability {
  ADM_PAR_MANAGE = 'adm.par-manage', // config initiale de la plateforme, administrateur
  ADM_INI_MANAGE = 'adm.ini-manage', // gestion des session, concours, épreuves, administrateur
  ADM_UTIL_MANAGE = 'adm.util-manage', // gestion des users, administrateur

  RH_SPS_MANAGE = 'rh.sps-manage', // droit de gèrer la liste des dossiers academiques, responsable rh sps

  RH_SPS_DOSSIER_OWN_MANAGE = 'rh.sps-dossier-own-manage', // droit de renseigner son dossier académique, intervenant
  RH_SPS_VALIDATE = 'rh.sps-validate', // droit de valider la sélection d'un dossier académique, directeur

  RH_ADM_MANAGE = 'rh.adm-manage', // droit de gèrer la liste des dossiers administratifs, responsable rh adm
  RH_ADM_DOSSIER_OWN_MANAGE = 'rh.adm-dossier-own-manage', // droit de renseigner son dossier administratif, intervenant

  RH_SIGNATURE = 'rh.signature' // droit de signer les documents
}
