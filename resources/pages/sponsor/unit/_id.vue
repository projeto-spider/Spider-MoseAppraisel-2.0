<template>
  <div>
    <div class="columns">
      <div class="column" v-if="selectedUnit">
        <!-- unit viwer -->
        <unitViewer
          :profile="3"
          :unit="selectedUnit"
          :edit-unit="editUnit"
          :delete-unit="deleteUnit"
          :open-responsible-creator="openResponsibleCreator"
          :open-responsible-update="openResponsibleUpdateModal"
          :disassociate-responsible="disassociateResponsible"
        >
        </unitViewer>

        <nav class="navbar is-ligthBlue">
          <div class="navbar-start">
            <div class="navbar-item title">
              Avaliações
            </div>
          </div>
          <div class="navbar-end" v-if="selectedEvaluation">
            <div class="navbar-item">
              <div class="buttons">
                <button 
                  v-if="selectedEvaluation.status === 'Vigente'"
                  class="button" 
                  @click="openTerm = true"
                >
                  Termo de confidencialidade
                </button>
                <div v-if="selectedEvaluation.status === 'Finalizada'">
                  <button class="button" @click="chargeImprovement">Plano de melhoria</button>
                  <button class="button" @click="">Mapa de calor</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br/>
        <div v-if="selectedUnit.evaluations.length === 0">
          Ainda não existem avaliações.
        </div>
        <div v-else>
          <b-table
            :data="evaluations"
            :columns="columns"
            :selected.sync="selectedEvaluation"
            focusable
          ></b-table>
        </div>
      </div>
    </div>
    <section>
      <userRegister
        :activate="!!creation"
        :profile="profiles.responsible"
        :createUser="(user, confirmPassword) => createUser(user, confirmPassword)"
        :onClose="closeUserRegisterModal"
      ></userRegister>

      <div v-if="edition">
        <b-modal :active.sync="edition">
          <form>
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edição de unidade de negócio</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome da unidade">
                    <b-input
                        v-model="editedUnit.name"
                        placeholder="Nome da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Descrição">
                    <b-input
                        type="textarea"
                        v-model="editedUnit.description"
                        placeholder="Decrição da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                        v-model="editedUnit.phone"
                        placeholder="Telefone da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Número de pessoas da unidade">
                    <b-input
                        v-model="editedUnit.people_number"
                        placeholder="Número de pessoas da unidade"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="edition = false">Cancelar</button>
                    <button class="button is-primary" type="submit" @click="updateUnit">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="responsibleChange">
        <b-modal :active.sync="responsibleChange">
          <form>
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Mudança de responsável</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Qual o novo responsável?">
                    <b-autocomplete
                      rounded
                      v-model="name"
                      :data="filteredUserObj"
                      placeholder="Insira o nome do novo responsável"
                      icon="magnify"
                      field="username"
                      @select="option => newResponsible = option">
                    </b-autocomplete>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="responsibleChange = false">Cancelar</button>
                    <button class="button is-primary" @click="updateResponsible">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="openTerm && isCurrentSponsor">
        <confidentialityTerm
          :activate="!!openTerm"
          :unit="selectedUnit"
          :evaluation="selectedEvaluation"
          :on-close="closeTermModal"
          :sponsor="sponsor"
          :responsible="selectedUnit.responsible"
          :valuer="selectedUnit.valuer"
          :members="members"
          :confirm-term="confimSponsorTerm"
        ></confidentialityTerm>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sideBar from '~/components/side-bar.vue'
import unitViewer from '~/components/unit-viewer.vue'
import userRegister from '~/components/user-register-modal.vue'
import confidentialityTerm from '~/components/confidentiality-term.vue'
import profiles from '~/static/profiles.json'
import helper from '~/static/helpers.json'

export default {
  layout: 'basic',

  components: { sideBar, userRegister, unitViewer, confidentialityTerm },

  created() {
    this.loadSponsorAchievement()
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      achievements: [],
      evaluations: [],
      selectedUnit: null,
      responsible: false,
      creation: false,
      openTerm: false,
      edition: false,
      selectedEvaluation: null,
      editedUnit: {},
      profiles: profiles,
      newResponsible: null,
      responsibleChange: false,
      users: [],
      members: [],
      sponsor: {},
      name: '',
      contractors: helper.contractors,
      columns: [
        {
          field: 'type',
          label: 'Tipo',
          centered: true
        },
        {
          field: 'status',
          label: 'status',
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
      ],
    }

    const selectedUnit = await app.$axios.$get(`/api/units/${id}`)
    data.selectedUnit = selectedUnit

    data.evaluations = await app.$axios.$get(`api/per-unit/${id}`)

    //This part of code is used to convert to string the date data received from backend.
    for (var i = 0; i < data.evaluations.length; i++) {
      data.evaluations[i].startDate = new Date(data.evaluations[i].startDate).toLocaleDateString()
      if (data.evaluations[i].endDate) {
        data.evaluations[i].endDate = new Date(data.evaluations[i].endDate).toLocaleDateString()
      }
    }

    const sponsor = await app.$axios.$get(`/api/users/${selectedUnit.achievement.sponsorId}`)
    Object.assign(data.sponsor, sponsor)

    const members = await app.$axios.$get(`/api/unit-id/${selectedUnit.id}`)
    data.members = members

    const users = await app.$axios.$get('/api/users')
    data.users = users

    return data
  },

  computed: {
    ...mapGetters(['loggedUser']),

    filteredUserObj () {
      return this.users.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    },

    isCurrentSponsor () {
      return this.selectedUnit.achievement.sponsorId === this.loggedUser.id
    }
  },

  methods: {
    async createUser (user, confirmPassword) {
      if (user.password === confirmPassword) {
        user.profile = [this.profiles.responsible.id]
        const { id } = await this.$axios.$post('api/users', user)

        const data = {responsibleId: id}
        const unitId = this.selected.id

      await this.$axios.$put(`api/units/${unitId}`, data)
          .then(this.handleCreateSuccess)
          .catch(this.handleCreateFail)
      }

      this.closeUserRegisterModal()
    },

    async loadSponsorAchievement () {
      const id = this.loggedUser.id
      const achievements = await this.$axios.$get(`/api/sponsor-achivements/${id}`)
      this.achievements = achievements
    },

    async loadUnits () {
      const id = this.loggedUser.id
      const achievements = await this.$axios.$get(`/api/sponsor-achivements/${id}`)
      this.achievements = achievements
      var idUN = this.$route.params.id
      const selectedUnit = await this.$axios.$get(`/api/units/${idUN}`)
      this.selectedUnit = selectedUnit
      this.evaluations = await this.$axios.$get(`api/per-unit/${idUN}`)

      for (var i = 0; i < this.evaluations.length; i++) {
        this.evaluations[i].startDate = new Date(this.evaluations[i].startDate).toLocaleDateString()
        if (this.evaluations[i].endDate) {
          this.evaluations[i].endDate = new Date(this.evaluations[i].endDate).toLocaleDateString()
        }
      }

      const sponsor = await this.$axios.$get(`/api/users/${selectedUnit.achievement.sponsorId}`)
      this.sponsor = sponsor

      const members = await this.$axios.$get(`/api/unit-id/${selectedUnit.id}`)
      this.members = members
    },

    async loadUsers () {
      const users = await this.$axios.$get('/api/users')
      this.users = users
    },

    handleCreateSuccess () {
      this.$toast.open({
        message: 'Responsável criado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },

    handleCreateFail () {
      this.$toast.open({
        message: 'Falha ao criar responsável. Cheque os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    closeUserRegisterModal () {
      this.creation = false
    },

    editEvaluation () {
      Object.assign(this.edited, this.selectedEva)
      this.edition = true
    },

    editUnit () {
      Object.assign(this.editedUnit, this.selectedUnit)
      this.edition = true
    },

    async updateUnit () {
      const {id} = this.editedUnit

      await this.$axios.$put(`api/units/${id}`, this.editedUnit)
    },

    async deleteUnit () {
      const {id} = this.selectedUnit


      await this.$axios.$delete(`api/units/${id}`)
      this.loadSponsorAchievement()
      this.$router.push({path: '/sponsor/achievements', success: true})
    },

    openResponsibleCreator () {
      this.creation = true
    },

    openResponsibleUpdateModal () {
      this.responsibleChange = true
    },

    async updateResponsible () {
      const data = {responsibleId: this.newResponsible.id}

      await this.$axios.$put(`api/units/${this.selectedUnit.id}`, data)
        .then(this.handleResponsibleUpdateSuccess)
        .catch(this.handleResponsibleUpdateFail)

      this.chargeAchievement(this.selectedUnit.id)
    },

    closeTermModal () {
      this.openTerm = false
    },

    chargeImprovement () {
      this.$router.push({path: `/improvement/${this.selectedEvaluation.id}`})
    },

    async confimSponsorTerm () {
      const data = {sponsorConfirmation: true}

      await this.$axios.$post(`api/sponsor-confirm/${this.selectedEvaluation.id}`, data)
        .then(this.handleConfirmSuccess)
        .cath(this.handleConfirmFail)
    },

    handleConfirmSuccess () {
      this.$toast.open({
        message: 'Acordo assinado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.openTerm = false
      this.$router.go()
    },

    handleConfirmFail () {
      this.$toast.open({
        message: 'Falha ao assinar acordo. Verifique sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async disassociateResponsible () {
      const data = {responsibleId: null}
      const id = this.selectedUnit.id

      await this.$axios.$put(`api/units/${id}`, data)

      this.loadUnits()
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
