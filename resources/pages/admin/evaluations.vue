<template>
  <div>
    <div class="columns">
      <div class="column">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Avaliações
            </div>
          </div>
        </nav>
        <br/>
        <b-table
          :data="evaluations"
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
      evaluations: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'type',
          label: 'Tipo',
          centered: true
        },
        {
          field: 'status',
          label: 'Status',
          centered: true
        },
        {
          field: 'contractor',
          label: 'Contratante',
          centered: true
        },
        {
          field: 'partner',
          label: 'Parceiro',
          centered: true
        },
        {
          field: 'startDate',
          label: 'Date de início',
          centered: true
        },
        {
          field: 'endDate',
          label: 'Data de finalização',
          centered: true
        }
      ]
    }

    const evaluations = await app.$axios.$get('api/evaluations/')
    for (var i = 0; i < evaluations.length; i++) {
      evaluations[i].startDate = new Date(evaluations[i].startDate).toLocaleDateString()
      if (evaluations[i].endDate) {
        evaluations[i].endDate = new Date(evaluations[i].endDate).toLocaleDateString()
      }
    }

    Object.assign(data.evaluations, evaluations)

    return data
  }
}
</script>
