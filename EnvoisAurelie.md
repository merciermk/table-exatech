 ### au dessus de b-table a la place des filtres actuels
 
 <!-- Affichage des tags au dessus du filtre-->
    <transition name="fade">
      <div class="filter-tags" v-if="filterTags.length !== 0">
        <p>Filtres:</p>
        <!-- Affichage du tag -->
        <span
          class="badge rounded-pill btn-bg tag"
          v-for="(tag, index) in filterTags"
          :key="filterTags + index"
        >
          {{ tag.libelle.toLowerCase() }} : {{ tag.value }}
          <button @click="clearFilters(tag)" class="">
            <font-awesome-icon icon="times" />
          </button>
        </span>
        <!-- Bouton pour effacer complétement les filtres -->
        <button
          class="badge rounded-pill clear-btn clear-filter-btn"
          @click="clearFilters()"
          v-if="filterTags.length !== 0"
        >
          Effacer les filtres
        </button>
      </div>
    </transition>


### Dans le b-table

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
              <button
                :style="
                  needToFilter.value === '' || needToFilter.value === '-'
                    ? '{}'
                    : 'color: #2793BA'
                "
                class="nav-icon clear-btn"
                type="button"
                :id="data.field.key + '-dropdown'"
                data-bs-toggle="dropdown"
                aria-bs-haspopup="true"
                aria-bs-expanded="false"
                data-bs-offset="-60,10"
              >
                <font-awesome-icon icon="filter" />
              </button>
              <!-- Inside Dropdown, compare le libelle de filtre et le label de data pour organiser les filtres par colonnes -->
              <div
                class="dropdown-menu"
                :aria-labelledby="data.label + 'dropdown'"
              >
                <div
                  v-for="(filtre, indexFiltre) in tableFilters"
                  :key="filtre.libelle + indexFiltre"
                >
                  <div
                    v-if="
                      filtre.libelle.toLowerCase() ===
                      data.field.key.toLowerCase()
                    "
                    class="filter-deroulant"
                  >
                  <!-- Menu deroulant -->
                    <div
                      v-if="
                        tableFilters[indexFiltre].options.type === 'deroulant'
                      "
                    >
                      <p>Rechercher par: {{ filtre.libelle }}</p>
                      <!-- Menu deroulant -->
                      <select
                        v-if="
                          tableFilters[indexFiltre].options.type === 'deroulant'
                        "
                        class="form-select form-select-sm"
                        @change="filtresHandler"
                        :id="'filtre_' + indexFiltre"
                        v-model="tableFilters[indexFiltre].value"
                      >
                        <option selected value="-">
                          {{
                            filtre.defautOptionlibelle !== null &&
                            filtre.defautOptionlibelle !== undefined
                              ? filtre.defautOptionlibelle +
                                " " +
                                filtre.libelle
                              : "Filtrer par " +
                                tableFilters[indexFiltre].libelle
                          }}
                        </option>
                        <option
                          v-for="(data, indice) in tableFilters[indexFiltre]
                            .datas"
                          :index="indice"
                          :key="data.id"
                          :value="data.name"
                        >
                          {{ data.name }}
                        </option>
                      </select>
                    </div>
                    <!-- Input -->
                    <div class="filter-input">
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          v-if="
                            tableFilters[indexFiltre].options.type === 'form'
                          "
                          :id="'filtre_' + indexFiltre"
                          value=""
                          class="form-control col form-control-sm"
                          v-model.lazy="tableFilters[indexFiltre].value"
                          :placeholder="
                            tableFilters[indexFiltre].defautOptionlibelle !==
                              null &&
                            tableFilters[indexFiltre].defautOptionlibelle !==
                              undefined &&
                            tableFilters[indexFiltre].value === '-'
                              ? tableFilters[indexFiltre].defautOptionlibelle +
                                ' ' +
                                tableFilters[indexFiltre].libelle
                              : 'Recherche par ' +
                                tableFilters[indexFiltre].libelle
                          "
                          aria-label="Rechercher"
                          :aria-describedby="tableFilters[indexFiltre].libelle"
                        />
                        <button
                           v-if="
                            tableFilters[indexFiltre].options.type === 'form'
                          "
                          @click="filtresHandler"
                          class="btn btn-outline-secondary"
                          type="button"
                          :id="tableFilters[indexFiltre].libelle"
                        >
                          <font-awesome-icon icon="search" aria-expanded="false" />
                        </button>
                      </div>
                    </div>
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

### Dasn le script 

  /* Fonction de suppression des filtres /  */
  clearFilters (tag: any | undefined): void {
    /* premier if est utilisé pour le button 'effacer les filtres' */
    /* Check si le filtre est deroulant ou text */
    if (this.tableFilters !== undefined && !tag) {
      for (let index = 0; index < this.tableFilters.length; index++) {
        if (this.tableFilters[index].options.type === 'form') {
          this.tableFilters[index].value = ''
        } else {
          this.tableFilters[index].value = '-'
        }
      }
    }
    if (this.tableFilters !== undefined && tag !== undefined) {
      for (let index = 0; index < this.tableFilters.length; index++) {
        if (
          this.tableFilters[index].value === tag.value &&
          this.tableFilters[index].options.type !== 'form'
        ) {
          this.tableFilters[index].value = '-'
        }
        if (
          this.tableFilters[index].value === tag.value &&
          this.tableFilters[index].options.type === 'form'
        ) {
          this.tableFilters[index].value = ''
        }
      }
    }
    this.getParams()
  }

#### changement dans le getParams : push dans filter tag
    /* Ajout de filter tags dans getParams afin de recuperer les tags */
  filterTags: string[] = [];
  getParams () {
    console.log('getParams')
    this.filterTags = []
    const params: any = {}
    if (this.tableFilters && this.tableFilters.length > 0) {
      for (let i = 0; i < this.tableFilters.length; i++) {
        if (
          this.tableFilters[i].value !== '' &&
          this.tableFilters[i].value !== '-'
        ) {
          params['filter-' + this.tableFilters[i].model] =
            this.tableFilters[i].value
          this.filterTags.push(this.tableFilters[i])
        }
      }
    }
    params.page = this.page
    params.sort = this.sortBy
    params.direction = this.sortDirection
    return params
  }

  ### css 

  .clear-btn {
  margin: 0;
  padding: 0;
  background-color: inherit;
  border: 0px;
}

.header-filter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-tags {
  height: 30px;
  display: flex;
  align-items: center;
  p {
    margin: 0;
  }
}

.clear-filter-btn {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  align-items: center !important;
  margin: 0 5px 0 5px;
  border: 1px solid #2793ba;
  color: #2793ba !important;
}
.tag {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  align-items: center !important;
  margin: 0 5px 0 5px;
  background-color: #2793ba;

  button {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 10px !important;
    font-size: 14px;
    margin: 0;
    padding: 0;
    background-color: inherit;
    border: none;
    color: inherit;
  }
}

.filter-input{
  height: 38px;
}

.nav-icon {
  font-size: 12px;
  margin-left: 5px;
}
.dropdown-menu {
  padding: 10px !important;
  min-width: 220px !important;
}

.filter-active-color {
  color: #2793ba !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}