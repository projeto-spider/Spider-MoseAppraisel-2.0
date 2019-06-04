<template>
  <div>
    <b-collapse class="card" :open="false" >
      <div slot="trigger" slot-scope="props" class="card-header">
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
            <a :href="evidence.url" target="_blank">{{evidence.url}}</a>
          </p>
          <p>Membro fornecedor: <strong>{{evidence.member.username}}</strong></p>
          <p>Papel do membro: <strong>{{evidence.evidenceFont.role}}</strong></p>
        </br>
        </div>
        <div v-if="result.length === 0">
          <section>
            <b-field label="Resultado">
              <b-select
                placeholder="Selecione uma cor"
                v-model="evaluation.result"
              >
                <option
                  v-for="color in colors"
                  :value="color.name"
                  :key="color.id"
                >
                  {{ color.name }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Problemas encontrados">
              <b-input maxlength="1000" type="textarea" v-model="evaluation.problem"></b-input>
            </b-field>
          </section>
          <div v-if="!isNotBadColor || evaluation.problem.length > 0">
            <button class="button" @click="addEvaluation(objective.id, evaluation)">Avaliar</button>  
          </div>
          <div v-else>
            <p>Informe os problemas encontrados para depois avaliar.</p>
          </div>
        </div>

        <div v-if="editing">
          <section>
            <b-field label="Resultado">
              <b-select
                placeholder="Selecione uma cor"
                v-model="evaluation.result"
              >
                <option
                  v-for="color in colors"
                  :value="color.name"
                  :key="color.id"
                >
                  {{ color.name }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Problemas encontrados">
              <b-input maxlength="1000" type="textarea" v-model="evaluation.problem"></b-input>
            </b-field>
          </section>
          <button class="button" @click="updateEvaluation(objective.id, evaluation)">Atualizar</button>
          <button class="button" @click="closeEdition">Cancelar</button>
        </div>

        <div v-if="result.length > 0 && !editing">
          <p><strong>Resultado:</strong></p> 
          <colorConversor class="margin-layout" :color="result[0].result"></colorConversor>
          <br/>
          <p><strong>Problemas:</strong></p> 
          <div v-if="result[0].problem.length > 0"> {{result[0].problem}} </div>
          <div v-else> <p>Não foram cadastrados problemas</p> </div>
          <br/>
          <button class="button" @click="editEvaluation">Editar</button>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import colorConversor from './color-conversor.vue'

export default {
  components: { colorConversor },

  props: {
    objective: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    colors: [
      {
        id: 1,
        name: 'Verde'
      },
      {
        id: 2,
        name: 'Azul'
      },
      {
        id: 3,
        name: 'Amarelo'
      },
      {
        id: 4,
        name: 'Laranja'
      },
      {
        id: 5,
        name: 'Vermelho'
      },
      {
        id: 6,
        name: 'Cinza'
      }
    ],

    evaluation: {
      result: '',
      problem: ''
    },
    editing: false,
    evidences: [],
    result: []
  }),

  computed: {
    isNotBadColor () {
      return this.evaluation.result === 'Amarelo' ||
        this.evaluation.result === 'Laranja' ||
        this.evaluation.result === 'Vermelho'
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

      this.evidences = evidences
      this.result = result

      if (this.editing) {
        this.closeEdition()
      }
    },

    async addEvaluation (practice, evaluation) {
      evaluation.practice = practice
      evaluation.evaluationId = this.$route.params.id

      await this.$axios.$post('/api/results/', evaluation)

      this.chargeEvidences(practice)
    },

    editEvaluation () {
      this.evaluation.result = this.result[0].result
      this.evaluation.problem = this.result[0].problem
      this.editing = true
    },

    async updateEvaluation (practice, evaluation) {
      evaluation.practice = practice
      const id = this.result[0].id

      await this.$axios.$put(`/api/results/${id}`, evaluation)

      this.chargeEvidences(practice)
    },

    closeEdition () {
      this.evaluation.result = ''
      this.evaluation.problem = ''
      this.editing = false
    }
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 0px 700px 0px 0px
}
</style>
