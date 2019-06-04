<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Avaliaçao de {{ evaluation.type }}
        </h1>
        <h2 class="subtitle">
          <strong>Unidade de negócio:</strong> {{ evaluation.unit.name }}
        </h2>
      </div>
    </section>

    <div class="column">
      <div v-if="evaluation.results.length > 0" class="navbar-end">
        <a @click="chargeImprovement">Plano de melhoria</a>
      </div>

      <b-tabs position="is-centered">
        <b-tab-item label="Talento Humano">
          <div v-for="(objective, i) in objectives.TH" :key="objective.id">
            <objectiveItem
              :objective="objective"
              :set-practice="(id) => setPractice(id)"
            ></objectiveItem>
          </div>
        </b-tab-item>

        <b-tab-item label="Gestão e Qualidade">
          <div v-for="objective in objectives.GQ" :key="objective.id">
            <objectiveItem
              :objective="objective"
              :set-practice="(id) => setPractice(id)"
            ></objectiveItem>
          </div>
        </b-tab-item>

        <b-tab-item label="Cliente e Mercado">
          <div v-for="objective in objectives.CM" :key="objective.id">
            <objectiveItem
              :objective="objective"
              :set-practice="(id) => setPractice(id)"
            ></objectiveItem>
          </div>
        </b-tab-item>

        <b-tab-item label="Inovação">
          <div v-for="objective in objectives.IN" :key="objective.id">
            <objectiveItem
              :objective="objective"
              :set-practice="(id) => setPractice(id)"
            ></objectiveItem>
          </div>
        </b-tab-item>

        <b-tab-item label="Sociedade e sustentabilidade">
          <div v-for="objective in objectives.SO" :key="objective.id">
            <objectiveItem
              :objective="objective"
              :set-practice="(id) => setPractice(id)"
            ></objectiveItem>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>

    <section>
      <div v-if="addEvidence">
        <b-modal :active.sync="addEvidence">   
          <form @submit.prevent="createEvidence">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de evidência</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Prática">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>{{evidence.practice}}</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Url">
                    <b-input
                        v-model="evidence.url"
                        placeholder="url"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Quem fornece essa evidência ?">
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

                  <b-field label="Qual o papel desse membro?">
                    <b-autocomplete
                      rounded
                      v-model="role"
                      :data="filteredFontObj"
                      placeholder="Insira o nome da fonte de evidência"
                      icon="magnify"
                      field="role"
                      @select="option => font = option">
                    </b-autocomplete>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="addEvidence = false">Cancelar</button>
                    <button class="button is-primary" type="submit">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives.json'
import competences from '~/static/competences.json'
import objectiveItem from '~/components/responsible-objective-item'

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
    },

    filteredMemberObj () {
      return this.members.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    },

    filteredFontObj () {
      return this.evidenceFonts.filter((option) => {
        return option.role
          .toString()
          .toLowerCase()
          .indexOf(this.role.toLowerCase()) >= 0
      })
    }
  },

  async created () {
    this.chargeMembers()
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      members: [],
      sponsor: {},
      unit: {},
      teste: [],
      membersId: [],
      evidences: [],
      evidenceFonts: [],
      competences: competences,
      evaluation: {},
      evidence: {
        url: '',
        practice: ''
      },
      fontId: null,
      member: null,
      name: '',
      role: '',
      addEvidence: false,
      evidenceFont: null,
      font: '',
      seeEvidence: false,
      team: []
    }

    const evaluation = await app.$axios.$get(`/api/evaluations/${id}`)
    Object.assign(data.evaluation, evaluation)

    const unitId = evaluation.unitId
    const unit = await app.$axios.$get(`/api/units/${unitId}`)
    Object.assign(data.unit, unit)

    data.evidenceFonts = unit.evidenceFonts
    data.membersId = unit.members

    const members = await app.$axios.$get(`api/unit-id/${unitId}`)
    data.team = members

    const teste = await app.$axios.$get(`api/member-role`)
    data.teste = teste

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

    async createEvidence () {
      const evidence = {
        url: this.evidence.url,
        practice: this.evidence.practice,
        evaluationId: this.evaluation.id,
        memberId: this.member.id,
        evidenceFontId: this.font.id
      }

      await this.$axios.$post('api/evidences', evidence)

      const data = {
        memberId: this.member.id,
        evaluationId: this.evaluation.id
      }

      const val = await this.$axios.$post('api/exist-member', data)
      if (val.length === 0) {
        await this.$axios.$post('api/member-evaluation', data)
        this.memberRoleRelate()
      } else {
        this.memberRoleRelate()
      }
    },

    async memberRoleRelate () {
      for (var i = 0; i < this.team.length; i++) {
        if (this.team[i].userId === this.member.id) {
          const data = {
            memberId: this.team[i].id,
            evidenceFontId: this.font.id,
            evaluationId: this.evaluation.id
          }
          await this.$axios.$post('api/member-role', data)
        }
      }
      this.addEvidence = false
      this.$router.go()
    },

    setPractice (practice) {
      this.evidence.practice = practice
      this.addEvidence = true
    },

    chargeImprovement () {
      this.$router.push({path: `/improvement/${this.evaluation.id}`})
    }
  }
}
</script>

<style>
.button {
  padding: 4px;
  display: inline-flex
}
</style>
