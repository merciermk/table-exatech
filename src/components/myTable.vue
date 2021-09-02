<template>
  <div>
    <div class="filter-tags">
      <p>Filtres Actifs :</p>
      <span
        class="badge bg-primary tag"
        v-for="(tag, index) in filterTags"
        :key="filterTags + index"
      >
        {{ tag.libelle.toUpperCase() }} : {{ tag.value }}
      </span>
    </div>
    <button @click="clearFilters">Effacer les filtres</button>
    <b-table
      responsive="sm"
      ref="b_table"
      :items="tableDatas"
      :fields="tableFields"
      :filter="tableFilters"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction.sync="sortDirection"
      show-empty
    >
      <!-- Mise en place d'une icone de recherche compare la Key de field et  -->
      <template #head()="data">
        <div class="header-filter">
          <span>{{ data.label }}</span>
          <!-- Dropdown -->
          <div
            v-for="(needToFilter, index) in tableFilters"
            :key="index + 'needToFilter'"
            class="filter-area"
          >
            <div
              class="dropdown btn-group"
              :id="data.field.key + '-divUpperDrop'"
              v-if="
                needToFilter.options.type != undefined &&
                  needToFilter.libelle === data.field.key
              "
            >
              <button  class="nav-icon"
                type="button"
                :id="data.field.key + '-dropdown'"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-offset="-50,10"
                @click.stop>
                <font-awesome-icon
                  icon="filter"
                />
              </button>
              <!-- Inside Dropdown, compare le libelle de filtre et le label de data pour organiser les filtres par colonnes -->
              <div class="dropdown-menu" :aria-labelledby="data.label + 'dropdown'" >
            <div
              v-for="(filtre, indexFiltre) in tableFilters"
              :key="filtre.libelle + indexFiltre"
            >
              <div v-if="filtre.libelle.toLowerCase() === data.label.toLowerCase()">
                <div v-if="tableFilters[indexFiltre].options.type === 'deroulant'">
                    <p>Rechercher par: {{ filtre.libelle }}</p>
                    <!-- Menu deroulant -->
                    <select v-if="tableFilters[indexFiltre].options.type === 'deroulant'" class="form-select form-select-sm" @change="filtresHandler" :id="'filtre_' + indexFiltre" v-model="tableFilters[indexFiltre].value">
                  <option selected value="-">{{ (tableFilters.defautOptionlibelle !== null && tableFilters[indexFiltre].defautOptionlibelle !== undefined) ? (tableFilters[indexFiltre].defautOptionlibelle + ' ' + filtre.libelle) : 'Filtrer par ' + tableFilters[indexFiltre].libelle }}</option>
                  <option v-for="(data, indice) in tableFilters[indexFiltre].datas" :index="indice" :key="data.id" :value="data.name">{{ data.name }}</option>
                </select>
                </div>
                <!-- Input -->
              <b-form-input
              v-else
              :id="'filtre_' + indexFiltre"
              v-on:keyup.enter="filtresHandler"
              v-model="tableFilters[indexFiltre].value"
              type="text"
              value=""
              class="form-control form-control-sm"
              :placeholder="(tableFilters[indexFiltre].defautOptionlibelle !== null && tableFilters[indexFiltre].defautOptionlibelle !== undefined) ? (tableFilters[indexFiltre].defautOptionlibelle + ' ' + tableFilters[indexFiltre].libelle) : 'Recherche par ' + filtre.libelle"
            ></b-form-input>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>

        <!--       <a @click="testFunction">
          <font-awesome-icon icon="home" class="nav-icon" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
        </a> -->
      </template>
      <!-- affichage des filtres -->

      <span>Chargement ...</span>

      <!--  -->
      <div v-show="false" class="lds-default"></div>
      <template slot="empty">
        <span aria-live="off">Pas de résultats.</span>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class myTable extends Vue {
  @Prop() readonly tableFields?: any[];
  @Prop() readonly tableDatas?: any[];
  @Prop() readonly tableFilters?: any[];
  @Prop() sortDefaut?: string;

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

  /* Ajout de filter tags dans getParams afin de recuperer les tags */
  filterTags: string[] = [];
  getParams () {
    console.log('getParams')
    this.filterTags = []
    const params: any = {}
    if (this.tableFilters && this.tableFilters.length > 0) {
      console.log('in')
      for (let i = 0; i < this.tableFilters.length; i++) {
        console.log('in')
        if (
          this.tableFilters[i].value !== '' &&
          this.tableFilters[i].value !== '-'
        ) {
          params['filter-' + this.tableFilters[i].model] = this.tableFilters[
            i
          ].value
          this.filterTags.push(this.tableFilters[i])
        }
      }
    }
    params.page = this.page
    params.sort = this.sortBy
    params.direction = this.sortDirection
    console.log(params)
    return params
  }

  filtresHandler () {
    this.page = 1
    const testParam = this.getParams()
    console.log(JSON.stringify(testParam))
    if (
      JSON.stringify(this.tabParams) === '{}' &&
      JSON.stringify(testParam) === '{"page":1,"sort":"","direction":"asc"}'
    ) {
      return
    }
    this.tabParams = this.getParams() // { page: 1, sortby: 'sort=' + this.sortBy + '&direction=' + this.sortDirection + filtresStr }
    console.log('filtre Handler ')
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(
      () => this.$emit('filtresHandler', this.tabParams),
      500
    )
  }

  /* Fonction de suppression des filtres /  */
  clearFilters () {
    if (this.tableFilters !== undefined) {
      for (let index = 0; index < this.tableFilters.length; index++) {
        this.tableFilters[index].value = ''
        this.getParams()
      }
    }
  }
}
</script>

<style lang="scss">
.header-filter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-tags {
  height: 30px;
  display: flex;
}
.tag {
  min-width: 100px;
  margin: auto 5px auto 5px;
}
.nav-icon {
  font-size: 12px;
  margin-left: 5px;
}
.dropdown-menu {
  padding: 10px !important;
}

/* CSS de base */
$info: red;
$gray-500: grey;
$secondary: blue;
$light: white;

.btn-info:hover {
  background-color: $info;
  border-color: $info;
  outline: none;
  box-shadow: none;
}
.commentaire_grey {
  color: $gray-500 !important;
}
.b-table-sticky-header {
  max-height: 61vh;
  height: 61vh;
  overflow-y: auto;
}
.b-table-sticky-header > .table.b-table > thead > tr > th {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: white;
}
.b-table-sticky-header > .table.b-table > thead {
  border: solid 5px #dee2e6 !important;
  border-width: 0px 0px 5px 0px !important;
}
.table > :not(:last-child) > :last-child > * {
  border-bottom-color: $secondary;
}
.table.b-table > thead > tr > .table-b-table-default,
.table.b-table > tbody > tr > .table-b-table-default,
.table.b-table > tfoot > tr > .table-b-table-default {
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
.sr-only {
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
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
