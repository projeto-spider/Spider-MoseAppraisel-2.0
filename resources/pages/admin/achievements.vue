<template>
  <div>
    <div class="columns">
      <div class="column">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Empreendimentos
            </div>
          </div>
        </nav>
        <br/>
        <b-table
          :data="achievements"
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
      achievements: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'name',
          label: 'Nome do empreendimento',
          centered: true
        },
        {
          field: 'cnpj',
          label: 'CNPJ',
          centered: true
        },
        {
          field: 'phone',
          label: 'Telefone',
          centered: true
        },
        {
          field: 'adress',
          label: 'Endereço',
          centered: true
        }
      ]
    }

    const achievements = await app.$axios.$get('api/achievements/')
    Object.assign(data.achievements, achievements)

    return data
  }
}
</script>
