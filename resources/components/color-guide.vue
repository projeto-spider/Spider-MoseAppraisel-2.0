<template>
  <div>
    <b-table :data="data" :columns="columns">
      <!-- To understand what happens here, check Buefy's table documentation -->
      <template slot-scope="props">
        <b-table-column field="name" width="40">
          <colorConversor :color="props.row['name']"></colorConversor>
        </b-table-column>
        <b-table-column field="meaning" width="40">
          {{ props.row['meaning'] }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import colorConversor from './color-conversor.vue'
import helpers from '~/static/helpers.json'

export default {
  components: {colorConversor},

  created () {
    this.data = Object.values(helpers.colors)
  },

  data: () => ({
    data: false,
    columns: [
      {
        field: 'name',
        label: 'Cor',
        width: '10'
      },
      {
        field: 'meaning',
        label: 'Significado',
        width: '40',
        centered: true
      }
    ]
  })
}
</script>
