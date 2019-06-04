<template>
  <div>
    <achievementItem
      :profile="3"
      :achievement="achievement"
    ></achievementItem>

    <nav class="navbar is-transparent">
      <div class="navbar-start">
        <div class="navbar-item title">
          Unidades de negócio
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
              <button class="button is-info" @click="unitCreator = true">Nova Unidade</button>
            <div v-if="selected">
              <button class="button is-warning" @click="openUnitEditionModal">Editar</button>
              <button class="button is-danger" @click="deleteUnit">Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="achievement.units.length === 0">
      Ainda não existem unidades de negócio.
    </div>

    <div v-else>
      <b-table
        @click="selected = true"
        :data="achievement.units"
        :columns="columns"
        :selected.sync="selectedUnit"
        focusable
      ></b-table>
    </div>

    <section>
      <div v-if="unitCreator">
        <b-modal :active.sync="unitCreator">
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de unidade de negócio</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="newUnit.name"
                        placeholder="Nome da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Descrição">
                    <b-input
                        type="textarea"
                        v-model="newUnit.description"
                        placeholder="Descrição da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                      type="tel"
                      v-model="newUnit.phone"
                      placeholder="Telefone da unidade de negócio"
                      v-mask="'(##) #####-####'"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Número de pessoas">
                    <b-input
                        v-model="newUnit.people_number"
                        placeholder="Número de pessoas da unidade"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="unitCreator = false">Cancelar</button>
                    <button class="button is-primary" @click="createUnit">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="unitEditor">
        <b-modal :active.sync="unitEditor">
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Atualização de unidade de negócio</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="editionUnit.name"
                        placeholder="Nome da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Descrição">
                    <b-input
                        type="textarea"
                        v-model="editionUnit.description"
                        placeholder="Descrição da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                      type="tel"
                      v-model="editionUnit.phone"
                      placeholder="Telefone da unidade de negócio"
                      v-mask="'(##) #####-####'"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Número de pessoas">
                    <b-input
                        v-model="editionUnit.people_number"
                        placeholder="Número de pessoas da unidade"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="unitEditor = false">Cancelar</button>
                    <button class="button is-primary" @click="updateUnit">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import achievementItem from '~/components/achievement-viewer.vue'
import profiles from '~/static/profiles.json'
import {mask} from 'vue-the-mask'

export default {
  name: 'sponsor-achievement',

  directives: {mask},

  components: { achievementItem },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      profiles: profiles,
      achievement: {},
      unitCreator: false,
      selected: false,
      selectedUnit: {},
      unitEditor: false,
      editionUnit: {},
      newUnit: {
        achievement_id: '',
        name: '',
        description: '',
        phone: '',
        people_number: ''
      },
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
  },

  methods: {
    async loadAchievement () {
      const id = this.$route.params.id
      const achievement = await this.$axios.$get(`api/achievements/${id}`)
      this.achievement = achievement
    },

    async createUnit () {
      this.newUnit.achievementId = this.achievement.id
      this.newUnit.valuerId = this.achievement.valuerId

      await this.$axios.$post(`api/units`, this.newUnit)
        .then(this.handleUnitCreateSuccess)
        .catch(this.handleUnitCreateFail)

      this.loadAchievement()
    },

    handleUnitCreateSuccess () {
      this.$toast.open({
        message: 'Unidade de negócio criada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.unitCreator = false
    },

    handleUnitCreateFail () {
      this.$toast.open({
        message: 'Falha ao criar unidade de negócio. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    openUnitEditionModal () {
      Object.assign(this.editionUnit, this.selectedUnit)
      this.unitEditor = true
    },

    async updateUnit () {
      const {id} = this.editionUnit
      await this.$axios.$put(`api/units/${id}`, this.editionUnit)
        .then(this.handleUnitUpdateSuccess)
        .catch(this.handleUnitUpdateFail)
    },

    handleUnitUpdateSuccess () {
      this.$toast.open({
        message: 'Unidade de negócio atualizada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.unitEditor = false
    },

    handleUnitUpdateFail () {
      this.$toast.open({
        message: 'Falha ao atualizar unidade de negócio. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async deleteUnit () {
      const {id} = this.selectedUnit

      await this.$axios.$delete(`api/units/${id}`)

      this.loadAchievement()
    }
  }
}
</script>

<style>

</style>
