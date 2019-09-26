<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 v-if="evaluation !== null" class="title">
          Plano de melhoria da unidade de negócio {{evaluation.unit.name}}
        </h1>
      </div>
    </section>

    <div class="columns margin-layout">
      <div class="column">

        <div class="navbar-end">
          <a @click="chargeMap">
            mapa de calor
          </a>
        </div>

        <b-tabs position="is-centered">
          <b-tab-item label="Talento Humano">

            <div v-for="objective in objectives.TH" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>
          </b-tab-item>

          <b-tab-item label="Gestão e qualidade">

            <div v-for="objective in objectives.GQ" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>
          </b-tab-item>

          <b-tab-item label="Cliente e mercado">

            <div v-for="objective in objectives.CM" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>
          </b-tab-item>

          <b-tab-item label="Inovação">

            <div v-for="objective in objectives.IN" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>
          </b-tab-item>

          <b-tab-item label="Sociedade e sustentabilidade">

            <div v-for="objective in objectives.SO" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>
          </b-tab-item>
        </b-tabs>
        <br/>
        <button class="button" @click="finalize = true">Finalizar plano</button>
      </div>
    </div>

    <section>
      <b-modal :active.sync="finalize">
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">Essa ação não pode ser desfeita. Deseja continuar?</p>
          </header>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="finalize = false">Cancelar</button>
              <button class="button is-primary" type="button" @click="finalizePlan">Finalizar</button>
          </footer>
        </div>
      </form>
    </b-modal>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives.json'
import competences from '~/static/competences.json'
import improvementItem from '~/components/improvement-item.vue'

export default {
  name: 'improvement',

  layout: 'basic',

  components: { improvementItem },

  async created () {
    this.chargeMembers()
  },

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
    },

    filteredMemberObj () {
      return this.members.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      competences: competences,
      evidences: [],
      result: [],
      plan: {
        solution: '',
        solutionDate: new Date(),
        status: 'novo'
      },
      membersId: [],
      team: [],
      members: [],
      unit: {},
      sponsor: {},
      evaluation: {},
      finalize: false
    }

    const evaluation = await app.$axios.$get(`/api/evaluations/${id}`)
    Object.assign(data.evaluation, evaluation)

    const unitId = evaluation.unitId
    const unit = await app.$axios.$get(`/api/units/${unitId}`)
    Object.assign(data.unit, unit)

    data.membersId = unit.members

    const team = await app.$axios.$get(`/api/unit-id/${unitId}`)
    data.team = team

    const sponsor = await app.$axios.$get(`/api/users/${unit.achievement.sponsorId}`)
    Object.assign(data.sponsor, sponsor)

    return data
  },

  methods: {
    async chargeMembers () {
      this.members = []
      for (var i = 0; i < this.team.length; i++) {
        var user = this.team[i].member
        this.members.push(user)
      }
      this.members.push(this.sponsor)
      this.members.push(this.unit.responsible)
    },

    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      const result = await this.$axios.$post('/api/res-practice/', data)

      this.evidences = evidences
      this.result = result
    },

    chargeMap () {
      this.$router.push({path: `/improvement/${this.evaluation.id}/map`})
    },

    async finalizePlan () {
      const data = {
        planFinal: true
      }

      await this.$axios.$put(`/api/evaluations/${this.id}`, data)
      this.$router.push({path: `/valuer/unit/${this.evaluation.unitId}`, success: true})
    }
  }
}
</script>

<style>
.button {
  padding: 5px;
  display: inline-flex
}
</style>
