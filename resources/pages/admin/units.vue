<template>
  <div>
    <div class="columns">
      <div class="column">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Unidades de negócio
            </div>
          </div>
        </nav>
        <br/>
        <b-table
          :data="units"
          :columns="columns"
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminAchievementsPage',

  layout: 'admin',

  async asyncData ({ app, params }) {
    const data = {
      units: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'name',
          label: 'Nome da UN',
          centered: true
        },
        {
          field: 'description',
          label: 'Descrição da UN',
          centered: true
        },
        {
          field: 'phone',
          label: 'Telefone',
          centered: true
        },
        {
          field: 'people_number',
          label: 'Número de pessoas',
          centered: true
        }
      ]
    }

    const units = await app.$axios.$get('api/units/')
    Object.assign(data.units, units)

    return data
  }
}
</script>
