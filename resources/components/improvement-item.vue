<template>
  <div>
    <b-collapse class="card" :open="false" @open="chargeMembers">
      <div slot="trigger" slot-scope="props" class="card-header" >
        <p class="card-header-title" @click="chargeEvidences(objective.id)">
          {{objective.id}} - {{objective.description}}
        </p>
        <a @click="chargeEvidences(objective.id)" class="card-header-icon">
          <b-icon
            :icon="props.open ? 'menu-up' : 'menu-down'">
          </b-icon>
        </a>
      </div>

      <div class="card-content">
        <div v-for="(evidence, i) in evidences" :key="evidence.id">
          <p>link para a evidência {{i}}: 
            <a :href="evidence.url" target="blank">{{evidence.url}}</a> 
          </p>
        </div>
        <div v-if="result.length > 0">
          </hr>
          <p><strong>Resultado:</strong></p> <colorConversor class="margin-layout" :color="result[0].result"></colorConversor>
          </br>
          <p v-if="result[0].problem.length > 0"><strong>Problemas:</strong> {{result[0].problem}}</p>
          <p v-else><strong>Problemas:</strong> Não foram registrados problemas</p>

          <div v-if="result[0].problem.length > 0 && !hasImprovement">
            <p><strong>Solução</strong></p>
              <b-input type="textarea" v-model="plan.solution"></b-input>
              </br>

              <b-field label="Quem resolve?">
                <b-autocomplete
                  rounded
                  v-model="name"
                  :data="filteredMemberObj"
                  placeholder="Insira o nome do membro"
                  icon="magnify"
                  field="username"
                  @select="option => member = option">
                </b-autocomplete>
              </b-field>

              <p><strong>Quando resolve?</strong></p>
              <b-datepicker
                placeholder="Selecione uma data..."
                v-model="plan.solutionDate"
                icon="calendar-today">
              </b-datepicker>
              </br>

              <p><strong>Status</strong></p>
              <b-dropdown>
                <button class="button is-primary" slot="trigger">
                  <span v-if="plan.status.length === 0">Selecione um status</span>
                  <span v-else>{{plan.status}}</span>
                  <b-icon icon="menu-down"></b-icon>
                </button>

                <div v-for="(helper, i) in helpers.solutionsStatus" :key="i">
                  <b-dropdown-item @click="plan.status = helper">{{helper}}</b-dropdown-item>
                </div>
            </b-dropdown>
          </div>

          <hr/>
          <a
            v-if="result[0].problem.length > 0 && !hasImprovement && isResposible"
            class="button"
            @click="addImprovementPlan(objective.id)"
          >
            Salvar
          </a>
        </div>

        <div v-if="editing && isResposible">
          <section>
           <p><strong>Solução</strong></p>
              <b-input type="textarea" v-model="plan.solution"></b-input>
              </br>

              <b-field label="Quem resolve?">
                <b-autocomplete
                  rounded
                  v-model="name"
                  :data="filteredMemberObj"
                  placeholder="Insira o nome do membro"
                  icon="magnify"
                  field="username"
                  @select="option => member = option">
                </b-autocomplete>
              </b-field>

              <p><strong>Quando resolve?</strong></p>
              <b-datepicker
                placeholder="Selecione uma data..."
                v-model="plan.solutionDate"
                icon="calendar-today">
              </b-datepicker>
              </br>

              <p><strong>Status</strong></p>
              <b-dropdown>
                <button class="button is-primary" slot="trigger">
                  <span v-if="plan.status.length === 0">Selecione um status</span>
                  <span v-else>{{plan.status}}</span>
                  <b-icon icon="menu-down"></b-icon>
                </button>

                <div v-for="(helper, i) in helpers.solutionsStatus" :key="i">
                  <b-dropdown-item @click="plan.status = helper">{{helper}}</b-dropdown-item>
                </div>
            </b-dropdown>
          </section>
          <br/>
           <a class="button" @click="updateSolution"> Atualizar </a>
        </div>

        <div v-if="hasImprovement && !editing">
          <p><strong>Solução:</strong> {{improvements[0].solution}}</p>
          <p><strong>Quem resolve:</strong> {{improvements[0].members.username}}</p>
          <p><strong>Data de Resolução:</strong> {{improvements[0].shower}}</p>
          <p><strong>Status:</strong> {{improvements[0].status}}</p>
          <button v-if="isResposible" class="button" @click="editSolution">Editar</button>
        </div>

        <br/>
        <div v-if="result.length > 0 && result[0].result === 'Cinza'">
          <p>Critério não aplicável</p>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import helpers from '~/static/helpers.json'
import colorConversor from './color-conversor.vue'

export default {
  components: { colorConversor },

  props: {
    objective: {
      type: Object,
      required: true
    },

    team: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    editing: false,
    evidences: [],
    result: [],
    helpers: helpers,
    plan: {
      solution: '',
      solutionDate: new Date(),
      status: ''
    },
    members: [],
    name: '',
    member: null,
    editing: false,
    improvements: [],
    evaluation: null
  }),

  async created () {
    const id = this.$route.params.id
    const evaluation = await this.$axios.$get(`/api/evaluations/${id}`)
    this.evaluation = evaluation

    this.chargeEvidences(this.objective.id)
    this.chargeMembers()
  },

  computed: {
    ...mapGetters(['loggedUser']),

    filteredMemberObj () {
      return this.members.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    },

    hasImprovement () {
      return this.improvements.length > 0
    },

    isResposible () {
      return this.evaluation.responsibleId === this.loggedUser.id
    }
  },

  methods: {
    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      const result = await this.$axios.$post('/api/res-practice/', data)
      this.result = result

      if (result.length > 0) {
        const id = this.result[0].id
        const improvements = await this.$axios.$get(`/api/per-result/${id}`)
        this.improvements = improvements

        if (this.improvements.length > 0) {
          this.improvements[0].shower = new Date(improvements[0].solutionDate).toLocaleDateString()
        }
      }

      this.evidences = evidences
    },

    async addImprovementPlan (practice) {
      if (this.result[0].problem.length === 0) {
        return
      }
      this.plan.practice = practice
      this.plan.resultId = this.result[0].id
      this.plan.memberId = this.member.id

      await this.$axios.$post('/api/improvements/', this.plan)
      this.chargeEvidences(practice)
    },

    editSolution (practice) {
      this.plan.solution = this.result[0].improvements.solution
      this.plan.solutionDate = new Date(this.improvements[0].solutionDate)
      this.plan.status = this.result[0].improvements.status
      this.editing = true
    },

    async updateSolution () {
      if (this.member !== null) {
        this.plan.memberId = this.member.id
      }
      const id = this.improvements[0].id

      await this.$axios.$put(`/api/improvements/${id}`, this.plan)

      this.chargeEvidences(this.objective.id)
      this.editing = false
    },

    async chargeMembers () {
      const id = this.$route.params.id
      const evaluation = await this.$axios.$get(`/api/evaluations/${id}`)
      const unitId = this.evaluation.unitId
      const unit = await this.$axios.$get(`/api/units/${unitId}`)

      const sponsor = await this.$axios.$get(`/api/users/${unit.achievement.sponsorId}`)

      this.members = []
      for (var i = 0; i < this.team.length; i++) {
        var user = this.team[i].member
        this.members.push(user)
      }
      this.members.push(sponsor)
      this.members.push(unit.responsible)
    }
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 0px 700px 0px 0px
}
</style>
