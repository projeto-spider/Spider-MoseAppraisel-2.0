<template>
  <div>
    <achievementItem
      :profile="4"
      :achievement="achievement"
    ></achievementItem>

    <nav class="navbar is-transparent">
      <div class="navbar-start">
        <div class="navbar-item title">
          Unidades de negócio
        </div>
      </div>
    </nav>

    <div v-if="achievement.units.length === 0">
      Ainda não existem unidades de negócio.
    </div>

    <div v-else>
      <b-table
        :data="achievement.units"
        :columns="columns"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import achievementItem from '~/components/achievement-viewer.vue'

export default {
  name: 'responsible-achievement',

  components: { achievementItem },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      achievement: {},
      columns: [
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

    const achievement = await app.$axios.$get(`api/achievements/${id}`)
    Object.assign(data.achievement, achievement)

    return data
  }
}
</script>
