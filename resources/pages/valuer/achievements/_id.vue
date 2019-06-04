<template>
  <div>
    <!-- achievement viwer -->
    <achievementItem
      v-if="achievement !== null"
      :profile="2"
      :achievement="achievement"
      :edit-achievement="(achievement) => editAchievement(achievement)"
      :delete-achievement="deleteAchievement"
      :open-sponsor-register="openSponsorRegisterModal"
      :open-sponsor-update="openSponsorUpdateModal"
      :disassociate-sponsor="disassociateSponsor"
    ></achievementItem>

    <br/>

    <nav class="navbar is-ligthBlue">
      <div class="navbar-start">
        <div class="navbar-item title">
          Unidades de negócio
        </div>
      </div>
    </nav>

    <div v-if="!achievement.units.length > 0">
      Ainda não existem unidades de negócio.
    </div>
    <div v-else>
      <b-table
        :data="achievement.units"
        :columns="columns"
      ></b-table>
    </div>

    <!-- modals -->
    <section>
      <div v-if="achievementUpdater">
        <b-modal :active.sync="achievementUpdater">
          <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                  <p class="modal-card-title">Edição de Empredimento</p>
              </header>
              <section class="modal-card-body">
                <b-field label="Nome">
                  <b-input
                      v-model="editedAchievement.name"
                      placeholder="Nome do empreendimento"
                      required>
                  </b-input>
                </b-field>

                <b-field label="CNPJ">
                  <b-input
                      v-model="editedAchievement.cnpj"
                      placeholder="CNPJ do empreendimento"
                      v-mask="'##.###.###/####-##'"
                      required>
                  </b-input>
                </b-field>

                <b-field label="Telefone">
                  <b-input
                      type="tel"
                      v-model="editedAchievement.phone"
                      placeholder="Telefone do empreendimento"
                      v-mask="'(##) #####-####'"
                      required>
                  </b-input>
                </b-field>

                <b-field label="Endereço">
                  <b-input
                      v-model="editedAchievement.adress"
                      placeholder="Endereço do empreendimento"
                      required>
                  </b-input>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                  <button class="button" type="button" @click="achievementUpdater = false">Cancelar</button>
                  <button class="button is-primary" @click="updateAchievement">Atualizar</button>
              </footer>
            </div>
        </b-modal>
      </div>

      <div v-if="sponsorUpdater">
        <b-modal :active.sync="sponsorUpdater">
          <div class="modal-card" style="width: auto">
              <header class="modal-card-head is-mose">
                  <p class="modal-card-title is-white">Indicação de patrocinador</p>
              </header>
              <section class="modal-card-body">
                <b-field label="Qual o novo patrocinador?">
                  <b-autocomplete
                    rounded
                    v-model="name"
                    :data="filteredUserObj"
                    placeholder="Insira o nome do novo patrocinador"
                    icon="magnify"
                    field="username"
                    @select="option => newSponsor = option">
                  </b-autocomplete>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                  <button class="button" type="button" @click="sponsorUpdater = false">Cancelar</button>
                  <button class="button is-primary" @click="updateSponsor">Atualizar</button>
              </footer>
          </div>
        </b-modal>
      </div>

      <userRegister
        :activate="!!sponsorCreation"
        :profile="profiles.sponsor"
        :createUser="(user, confirmPassword) => sponsorRegister(user, confirmPassword)"
        :onClose="closeSponsorRegisterModal"
      ></userRegister>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import achievementItem from '~/components/achievement-viewer.vue'
import userRegister from '~/components/user-register-modal.vue'
import profiles from '~/static/profiles.json'
import {mask} from 'vue-the-mask'

export default {
  layout: 'basic',

  directives: {mask},

  components: {achievementItem, userRegister},

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      profiles: profiles,
      achievement: {},
      users: null,
      editedAchievement: {},
      achievementUpdater: false,
      sponsorUpdater: false,
      name: '',
      newSponsor: null,
      sponsorCreation: false,
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
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

    const users = await app.$axios.$get('/api/users')
    data.users = users

    return data
  },

  created () {
    this.loadUsers()
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
    }
  },

  methods: {
    async loadAchievement () {
      const id = this.$route.params.id
      const achievement = await this.$axios.$get(`api/achievements/${id}`)
      this.achievement = achievement
    },

    async loadUsers () {
      const users = await this.$axios.$get('/api/users')
      this.users = users
    },

    editAchievement (achievement) {
      Object.assign(this.editedAchievement, achievement)
      this.achievementUpdater = true
    },

    async updateAchievement () {
      const {id} = this.editedAchievement

      await this.$axios.$put(`api/achievements/${id}`, this.editedAchievement)
        .then(this.handleUpdateAchievementSuccess)
        .catch(this.handleUpdateAchievementFail)
    },

    handleUpdateAchievementSuccess () {
      this.$toast.open({
        message: 'Empreendimento atualizado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.achievementUpdater = false
      Object.assign(this.editedAchievement, {})
      this.loadAchievement()
    },

    handleUpdateAchievementFail () {
      this.$toast.open({
        message: 'Falha ao atualizar empreendimento. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async deleteAchievement () {
      const {id} = this.achievement

      await this.$axios.$delete(`api/achievements/${id}`)
        .then(this.handleDeleteAchievementSuccess)
        .catch(this.handleDeleteAchievementFail)
    },

    handleDeleteAchievementSuccess () {
      this.$toast.open({
        message: 'Empreendimento deletado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.$router.push({path: '/valuer/achievements'})
    },

    handleDeleteAchievementFail () {
      this.$toast.open({
        message: 'Falha ao deletar empreendimento. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    openSponsorRegisterModal () {
      this.sponsorCreation = true
    },

    closeSponsorRegisterModal (user, confirmPassword) {
      this.sponsorCreation = false
    },

    async sponsorRegister (user, confirmPassword) {
      if (user.password === confirmPassword) {
        user.profiles = [ 3 ]
        const { id } = await this.$axios.$post('api/users', user)

        const data = {sponsorId: id}
        const achievementId = this.achievement.id

        await this.$axios.$put(`api/achievements/${achievementId}`, data)
          .then(this.handleCreateSponsorSuccess)
          .catch(this.handleCreateSponsorFail)

        this.loadAchievement()
        this.closeSponsorRegisterModal()
      }
    },

    handleCreateSponsorSuccess () {
      this.$toast.open({
        message: 'Patrocinador cadastrado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },

    handleCreateSponsorFail () {
      this.$toast.open({
        message: 'Falha ao cadastrar patrocinador. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    openSponsorUpdateModal () {
      this.sponsorUpdater = true
    },

    async updateSponsor () {
      const data = {sponsorId: this.newSponsor.id}
      const id = this.achievement.id

      await this.$axios.$put(`api/achievements/${id}`, data)
        .then(this.handleSponsorUpdateSuccess)
        .catch(this.handleSponsorUpdateFail)
    },

    handleSponsorUpdateSuccess () {
      this.$toast.open({
        message: 'Patrocinador atualizado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.sponsorUpdater = false
      this.name = ''
      this.loadAchievement()
    },

    handleSponsorUpdateFail () {
      this.$toast.open({
        message: 'Falha ao atualizar patrocinador. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async disassociateSponsor () {
      const data = {sponsorId: null}
      const id = this.achievement.id

      await this.$axios.$put(`api/achievements/${id}`, data)

      this.loadAchievement()
    }
  }
}
</script>

<style>
</style>
