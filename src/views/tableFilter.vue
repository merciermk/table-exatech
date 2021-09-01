/* Todo : degager les sortBy */

<template>
  <div id="table-filter">
    <my-table
      :tableFields="appfields"
      :tableDatas="appdatas"
      :tableFilters="appfiltersSection"
    > </my-table>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator'
import myTable from '@/components/myTable.vue'
import { mapGetters } from 'vuex'

@Component({
  components: {
    myTable
  },
  computed: {
    ...mapGetters(['datas', 'fields', 'filtersSection'])
  }
})
export default class App extends Vue {
  @Watch('datas')
  getDatas () {
    this.appdatas = this.$store.getters.datas
    console.log(this.appdatas)
  }

  @Watch('filterSection')
  getFilters () {
    this.appfiltersSection = this.$store.getters.filterSection
  }

  @Watch('fields')
  getFields () {
    this.appfields = this.$store.getters.fields
  }

  appdatas= this.$store.getters.datas
  appfiltersSection = this.$store.getters.filtersSection
  appfields = this.$store.getters.fields

  mounted () {
    console.log('hello')
    console.log(this.$store.getters.filtersSection)
    console.log('hello')
  }
}

</script>

<style>
#table-filter{
  position: absolute;
  top: 5rem;
  left: 5rem;
  width: 90%;
  height: 100vh;
  text-align: center;
}

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
