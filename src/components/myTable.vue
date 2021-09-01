<template>
  <div>
    <div class="filter-tags">
      <p>Filtres Actifs : </p>
      <span class="badge bg-primary tag" v-for="(tag,index) in filterTags" :key="filterTags + index">
        {{tag}}
      </span>
    </div>
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
    <!-- Mise en place d'une icone de recherche -->
      <template #head()="data">
        <span>{{ data.label.toUpperCase() }}</span>
        <!-- Dropdown -->
        <div class="dropdown">
          <font-awesome-icon
            icon="filter"
            class="nav-icon dropdown-toggle"
            type="button"
            :id="data.label + 'dropdown'"
            data-bs-toggle="dropdown"
            aria-expanded="true"
            data-bs-auto-close="true"
            @click.stop
          />
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

  mounted () {
    console.log(this.tableFilters)
  }

  filterTags : string[] = []

  getParams () {
    console.log('getParams')
    this.filterTags = []
    const params: any = {}
    if (this.tableFilters && this.tableFilters.length > 0) {
      console.log('in')
      for (let i = 0; i < this.tableFilters.length; i++) {
        console.log('in')
        if (this.tableFilters[i].value !== '' && this.tableFilters[i].value !== '-') {
          params['filter-' + this.tableFilters[i].model] = this.tableFilters[i].value
          this.filterTags.push(this.tableFilters[i].value)
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
    if (JSON.stringify(this.tabParams) === '{}' && JSON.stringify(testParam) === '{"page":1,"sort":"","direction":"asc"}') {
      return
    }
    this.tabParams = this.getParams()// { page: 1, sortby: 'sort=' + this.sortBy + '&direction=' + this.sortDirection + filtresStr }
    console.log('filtre Handler ')
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(() => this.$emit('filtresHandler', this.tabParams), 500)
  }
}
</script>

<style>
.dropdown{
  display: flex;
  flex-direction: row;
}
.dropdown-menu{
  padding: 10px !important
}

.filter-tags{
  height: 30px;
  display: flex;
  flex-direction: row;
}
.tag{
  min-width: 100px;
  margin: auto 5px auto 5px
}

</style>
