<template>
  <h1>
  Avaliação: {{ evaluation.id }}
  Tipo: {{ evaluation.type }}
  Avaliador: {{ evaluation.valuerId }}
  resultado: {{ result.problem }}
  </h1>
</template>

<script>

import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives.json'
import competences from '~/static/competences.json'
import objectiveItem from '~/components/objective-item'

export default {
  layout: 'basic',

  components: { objectiveItem },

  computed: {
    ...mapGetters(['loggedUser']),

    objectives () {
      return Object.values(objectives).reduce((acc, result) => {
        if (!acc[result.competence]) {
          acc[result.competence] = []
        }
        acc[result.competence].push(result)
        return acc
      }, {})
    }
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      competences: competences,
      finalize: false,
      evaluation: [],
      result: []
    }

    const evaluation = await app.$axios.$get(`/api/evaluations/${id}`)
    Object.assign(data.evaluation, evaluation)


    return data
  },

methods: {

  async loadEvaluation () {
      const evaluation = await this.$axios.$get(`/api/evaluations/${this.id}`)
      this.evaluation = evaluation
    },

  async loadResult () {
    const data = {
        evaluationId: this.$route.params.id
      }

      const result = await this.$axios.$post('/api/res-practice/', data)
      this.result = result
}
}
}
</script>

<style>
.margin-layout {
  margin: 15px;
}
</style>

<style>
.button {
  padding: 4px;
  display: inline-flex
}
</style>
