<template>
  <div>
    <div class="columns">
      <div class="column">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Usuários
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button class="button is-info" @click="creation = true">Novo</button>
                <div v-if="selected">
                  <button class="button is-warning" @click="edition = true">Editar</button>
                  <button class="button is-danger" @click="userDeletion = true">Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br/>
        <b-table
          :bordered="bordered"
          :data="users"
          :columns="columns"
          :selected.sync="selected"
          focusable
        ></b-table>
      </div>
    </div>

    <section>
      <userRegister
        :activate="!!creation"
        :profile="profiles.valuer"
        :createUser="(user, confirmPassword) => createUser(user, confirmPassword)"
        :onClose="closeUserRegisterModal"
      ></userRegister>

      <div v-if="edition">
        <b-modal :active.sync="edition">
          <form action="">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                  <p class="modal-card-title">Edição de usuário</p>
              </header>
              <section class="modal-card-body">
                  <b-field label="Usuário">
                    <b-input
                        v-model="selected.username"
                        placeholder="Nome de usuário"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Email">
                    <b-input
                        type="email"
                        v-model="selected.email"
                        placeholder="Email do usuário"
                        required>
                    </b-input>
                  </b-field>
              </section>
              <footer class="modal-card-foot">
                  <button class="button" type="button" @click="edition = false">Cancelar</button>
                  <button class="button is-primary" @click="updateUser">Atualizar</button>
              </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <b-modal :active.sync="userDeletion">
        <form action="">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Essa ação não pode ser desfeita. Deseja continuar?</p>
            </header>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="userDeletion = false">Cancelar</button>
                <button class="button is-primary" type="button" @click="deleteUser">Deletar</button>
            </footer>
          </div>
        </form>
      </b-modal>
    </section>
  </div>
</template>

<script>
import userRegister from '~/components/user-register-modal.vue'
import profiles from '~/static/profiles.json'
import { mapGetters } from 'vuex'

export default {
  name: 'adminUsersPage',

  layout: 'admin',

  components: { userRegister },

  async created () {
    this.loadUsers()
  },

  computed: {
    ...mapGetters(['loggedUser'])
  },

  data: () => ({
    users: [],
    selected: null,
    creation: false,
    edition: false,
    bordered: true,
    userDeletion: false,
    columns: [
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'username',
        label: 'Nome de usuário',
        centered: true
      },
      {
        field: 'email',
        label: 'Email',
        centered: true
      }
    ],
    profiles: profiles
  }),

  methods: {
    async loadUsers () {
      const users = await this.$axios.$get('/api/users')
      this.users = users
    },

    async createUser (user, confirmPassword) {
      if (user.password === confirmPassword) {
        user.profile = [this.profiles.valuer.id]
        await this.$axios.$post('api/users', user)
          .then(this.handleCreateSuccess)
          .catch(this.handleCreateFail)
      }
      this.loadUsers()
      this.closeUserRegisterModal()
    },

    handleCreateSuccess () {
      this.$toast.open({
        message: 'Avaliador criado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },

    handleCreateFail () {
      this.$toast.open({
        message: 'Falha ao criar avaliador. Cheque os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async updateUser () {
      const {id} = this.selected
      const user = {
        username: this.selected.username,
        email: this.selected.email
      }

      await this.$axios.$put(`api/users/${id}`, user)
        .then(this.handleEditSuccess)
        .catch(this.handleEditFail)

      this.loadUsers()
    },

    handleEditSuccess () {
      this.$toast.open({
        message: 'Usuário atualizado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },

    handleEditFail () {
      this.$toast.open({
        message: 'Falha ao atualizar usuário. Cheque os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async deleteUser () {
      const {id} = this.selected

      await this.$axios.$delete(`api/users/${id}`)
        .then(this.handleDeleteSuccess)
        .catch(this.handleDeleteFail)

      this.loadUsers()
    },

    handleDeleteSuccess () {
      this.$toast.open({
        message: 'Usuário deletado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.userDeletion = false
    },

    handleDeleteFail () {
      this.$toast.open({
        message: 'Falha ao deletar usuário. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    closeUserRegisterModal () {
      this.creation = false
    },

    closeUserEditorModal () {
      this.edition = false
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 30px;
}
.button {
  padding: 5px;
  display: inline-flex
}
</style>
