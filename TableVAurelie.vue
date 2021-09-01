<template>
<div>
  <!--
    <b-row>
      <b-col lg="12" class="my-1">
        <b-form-group
          label="Recherche"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              value=""
              placeholder="Rechercher un utilisateur..."
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Effacer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  -->

    <b-row id="comp_table" class="mb-3" v-if="filtres != null">
      <b-col v-for="(filtre, index) in filtres" :key="index" :index="index">
        <b-form-group
        :id="'b_form_'+index"
          label=""
          :label-for="'filtre_' + index"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-if="filtres[index].loading == false"
        >
            <select v-if="filtres[index].datas != null" class="form-select form-select-sm" @change="filtresHandler" :id="'filtre_' + index" v-model="filtres[index].value">
              <!-- <option selected value="-">Filtrer par {{ filtre.libelle }}</option> -->
              <option selected value="-">{{ (filtre.defautOptionlibelle !== null && filtre.defautOptionlibelle !== undefined) ? (filtre.defautOptionlibelle + ' ' + filtre.libelle) : 'Filtrer par ' + filtre.libelle }}</option>
              <option v-for="(data, indice) in filtres[index].datas" :index="indice" :key="data.id" :value="data[filtre.index]">{{ data.name }}</option>
            </select>
            <b-form-input
              v-else
              :id="'filtre_' + index"
              v-model="filtres[index].value"
              type="search"
              value=""
              class="form-control form-control-sm"
              :placeholder="(filtre.defautOptionlibelle !== null && filtre.defautOptionlibelle !== undefined) ? (filtre.defautOptionlibelle + ' ' + filtre.libelle) : 'Recherche par ' + filtre.libelle"
            ></b-form-input>
            <!-- :placeholder="'Recherche par ' + filtre.libelle" -->
        </b-form-group>
        <span v-else>Chargement ...</span>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div>
      <b-table
        small
        id="b_table"
        ref="b_table"
        :sticky-header="stickyHeader"
        responsive="sm"
        show-empty
        :items="datas"
        :fields="fields"
        :filter="filter"
        :total-rows="totalPage"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction.sync="sortDirection"
        :sort-null-last="false"
        sort-icon-left
        @scroll.native="handleScroll"
        :busy="loading"
      >
        <template slot="template-test">

        </template>

        <!-- Pas de résultats -->
        <template slot="empty">
          <span aria-live="off">Pas de résultats.</span>
        </template>

        <!-- Action dossier affiché si l'état du dossier est différent de null -->
        <template #cell(action)="row">
          <b-button v-if="row.item.etat !== null && row.item.etat !== etat_invisible"
          :id="'action_' + row.item.id"
          size="sm"
          variant="tertiary"
          class="text-primary"
          @click="$emit('action',row)"
          >
            <font-awesome-icon class="me-1" icon="eye" title="Action"/>
          </b-button>
        </template>

        <template #cell(etatEdit)="row">
          <b-button
          variant="transparent"
          class="text-light btn-info"
          :id="'button_' + row.item.id"
          style="'cursor: pointer;"
          v-on:click="emit_etat_edit(row)"
          title="Éditer"
          >
            <font-awesome-icon class="me-1" :icon="!row.item.closed_at ? 'pen' : 'eye'"/>
          </b-button>
        </template>

        <template #cell(actionLeft)="row">
          <button
          class="btn text-light btn-info"
          :id="'button_' + row.item.id"
          style="cursor:pointer;"
          @click="actionLeft(row)">
            <b-icon icon="pencil-fill" aria-label="Éditer"></b-icon>
          </button>
        </template>

        <template #cell(actionSignature)="row">
          <button
          :class="'btn text-light  ' + (row.item.validated_at === null ?  'btn-info' : 'bg-success')"
          :id="'button_' + row.item.id"
          style="cursor:pointer;"
          @click="$emit('action_signature',row)">
          <font-awesome-icon icon="marker"/>
          </button>
        </template>

        <template #cell(etatSession)="row">
          <b-button
          variant="transparent"
          class="text-light"
          :id="'button_' + row.item.id"
          :style="'cursor:' + !row.item.closed_at ? 'pointer;' : 'auto;'"
          v-on:click="!row.item.closed_at ? emit_edit_session(row) : {}"
          :title="row.item.closed_at === null ? 'Éditer' : 'Session clôturée'"
          >
            <font-awesome-icon :icon="!row.item.closed_at ? 'pen' : 'eye'"/>
          </b-button>
        </template>

        <template #cell(actionSession)="row">
          <b-button v-if="!row.item.closed_at"
          variant="transparent"
          class="btn text-primary"
          :id="'action_' + row.item.id"
          style="cursor: pointer;"
          title="Créer une nouvelle session à partir des informations de celle ci (cette session sera clôturée)"
          :data="JSON.stringify(row)"
          v-on:click="emit_action(row)"
          >
            <b-icon icon="front" aria-label="Action" class="me-1" title="Cloner la session"></b-icon>
          </b-button>
          <b-button v-else
          variant="transparent"
          class="btn text-secondary"
          :id="'action_' + row.item.id"
          style="cursor: auto;"
          :title="'clôturé le ' + formatteDate(row.item.closed_at)"
          >
            <b-icon icon="lock-fill" aria-label="Action" class="me-1"></b-icon>
          </b-button>
        </template>

        <!-- Action de relance email -->
        <template #cell(relance)="row">
          <b-button v-if="row.item.etat !== null && row.item.etat !== etat_invisible" :id="'btn_relance_' + row.item.id" size="sm" variant="transparent" class="text-primary" :title="row.item.relaunched_at ? 'Dernière relance effectuée le : ' + formatteDate(row.item.relaunched_at)  : ''" @click="$emit('relance',row)">
            <b-icon icon="envelope-fill" aria-label="Action" class="me-1"></b-icon>
          </b-button>
        </template>
        <!-- Action de relance email -->
        <template #cell(relanceSignature)="row">
          <b-button v-if="row.item.etat !== null && row.item.etat !== etat_invisible && row.item.contrats.length !== 0" :id="'btn_relance_' + row.item.id" size="sm" variant="transparent" class="text-primary" :title="formatteDateSignature(row.item.contrats)" @click="$emit('relance',row)">
            <b-icon icon="envelope-fill" aria-label="Action" class="me-1"></b-icon>
          </b-button>
        </template>
        <!-- Action de relance email -->
        <template #cell(relanceOrdreMission)="row">
          <b-button v-if="row.item.ordres_mission.length === 0" :id="'btn_relance_' + row.item.id" size="sm" variant="transparent" class="text-primary" :title="row.item.mission_relaunched_at ? 'Dernière relance le ' + formatteDate(row.item.mission_relaunched_at) : 'Relancer la demande d\'ordre de mission'" @click="$emit('relance',row)">
            <b-icon icon="envelope-fill" aria-label="Action" class="me-1"></b-icon>
          </b-button>
        </template>

        <!-- Action de gestion des contrats -->
        <template #cell(etat_contrats_interne)="row">
          <b-button v-if="row.item.etat_contrats_interne === 'light'" size="sm" variant="transparent" class="text-secondary" @click="$emit('contrats',row)" :title="row.item.contrats.length === 0 ? 'Pas de contrats' : 'En création'">
            <font-awesome-icon icon="times-circle" class="fa-lg"/>
          </b-button>

          <b-button v-else size="sm" variant="transparent" :class="'text-' + row.item.etat_contrats_interne" @click="$emit('contrats',row)" :title="setTitle(row.item.etat_contrats_interne)">
            <font-awesome-icon icon="file-alt" class="fa-lg"/>
          </b-button>
        </template>

        <!-- Action gestion des bulletins de salaire -->
        <template #cell(contrats_has_bulletin)="data">
          <b-button v-if="data.value === EtatDepot.NON_DEPOSER" size="sm" variant="transparent" class="text-secondary" @click="$emit('bulletins',data)" title="Pas de bulletin(s) de salaire">
            <font-awesome-icon icon="times-circle" class="fa-lg"/>
          </b-button>

          <b-button v-if="data.value === EtatDepot.DEPOT_EN_COURS" size="sm" variant="transparent" class="text-primary" @click="$emit('bulletins',data)" title="Consulter le(s) bulletin(s) de salaire">
            <font-awesome-icon icon="file-alt" class="fa-lg"/>
          </b-button>

          <b-button v-if="data.value === EtatDepot.DEPOT_COMPLET" size="sm" variant="transparent" class="text-success" @click="$emit('bulletins',data)" title="Consulter le(s) bulletin(s) de salaire">
            <font-awesome-icon icon="file-alt" class="fa-lg"/>
          </b-button>
        </template>

        <!-- Action gestion des attestations pole emploi -->
        <template #cell(attestations)="row">
          <b-button v-if="row.item.contrats_has_attestation === EtatDepot.NON_DEPOSER" size="sm" variant="transparent" class="text-secondary" @click="$emit('attestations',row)" title="Pas d'attesation(s) Pôle emploi">
            <font-awesome-icon icon="times-circle" class="fa-lg"/>
          </b-button>

          <b-button v-if="row.item.contrats_has_attestation === EtatDepot.DEPOT_EN_COURS" size="sm" variant="transparent" class="text-primary" @click="$emit('attestations',row)" title="Consulter l'attestation Pôle emploi">
            <font-awesome-icon icon="file-alt" class="fa-lg"/>
          </b-button>

          <b-button v-if="row.item.contrats_has_attestation === EtatDepot.DEPOT_COMPLET" size="sm" variant="transparent" class="text-success" @click="$emit('attestations',row)" title="Consulter l'attestation Pôle emploi">
            <font-awesome-icon icon="file-alt" class="fa-lg"/>
          </b-button>
        </template>

        <template #cell(etat_signature_contrat)="row">
          <div :class="'text-' + row.item.etat_signature_contrat" :title="row.item.etat_signature_contrat === 'light' ? 'Non mis à disposistion' : (row.item.etat_signature_contrat === 'success' ? 'Contrat signé' : 'En attente de signature')">
            <font-awesome-icon icon="circle"/>
          </div>
        </template>

        <!-- Action de gestion des contrats -->
        <template #cell(ordres_mission)="row">
          <b-button v-if="row.item.ordres_mission.length === 0" size="sm" variant="transparent" class="text-secondary" title="Pas d'ordre de mission" style="cursor:inherit;">
            <font-awesome-icon icon="times-circle" class="fa-lg"/>
          </b-button>

          <div v-else>
            <b-button v-for="(odm, index) in row.item.ordres_mission" :key="odm.id" :index="index" size="sm" variant="transparent" :class="'text-' + getEtatSpec(odm.ordre_mission.etat).color" @click="$emit('ordres_mission', odm.ordre_mission)" :title="getEtatSpec(odm.ordre_mission.etat).libelle">
              <font-awesome-icon icon="file-alt" class="fa-lg"/>
            </b-button>
          </div>
        </template>

        <template #cell(delete)="row">
          <b-button size="sm"
            :id="'delete_' + row.item.id"
            variant="transparent"
            class="text-secondary"
            v-on:click="emit_delete(row)"
           >
            <b-icon icon="trash-fill" aria-label="Supprimer" class="me-1"></b-icon>
          </b-button>
        </template>

        <template #cell(details)="row">
          <b-button size="sm" variant="primary" @click="row.toggleDetails">
            <font-awesome-icon icon="eye" title="Consulter"/>{{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
        </template>

        <!-- Etat d'un dossier -->
        <template #cell(etat)="row">

          <button v-if="row.item.etat === etat_depose"
          class="btn text-light btn-info"
          :id="'button_' + (row.item.user ?  row.item.user.id : row.item.id)"
          style="cursor:pointer;"
          @click="actionEtat(row)">
            <font-awesome-icon icon="eye" title="Consulter"/>
          </button>

          <button v-else
          :class="row.item.etat !== null && row.item.etat !== etat_invisible ? 'btn text-light btn-transparent' : 'btn text-light btn-tertiary'"
          :id="'button_' + (row.item.user ?  row.item.user.id : row.item.id)"
          :style="row.item.etat !== null && row.item.etat !== etat_invisible ? 'cursor:pointer;': 'cursor:pointer;'"
          @click="row.item.etat !== null && row.item.etat !== etat_invisible ? actionEtat(row) : $emit('action_etat_invisible', row)">
            <font-awesome-icon v-if="row.item.etat !== null && row.item.etat !== etat_invisible" icon="eye" title="Consulter"/>
            <font-awesome-icon v-else icon="eye" title="Dossier non publié"/>
          </button>
        </template>

        <!-- Commentaire d'un intervenant -->
        <template #cell(usercomment)="row">
          <font-awesome-icon icon="comment-alt" :class="row.item.user.comment && row.item.user.comment.body ? 'text-primary' : 'text-tertiary'" style="cursor:pointer;" :title="(row.item.user.comment && row.item.user.comment.body ? 'Commentaire : ' + row.item.user.comment.body : 'Commentaire sur l\'intervenant')" :id="'btn_commentaire_'+ row.item.user.id" @click="$emit('commentaire_intervenant', row)"/>
        </template>

        <template #cell(email_verified)="row">
          <span v-html="row.value"></span>
        </template>

        <template #cell(two_factor)="row">
          <span v-html="row.value"></span>
        </template>

        <template #cell(rgpd_accepted)="row">
          <span v-html="row.value"></span>
        </template>

        <!-- Décision disponibilité selection -->
        <template #cell(disponibilite_selection)="row">
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_selection === decision_intervenant_masque" icon="circle-fill" aria-label="" variant="light"></b-icon>
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_selection === decision_intervenant_attente" icon="circle-fill" aria-label="" variant="secondary" title="En attente de réponse"></b-icon>
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_selection === decision_intervenant_oui" icon="circle-fill" aria-label="" variant="success" title="Disponible"></b-icon>
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_selection === decision_intervenant_non" icon="circle-fill" aria-label="" variant="danger" title="Indisponible"></b-icon>
        </template>

        <!-- Décision disponibilité affectation -->
        <template #cell(disponibilite_affectation)="row">
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_affectation === decision_intervenant_masque" icon="circle-fill" aria-label="" variant="light"></b-icon>
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_affectation === decision_intervenant_attente" icon="circle-fill" aria-label="" variant="secondary" title="En attente de réponse"></b-icon>
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_affectation === decision_intervenant_oui" icon="circle-fill" aria-label="" variant="success" title="Poste accepté"></b-icon>
            <b-icon v-if="row.item.courant && row.item.courant.decision_intervenant_affectation === decision_intervenant_non" icon="circle-fill" aria-label="" variant="danger" :title="'Poste refusé : ' + (row.item.courant.commentaire_rejet_intervenant && row.item.courant.commentaire_rejet_intervenant.decision_affectation_intervenant ? row.item.courant.commentaire_rejet_intervenant.decision_affectation_intervenant : '--')"></b-icon>
        </template>
        <!-- Action pour deposer un commentaire PV
        <template #cell(commentaire)="row">
          <b-button size="sm" variant="transparent" class="text-primary" title="Commentaire pour le PV" @click="$emit('commentaire',row)">
            <b-icon icon="chat-dots-fill" aria-label="commentaire" class="me-1"></b-icon>
          </b-button>
        </template>-->

        <!-- Affiche un bouton de création de dossier si l'état est null ou affiche la décision prise sur le dossier avec possibilité de changer de decision -->
        <template #cell(postes_selection_courant)="row">
          <div v-if="!actionsReadOnly && mode !== 'affectation'">
            <span v-if="row.item.courant && row.item.courant.decision_selection === decision_retenu" v-html="row.value" @click="$emit('decision_selection',row)" style="cursor:pointer;"></span>
            <span v-else-if="(row.item.courant && row.item.courant.decision_selection === decision_aucune) || (!row.item.courant)" @click="$emit('decision_selection', row)" style="cursor:pointer;" class="text-danger">Aucune décision</span>
            <span v-else-if="row.item.courant" @click="$emit('decision_selection', row)" style="cursor:pointer;" class="text-dark">{{ getLibelleDecision(row.item.courant.decision_selection) }}</span>
            <b-button :id="'btn_decision_' + row.item.user.id" size="sm" variant="transparent" class="text-dark" @click="$emit('decision_selection', row)">
              <b-icon icon="chevron-down" aria-label="commentaire" class="me-1"></b-icon>
            </b-button>
          </div>
          <div v-else>
            <span v-if="row.item.courant && row.item.courant.decision_selection === decision_retenu" v-html="row.value"></span>
            <span v-else-if="(row.item.courant && row.item.courant.decision_selection === decision_aucune) || (!row.item.courant)" class="text-danger">Aucune décision</span>
            <span v-else-if="row.item.courant" class="text-dark">{{ getLibelleDecision(row.item.courant.decision_selection) }}</span>
          </div>
        </template>

        <template #cell(postes_selection_precedent)="row">
          <div>
            <span v-html="row.value"></span>
          </div>
        </template>

        <template #cell(postes_souhait_courant)="row">
          <div>
            <span v-html="row.value"></span>
          </div>
        </template>

        <!-- Affiche un bouton de création de dossier si l'état est null ou affiche la décision prise sur le dossier avec possibilité de changer de decision -->
        <template #cell(postes_affectation_courant)="row">
          <div v-if="!actionsReadOnly">
            <span v-if="row.item.courant && row.item.courant.decision_affectation === decision_retenu" v-html="row.value" @click="$emit('decision_affectation',row)" style="cursor:pointer;"></span>
            <span v-else-if="(row.item.courant && row.item.courant.decision_affectation === decision_aucune) || (!row.item.courant)" @click="$emit('decision_affectation', row)" style="cursor:pointer;" class="text-danger">Aucune décision</span>
            <span v-else-if="row.item.courant" @click="$emit('decision_affectation', row)" style="cursor:pointer;" class="text-dark">{{ getLibelleDecision(row.item.courant.decision_affectation) }}</span>
            <b-button :id="'btn_decision_' + row.item.user.id" size="sm" variant="transparent" class="text-dark" @click="$emit('decision_affectation', row)">
              <b-icon icon="chevron-down" aria-label="commentaire" class="me-1"></b-icon>
            </b-button>
          </div>
          <div v-else>
            <span v-if="row.item.courant && row.item.courant.decision_affectation === decision_retenu" v-html="row.value"></span>
            <span v-else-if="(row.item.courant && row.item.courant.decision_affectation === decision_aucune) || (!row.item.courant)" class="text-danger">Aucune décision</span>
            <span v-else-if="row.item.courant" class="text-dark">{{ getLibelleDecision(row.item.courant.decision_affectation) }}</span>
          </div>
        </template>

        <template #cell(commentaire_lettre)="row">
          <b-button size="sm" variant="transparent" class="text-primary" v-if="row.item.courant" title="Commentaire" :id="'btn_commentaire_' + row.item.courant.id" @click="$emit('commentaireLettre',row)">
            <b-icon icon="chat-dots-fill" aria-label="commentaire" :class="'me-1 ' + (row.item.courant && row.item.courant.commentaire_lettre ? '' :'commentaire_grey')"></b-icon>
          </b-button>
        </template>

        <template #cell(courant)="row">
          <span v-if="row.item.courant && row.item.courant.emailed_at && row.item.courant.validated_at">
            <b-icon icon="envelope-fill" aria-label="lettre_envoye" class="me-1 text-success" :title="'Lettre envoyée le '+ formatteDate(row.item.courant.validated_at)"></b-icon>
          </span>
          <span v-else-if="row.item.courant && row.item.courant.emailed_at && !row.item.courant.validated_at">
            <b-icon icon="envelope-fill" aria-label="lettre_encours" class="me-1 text-primary" title="Envoi en attente de signature"></b-icon>
          </span>
          <span v-else-if="row.item.courant.decision_selection !== decision_aucune">
            <b-icon v-if="!actionsReadOnly" icon="envelope-fill" aria-label="lettre_envoye" class="me-1 text-secondary" title="Lettre non envoyée" style="cursor:pointer;" @click="$emit('envoiLettre', row)"></b-icon>
            <b-icon v-else icon="envelope-fill" aria-label="lettre_envoye" class="me-1 text-secondary" title="Lettre non envoyée"></b-icon>
          </span>
        </template>

        <template #cell(transfert)="row">
          <span v-if="row.item.courant && row.item.courant.dossier_administratif_id !== null && row.item.courant.decision_affectation === decision_retenu">
            <b-icon icon="arrow-left-right" aria-label="transfert" class="me-1 text-primary" title="Dossier transféré"></b-icon>
          </span>
          <span v-else-if="row.item.courant && row.item.courant.dossier_administratif_id === null && row.item.courant.decision_affectation === decision_retenu">
            <b-icon icon="arrow-left-right" aria-label="transfert" class="me-1 text-secondary" title="Dossier non transféré" style="cursor:pointer;" @click="$emit('transfert', row)"></b-icon>
          </span>
        </template>

        <!-- Colonne de classement des intervenants -->
        <template #cell(classement)="row">
          <span v-if="(row.item.courant && row.item.courant.decision_affectation === decision_ajourne) || (row.item.courant && row.item.courant.decision_affectation === decision_retenu)">
            <b-icon v-if="!row.item.courant.classement" :id="'btn_classement_'+ row.item.user.id" icon="tag-fill" aria-label="classement" class="me-1 text-secondary" title="Classer" style="cursor:pointer;" @click="$emit('classement', row)"></b-icon>
            <h5 v-else style="cursor:pointer;" :id="'btn_classement_'+ row.item.user.id" @click="$emit('classement', row)" class="text-primary fw-bold">{{ row.item.courant.classement }}</h5>
          </span>
        </template>

        <template #cell(classement_affect)="row">
          <span v-if="(row.item.courant && row.item.courant.decision_affectation === decision_ajourne) || (row.item.courant && row.item.courant.decision_affectation === decision_retenu)">
            <b-icon v-if="!row.item.courant.classement" :id="'btn_classement_'+ row.item.user.id" icon="tag-fill" aria-label="classement" class="me-1 text-secondary" title="Classer"></b-icon>
            <h5 v-else :id="'btn_classement_'+ row.item.user.id" class="text-primary fw-bold">{{ row.item.courant.classement }}</h5>
          </span>
        </template>

        <!-- Colonne par document type pour dossier administratif -->
        <template #cell(etat_infos_contrat)="row">
          <div :class="'text-' + getEtatSpec(row.item.etat_infos_contrat).color" :title="getEtatSpec(row.item.etat_infos_contrat).libelle">
            <font-awesome-icon icon="circle"/>
          </div>
        </template>

        <!-- création dynamique des colonnes pour les documents pièces jointes des dossiers administratifs -->
        <template v-for="doc in docs" #[`cell(${doc.key})`]="{ item }">
          <div :key="doc.key"
          :id="'btn_pj_'+ doc.id +'_'+ item.id"
          :class="'text-'+ getEtatSpec( item[doc.key]).color"
          :title="getEtatSpec( item[doc.key]).libelle"
          :style=" item[doc.key] >= etat_depose ? 'cursor:pointer;' : ''"
          @click=" item[doc.key] >= etat_depose ? $emit('consult_doc', { item: item, doc_type_id: doc.id }) : ''">
          <font-awesome-icon icon="file-alt" class="fa-lg" title="Action"/>
          </div>
        </template>

        <!-- eslint-disable vue/no-unused-vars -->
        <template #row-details="row">
          <slot name="templateDetails" :row="row">details ?</slot>
        </template>

        <template #row-contenu="row">
          <slot name="templateContenu" :row="row">contenu ?</slot>
        </template>

        <!-- template besoin Pv -->
        <template #thead-top v-if="besoins && besoins.length > 0">
          <b-tr class="surTitre">
            <b-th colspan="3" ></b-th>
            <b-th colspan="3" class="bg-autre surTitreChild">ANNÉE PRÉCÉDENTE</b-th>
            <b-th colspan="4"></b-th>
          </b-tr>
        </template>

        <template #cell(intervenantsPrecedent)="row">
          <div class="text-end" style="width:4.5rem;">{{ row.item.intervenants.precedent }}</div>
        </template>

        <template #cell(candidatsPrecedent)="row">
          <div class="text-end" style="width:4.5rem;" v-if="row.item.candidats">{{ row.item.candidats.precedent }}</div>
        </template>

        <template #cell(cpariAnci)="row">
          <div class="text-end" style="width:4.5rem;" v-if="row.item.candidats && row.item.intervenants.precedent > 0">{{ (row.item.candidats.precedent / row.item.intervenants.precedent).toFixed(0) }}</div>
        </template>

        <template #cell(candidatsCourant)="row">
          <div class="text-end" style="width:4.5rem;" v-if="row.item.candidats">{{ row.item.candidats.courant }}</div>
        </template>

        <template #cell(cpariCourant)="row">
          <div class="text-end" style="width:4.5rem;" v-if="row.item.candidats && row.item.intervenants.besoin > 0">{{ (row.item.candidats.courant / row.item.intervenants.besoin).toFixed(0) }}</div>
        </template>

        <template #cell(intervenantsSelection)="row">
          <span class="steppers" :id="'upDown_' + row.item.poste.id + '_' + (row.item.epreuve ? row.item.epreuve.id : matiere_id)" v-if="row.item.intervenants && !pvSelect.submitted_at && !pvSelect.validated_at">
            <div class="card cardStepper">
            <b-row class="ms-0 me-0 ps-0 pe-0">
                <div role="group" class="input-group p-0">
                <b-input-group-prepend class="float-start">
                  <b-btn class="btn-sm text-secondary arrowStepper" variant="transparent" :id="'down_' + row.item.poste.id + '_' + (row.item.epreuve ? row.item.epreuve.id : matiere_id)" @click="tableBesoinHandler('less', row)"><b-icon icon="dash"></b-icon></b-btn>
                </b-input-group-prepend>

                <div class="mt-1" style="width: 5rem;"><span :class="row.item.intervenants.selection < row.item.intervenants.besoin ? 'text-danger' : ''">{{row.item.intervenants.selection}}</span> / {{row.item.intervenants.besoin}}</div>

                <b-input-group-append class="float-end">
                  <b-btn class="btn-sm text-secondary arrowStepper" variant="transparent" :id="'up_' + row.item.poste.id + '_' + (row.item.epreuve ? row.item.epreuve.id : matiere_id)" @click="tableBesoinHandler('more', row)"><b-icon icon="plus"></b-icon></b-btn>
                </b-input-group-append>
                </div>
            </b-row>
            </div>
          </span>
          <span v-else-if="row.item.intervenants">
            {{row.item.intervenants.selection}} / {{row.item.intervenants.besoin}}
          </span>
        </template>

        <!-- template affectation intervenant -->
        <template #cell(actionEpreuveAffect)="row">
          <router-link :to="'/dossiers_academiques/session/' + row.item.session_id + '/matiere/' + row.item.matiere_id + '/affectation/' + row.item.id">
            <b-icon icon="arrow-right-circle" width="32" height="32" variant="primary"></b-icon>
          </router-link>
        </template>

        <!-- template selection intervenant -->
        <template #cell(actionEpreuveSelect)="row">
          <router-link :to="'/dossiers_academiques/session/' + row.item.session_id + '/matiere/' + row.item.matiere_id + '/selection/' + row.item.id">
            <b-icon icon="arrow-right-circle" width="32" height="32" variant="primary"></b-icon>
          </router-link>
        </template>

      </b-table>
      <!-- Loader -->
      <div v-show="loading" class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>

</div>
</template>

<script lang="ts">
import { Decision, DecisionIntervenant, Etat, getDecisionSpec, getEtatSpec } from '@/types/DossierAcademique'
import { getEtatSpecContrat, EtatDepot } from '@/types/DossierAdministratif'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
  computed: {
    ...mapGetters('auth', [
      'authUser',
      'can',
      'cannot',
      'isA',
      'isNotA'
    ])
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  }
})

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Table extends Vue {
@Prop() fields?: Array<any>;
@Prop() datas?: Array<any>;
@Prop() totalPage?: number;
@Prop() totalRows?: number;
@Prop() lastPage?: number;
@Prop() loading?: boolean;
@Prop() sortDefaut?: string;
@Prop() filtres?: Array<any>;
@Prop() actionsReadOnly?: boolean;
@Prop() mode?: string;
@Prop() collectionDynamique?: any;
@Prop() action?: Function;
@Prop() edit_session?: Function;
@Prop() besoinHandler?: Function;
@Prop() matiere_id?: number;
@Prop() besoins?: any;
@Prop() pvSelect?: any;
@Prop() defautOptionLabel?: string;

// Tri sur les colonnes : Appelle une liste triée au serveur
@Watch('sortBy')
sortByChanged (value: string) {
  this.sortBy = value
  this.sortDesc = false
  this.sortDescChanged(false)
}

@Watch('filtres', { deep: true })
filtresHandler () {
  this.page = 1
  const testParam = this.getParams()
  if (JSON.stringify(this.tabParams) === '{}' && JSON.stringify(testParam) === '{"page":1,"sort":"","direction":"asc"}') {
    return
  }
  this.tabParams = this.getParams()// { page: 1, sortby: 'sort=' + this.sortBy + '&direction=' + this.sortDirection + filtresStr }
  clearTimeout(this.timeOut)
  this.timeOut = setTimeout(() => this.$emit('filtresHandler', this.tabParams), 500)
}

@Watch('sortDesc')
sortDescChanged (value: boolean) {
  this.sortDirection = value ? 'desc' : 'asc'
  // console.log({ direction: this.sortDirection, by: this.sortBy })
  // Si on a une colonne et un sens sélectionné on appelle une liste triée
  if (this.sortBy !== '' && this.sortDirection !== '') {
    this.page = 1
    this.tabParams = this.getParams()
    this.$emit('sortPage', this.tabParams)
    const btable = this.$refs.b_table as Vue
    btable.$el.scrollTo(0, 0)
  }
}

@Watch('fields')
majColonne () {
  if (this.collectionDynamique && this.collectionDynamique.datas !== undefined) {
    this.createColonnes()
  }
}

@Watch('datas')
backToFirstPage () {
  if (this.datas && this.currentDatasLength > this.datas.length) {
    this.currentDatasLength = this.datas.length
    this.page = 1
    const btable = this.$refs.b_table as Vue
    btable.$el.scrollTo(0, 0)
  } else {
    this.currentDatasLength = (this.datas ? this.datas.length : 0)
  }
}

  sortBy = this.sortDefaut ? this.sortDefaut : '';
  sortDesc = false;
  sortDirection = 'asc';
  filter = '';
  filterOn = [];
  stickyHeader = true;
  page = 1;
  windowTop = 0;
  maxScroll = 0;
  tabParams = {};
  timeOut = 0;
  etat_invisible = Etat.ETAT_INVISIBLE;
  etat_depose = Etat.ETAT_DEPOSE;
  decision_aucune = Decision.DECISION_AUCUNE;
  decision_retenu = Decision.DECISION_RETENU;
  decision_ajourne = Decision.DECISION_AJOURNE;

  decision_intervenant_masque = DecisionIntervenant.DECISION_INTERVENANT_MASQUE
  decision_intervenant_attente = DecisionIntervenant.DECISION_INTERVENANT_ATTENTE
  decision_intervenant_oui = DecisionIntervenant.DECISION_INTERVENANT_OUI
  decision_intervenant_non = DecisionIntervenant.DECISION_INTERVENANT_NON

  getEtatSpec = getEtatSpec
  getEtatSpecContrat = getEtatSpecContrat
  docs: Array<any> = []
  currentDatasLength = 0
  EtatDepot = EtatDepot

  // Methods

  emit_delete (row: any) {
    this.$emit('delete', row)
  }

  emit_edit_session (row: any) {
    this.$emit('edit_session', row)
  }

  emit_etat_edit (row: any) {
    this.$emit('etat_edit', row)
  }

  // Emit sur click colonne etat
  actionEtat (row: any) {
    this.$emit('action_etat', row)
  }

  actionLeft (row: any) {
    this.$emit('action_left', row)
  }

  emit_action (row: any) {
    this.$emit('action', row)
  }

  // get params filtres
  getParams () {
    const params: any = {}
    if (this.filtres && this.filtres.length > 0) {
      for (let i = 0; i < this.filtres.length; i++) {
        if (this.filtres[i].value !== '' && this.filtres[i].value !== '-') {
          params['filter-' + this.filtres[i].model] = this.filtres[i].value
        }
      }
    }
    params.page = this.page
    params.sort = this.sortBy
    params.direction = this.sortDirection
    return params
  }

  tableBesoinHandler (action: string, row: any) {
    this.$emit('besoinHandler', action, row)
  }

  // Détection de la position du scroll, si on est au bas du tableau, on appelle la page suivante, si on est en haut on appelle la page précédente
  handleScroll (event: any) {
    if (this.lastPage === undefined || this.lastPage === 0) {
      return
    }
    this.windowTop = Number((event.srcElement.scrollTop).toFixed(0))
    this.maxScroll = event.srcElement.scrollHeight - 25

    // Scroll vers le bas
    if (!this.loading && (this.windowTop > (this.maxScroll - (event.srcElement.offsetHeight))) && (this.page !== this.lastPage)) {
      this.page += 1
      this.tabParams = this.getParams()
      this.$emit('onLoadPage', this.tabParams)
      /*
      this.$emit('onLoadPage', {
        paramss,
        done: () => {
          console.log('coucou2')
          // event.srcElement.scrollTo(0, 578)
          console.log(JSON.stringify(event))
        }
      })
      */
      // console.log('descente')
    }

    // Scroll vers le haut
    /*
    if (((this.windowTop + event.srcElement.offsetHeight) === event.srcElement.offsetHeight) && (this.page > 1)) {
      this.page -= 1
      this.tabParams = this.getParams()
      const paramss = this.tabParams
      this.$emit('onLoadPage', {
        paramss,
        done: () => {
          console.log('coucou2')
          event.srcElement.scrollTo(0, 578)
        }
      })
      console.log(JSON.stringify('srcoll heght : ' + event.srcElement.scrollHeight))
      console.log(JSON.stringify('srcoll top : ' + event.srcElement.scrollTop))
      // console.log('montée')
    }
    */
  }

  setTitle (etat_contrat: string) {
    let retour = ''

    switch (etat_contrat) {
      case 'secondary':
        retour = 'Publié'
        break
      case 'info':
        retour = 'Signé par l\'intervenant'
        break
      case 'success':
        retour = 'Signé par le concours'
        break
    }

    return retour
  }

  getLibelleDecision (decision: Decision) {
    return getDecisionSpec(decision).libelle
  }

  formatteDate (date: Date) {
    return formatDate(date)
  }

  formatteDateSignature (contrats: Array<any>) {
    let retour = ''
    if (contrats && contrats.length > 0) {
      for (let i = 0; i < contrats.length; i++) {
        if (i > 0) {
          retour += ', '
        }
        retour += 'Contrat #' + contrats[i].id
        if (contrats[i].relaunched_at) {
          retour += ' relancé le ' + formatDate(contrats[i].relaunched_at)
        } else {
          retour += ' non relancé'
        }
      }
    } else {
      return ''
    }
    return retour
  }

  createColonnes () {
    if (this.collectionDynamique && this.collectionDynamique.cle === 'documenttype') {
      for (const d in this.collectionDynamique.datas) {
        this.docs.push({ key: 'etat_doc_' + this.collectionDynamique.datas[d].id, id: this.collectionDynamique.datas[d].id })
      }
    }
  }
}
</script>

<style lang="scss">
.btn-info:hover {
  background-color: $info;
  border-color: $info;
  outline: none;
  box-shadow: none;
}
.commentaire_grey {
color : $gray-500 !important;
}
.b-table-sticky-header{
  max-height: 61vh;
  height: 61vh;
  overflow-y: auto;
}
.b-table-sticky-header > .table.b-table > thead > tr > th{
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: white;
}
.b-table-sticky-header > .table.b-table > thead{
    border: solid 5px #dee2e6 !important;
    border-width: 0px 0px 5px 0px !important;
}
.table > :not(:last-child) > :last-child > * {
  border-bottom-color: $secondary;
}
.table.b-table > thead > tr > .table-b-table-default, .table.b-table > tbody > tr > .table-b-table-default, .table.b-table > tfoot > tr > .table-b-table-default {
  color: $secondary !important;
  font-weight: 100;
}
tr {
  border-color: white !important;
  background-color: $light;
  border-width: 0px 0px 4px 0px;
}
.table-sm > :not(caption) > * > * {
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
.table-sm > :not(caption) > * > * {
    padding-right: 0.3rem;
    padding-bottom: 0.3rem;
    padding-top: 0.3rem;
    padding-left: 0.3rem;
}
.sr-only{
  display: none;
}
.lds-default {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  margin-top: -6rem;
  left: 50%;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #cef;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
