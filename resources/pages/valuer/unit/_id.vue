<template>
  <div>
    <div class="columns">
      <!-- Here comes th unit's render component -->
      <div class="column" v-if="unit">
        <unitViewer
          :profile="2"
          :unit="unit"
        >
        </unitViewer>

        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Avaliações
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button 
                  class="button is-info" 
                  @click="evaluationCreation = true"
                >
                  <span class="icon">
                    <i class="fa fa-plus-circle"></i>
                  </span>
                  <span> Nova avaliação </span>
                </button>
                <div v-if="selectedEvaluation">
                  <button class="button is-warning" @click="editEvaluation">
                    <span class="icon">
                      <i class="fa fa-edit"></i>
                    </span>
                    <span> Editar </span>
                  </button>
                  <button 
                    class="button is-danger" 
                    @click="deleteEvaluation"
                  >
                    <span class="icon">
                      <i class="fa fa-trash"></i>
                    </span>
                    <span> Deletar </span>
                  </button>
                  <nuxt-link
                    :to="`/valuer/evaluation/${choosedEvaluation.id}`"
                    v-if="isCurrentEvaluation && isCurrentValuer"
                    class="button"
                  >
                    Avaliar
                  </nuxt-link>
                  </button>
                  <a 
                    class="button" 
                    v-if="choosedEvaluation.status === 'Vigente'" 
                    @click="openTerm = true"
                  >
                    Acordo de confidencialidade
                  </a>
                  <button
                    v-if="choosedEvaluation.planFinal"
                    class="button"
                    @click="chargeImprovement">
                      Plano de melhoria
                  </button>
                  <button
                    v-if="choosedEvaluation.status === 'Finalizada'"
                    class="button"
                    @click="chargeMap">
                      Mapa de calor
                  </button>
                  <button
                    v-if="choosedEvaluation.status === 'Finalizada'"
                    class="button"
                    @click="chargeResult">
                      Resultado da Avaliação
                  </button>
                  <button
                    v-if="choosedEvaluation.status === 'Auditada'"
                    class="button"
                    @click="chargeResult">
                      Resultado da Avaliação
                  </button>
                  <nuxt-link
                    :to="`/valuer/audit-teste/${choosedEvaluation.id}`"
                    v-if="choosedEvaluation.status === 'Finalizada'"
                    class="button"
                  >
                    Auditar
                  </nuxt-link>
                  </button>
                  <nuxt-link
                    :to="`/valuer/audit-result/${choosedEvaluation.id}`"
                    v-if="choosedEvaluation.status === 'Auditada'"
                    class="button"
                  >
                    Resultado da Auditoria
                  </nuxt-link>
                  <nuxt-link
                    :to="`/valuer/certificate/${choosedEvaluation.id}`"
                    v-if="choosedEvaluation.status === 'Auditada'"
                    class="button"
                  >
                    Certificado
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br/>
        <!-- unit's valuations table -->
        <div v-if="unit.evaluations.length === 0">
          Ainda não existem avaliações.
        </div>
        <div v-else>
          <b-table
            @click="selectedEvaluation = true"
            :data="evaluations"
            :columns="columns"
            :selected.sync="choosedEvaluation"
            focusable
          ></b-table>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <section>
      <div v-if="evaluationCreation">
        <b-modal :active.sync="evaluationCreation">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de avaliação</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Tipo">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Contexto</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Status">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Vigente</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Contratante">
                    <b-input
                      v-model="createdEvaluation.contractor"
                      placeholder="Nome do contratante"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Parceiro">
                    <b-input
                      v-model="createdEvaluation.partner"
                      placeholder="Nome do parceiro"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Data de início">
                    <b-datepicker
                        placeholder="Selecione a data de início..."
                        icon="calendar-today"
                        v-model="createdEvaluation.startDate"
                        :readonly="false">
                    </b-datepicker>
                </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="evaluationCreation = false">Cancelar</button>
                    <button class="button is-primary" @click="createEvaluation">Cadastrar</button>
                </footer>
            </div>
        </b-modal>
      </div>

      <div v-if="evaluationEdition">
        <b-modal :active.sync="evaluationEdition">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Atualização de avaliação</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Tipo">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Contexto</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Status">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Vigente</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Contratante">
                    <b-input
                      v-model="editedEvaluation.contractor"
                      placeholder="Nome do contratante"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Parceiro">
                    <b-input
                      v-model="editedEvaluation.partner"
                      placeholder="Nome do parceiro"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Data de início">
                    <p>Data de início: </p> {{editedEvaluation.startDate}}
                  </b-field>

                  <div v-if="editedEvaluation.endDate">
                    <p>Data de termino: </p> {{editedEvaluation.endDate}}
                  </div>

                  <div v-else>
                    <p>Data de termino: </p> Ainda não finalizada
                </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" @click="evaluationEdition = false">Cancelar</button>
                    <button class="button is-primary" @click="updateEvaluation">Atualizar</button>
                </footer>
            </div>
        </b-modal>
      </div>

      <!-- term of confidentiality -->
      <div v-if="openTerm && isCurrentValuer">
        <confidentialityTerm
          :activate="!!openTerm"
          :unit="unit"
          :evaluation="choosedEvaluation"
          :on-close="closeTermModal"
          :sponsor="sponsor"
          :responsible="unit.responsible"
          :valuer="unit.valuer"
          :members="members"
          :confirm-term="confimValuerTerm"
        ></confidentialityTerm>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sideBar from '~/components/side-bar.vue'
import unitViewer from '~/components/unit-viewer.vue'
import helpers from '~/static/helpers.json'
import confidentialityTerm from  '~/components/confidentiality-term.vue'

export default {
  name: 'valuer-unit',

  layout: 'basic',

  components: { sideBar, unitViewer, confidentialityTerm },

  computed: {
    ...mapGetters(['loggedUser']),

    isCurrentEvaluation () {
      return this.choosedEvaluation.status === 'Vigente'
    },

    isCurrentValuer () {
      return this.choosedEvaluation.valuerId === this.loggedUser.id
    }
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      helpers: helpers,
      achievements: [],
      unit: {},
      evaluationCreation: false,
      evaluationEdition: false,
      selectedEvaluation: false,
      selectedAudit: false,
      choosedEvaluation: {},
      evaluations: [],
      openTerm: false,
      sponsor: {},
      members: [],
      createdEvaluation: {
        type: 'Contexto',
        status: 'Vigente',
        contractor: '',
        partner: '',
        startDate: new Date()
      },

      editedEvaluation: {},
      columns: [
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
          field: 'valuer.username',
          label: 'Avaliador',
          centered: true
        },
        {
          field: 'responsible.username',
          label: 'Responsável',
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
          label: 'Data de início',
          centered: true
        },
        {
          field: 'endDate',
          label: 'Data de finalização',
          centered: true
        }
      ]
    }

    const unit = await app.$axios.$get(`/api/units/${id}`)
    Object.assign(data.unit, unit)

    //This part of code is used to convert to string the date data received from backend.
    const evaluations = await app.$axios.$get(`api/per-unit/${id}`)
    for (var i = 0; i < evaluations.length; i++) {
      evaluations[i].startDate = new Date(evaluations[i].startDate).toLocaleDateString()
      if (evaluations[i].endDate) {
        evaluations[i].endDate = new Date(evaluations[i].endDate).toLocaleDateString()
      }
    }
    data.evaluations = evaluations

    const sponsor = await app.$axios.$get(`/api/users/${unit.achievement.sponsorId}`)
    Object.assign(data.sponsor, sponsor)

    const members = await app.$axios.$get(`/api/unit-id/${id}`)
    data.members = members

    return data
  },

  methods: {
    async loadUnit () {
      const unit = await this.$axios.$get(`/api/units/${this.id}`)
      this.unit = unit

      //This part of code is used to convert to string the date data received from backend.
      this.evaluations = await this.$axios.$get(`api/per-unit/${id}`)
      for (var i = 0; i < this.evaluations.length; i++) {
        this.evaluations[i].startDate = new Date(this.evaluations[i].startDate).toLocaleDateString()
        if (this.evaluations[i].endDate) {
          this.evaluations[i].endDate = new Date(this.evaluations[i].endDate).toLocaleDateString()
        }
      }

      const sponsor = await this.$axios.$get(`/api/users/${unit.achievement.sponsorId}`)
      this.sponsor = sponsor

      const members = await this.$axios.$get(`/api/unit-id/${id}`)
      this.members = members
    },

    async loadEvaluations () {
      this.evaluations = await this.$axios.$get(`api/per-unit/${this.id}`)
      
      //This part of code is used to convert to string the date data received from backend.
      for (var i = 0; i < this.evaluations.length; i++) {
        this.evaluations[i].startDate = new Date(this.evaluations[i].startDate).toLocaleDateString()
        if (this.evaluations[i].endDate) {
          this.evaluations[i].endDate = new Date(this.evaluations[i].endDate).toLocaleDateString()
        }
      }
    },



    async createEvaluation () {
      this.createdEvaluation.unitId = this.unit.id
      this.createdEvaluation.valuerId = this.unit.valuerId
      this.createdEvaluation.responsibleId = this.unit.responsibleId

      await this.$axios.$post(`api/evaluations/`, this.createdEvaluation)
        .then(this.handleSuccess)
        .cath(this.handleFail)
    },


    handleSuccess () {
      this.$toast.open({
        message: 'Avaliação criada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.$router.go()
      this.evaluationCreation = false
    },

    handleFail () {
      this.$toast.open({
        message: 'Falha ao criar avaliação. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },



    editEvaluation () {
      this.editedEvaluation = this.choosedEvaluation

      this.evaluationEdition = true
    },

    async updateEvaluation () {
      await this.$axios.$put(`api/evaluations/${id}`, this.edited)
      Object.assign(this.choosedEvaluation, this.editedEvaluation)

      this.evaluationEdition = false
    },

    async deleteEvaluation () {
      const {id} = this.choosedEvaluation
      await this.$axios.$delete(`api/evaluations/${id}`)

      this.loadUnit()
    },

    chargeImprovement () {
      const {id} = this.choosedEvaluation
      this.$router.push({path: `/improvement/${id}`})
    },

    chargeMap () {
      const {id} = this.choosedEvaluation
      this.$router.push({path: `/improvement/${id}/map`})
    },

    chargeResult () {
      const {id} = this.choosedEvaluation
      this.$router.push({path: `/valuer/results/${id}`})
    },

    chargeAudit () {
      const {id} = this.chooseEvaluation
      this.$router.push({path: `/valuer/audit-teste/${id}`})
    },

    closeTermModal () {
      this.openTerm = false
    },

    async confimValuerTerm () {
      const data = {valuerConfirmation: true}
      const {id} = this.choosedEvaluation

      await this.$axios.$post(`api/valuer-confirm/${id}`, data)
        .then(this.handleConfirmSuccess)
        .catch(this.handleConfirmFail)
    },

    handleConfirmSuccess () {
      this.$toast.open({
        message: 'Acordo assinado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.openTerm = false
      this.loadEvaluations()
    },

    handleConfirmFail () {
      this.$toast.open({
        message: 'Falha ao assinar acordo. Verifique sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async finalizeEvaluation () {
      const data = {
        status: 'Finalizada',
        endDate: new Date()
      }

      await this.$axios.$put(`/api/evaluations/${this.choosedEvaluation.id}`, data)

      this.loadEvaluations()
      this.finalize = false
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
