<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Auditoria da avaliaçao de {{ evaluation.type }}
        </h1>
        <h2 class="subtitle">
          <strong>Unidade de negócio:</strong> {{ evaluation.unit.name }}
        </h2>
        <h3 class="subtitle">
          <strong>Resultado da Auditoria:</strong> {{ }}
        </h3>
      </div>
    </section>
    <div class="columns margin-layout">
      <div class="column">
        <b-tabs position="is-centered">
          <b-tab-item label="Itens da Auditoria">

            <div v-for="(objective, i) in objectives.AD" :key="objective.id">
              <objectiveItem
                :objective="objective"
              ></objectiveItem>
            </div>
          </b-tab-item>


        </b-tabs>
        </br>
        <button class="button" @click="checkFinalize">Finalizar auditoria</button>
      </div>
    </div>
    <h3 class="title">
      Informações sobre a Avaliação
    </h3>
    <button
                    class="button"
                    @click="chargeResult">
                      Resultado da Avaliação
                  </button>
    <button
                    class="button"
                    @click="chargeMap">
                      Mapa de calor
                  </button>

    <section>
      <b-modal :active.sync="finalize">
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">Essa ação não pode ser desfeita. Deseja continuar?</p>
          </header>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="finalize = false">Cancelar</button>
              <button class="button is-primary" type="button" @click="finalizeEvaluation">Finalizar</button>
          </footer>
        </div>
      </form>
    </b-modal>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives-teste.json'
import competences from '~/static/competences-teste.json'
import objectiveItem from '~/components/objective-item-teste2'

export default {
  layout: 'basic',
  name: 'valuer-unit',

  components: { objectiveItem },

  computed: {
    ...mapGetters(['loggedUser']),

    isCurrentValuer () {
      return this.choosedEvaluation.valuerId === this.loggedUser.id
    },

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

  props: {
    valuer: {
      type: Object,
      default: () => ({})
    }
  },


  data: () => ({

     members: []
  }),

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      competences: competences,
      finalize: false,
      evaluation: {}
    }

    const evaluation = await app.$axios.$get(`/api/evaluations/${id}`)
    Object.assign(data.evaluation, evaluation)

    return data
  },

  created () {
    this.loadMembers()
  },

  methods: {
    async loadEvaluation () {
      const evaluation = await this.$axios.$get(`/api/evaluations/${this.id}`)
      this.evaluation = evaluation
    },

    async checkFinalize () {
      const results = await this.$axios.$get(`/api/evaluation-result/${this.id}`)

      if (results.length < 20) {
        this.$toast.open({
          message: 'Os objetios não foram avaliados por completo. Avalie todos e tente novamente.',
          duration: 5000,
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      } else {
        this.finalize = true
      }
    },

    async finalizeEvaluation () {
      const data = {
        colorFinal: true,
        status: 'Auditada',
        endDate: new Date()
      }

      await this.$axios.$put(`/api/evaluations/${this.id}`, data)
      this.$router.push({path: `/valuer/unit/${this.evaluation.unitId}`, success: true})
    },

    async loadMembers () {
      const members = await this.$axios.$get(`api/get-members/${this.evaluation.id}`)
      this.members = members
    },

    chargeResult () {
      const {id} = this.$route.params.id
      this.$router.push({path: `/valuer/results/${this.id}`})
    },

    chargeMap () {
      const {id} = this.$route.params.id
      this.$router.push({path: `//improvement/${this.id}/map`})
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
