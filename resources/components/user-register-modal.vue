<template>
  <div>
    <b-modal :active.sync="activate" @close="onClose">
      <form @submit.prevent="createUser(user, confirmPassword)">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Cadastro de {{profile.name}}</p>
            </header>
            <section class="modal-card-body">
              <b-field label="Papel">
                <b-dropdown disabled>
                  <button class="button" slot="trigger">
                      <span>{{profile.name}}</span>
                      <b-icon icon="menu-down"></b-icon>
                  </button>
                </b-dropdown>
              </b-field>
              <b-field label="Usuário">
                <b-input
                    v-model="user.username"
                    placeholder="Nome de usuário"
                    required>
                </b-input>
              </b-field>

              <b-field label="Email">
                <b-input
                    type="email"
                    v-model="user.email"
                    placeholder="Email do usuário"
                    required>
                </b-input>
              </b-field>

              <b-field label="Senha">
                <b-input
                    type="password"
                    v-model="user.password"
                    password-reveal
                    placeholder="Senha do usuário"
                    required>
                </b-input>
              </b-field>

              <b-field label="Confirmação de senha">
                <b-input
                    type="password"
                    v-model="confirmPassword"
                    password-reveal
                    placeholder="Confirmação de senha"
                    required>
                </b-input>
              </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="closeModal">Cancelar</button>
                <button class="button is-primary" type="submit">Cadastrar</button>
            </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    activate: {
      type: Boolean,
      default: false
    },

    profile: {
      type: Object,
      default: {}
    },

    createUser: {
      type: Function,
      default: () => ({})
    },

    onClose: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({
    user: {
      username: '',
      email: '',
      password: ''
    },
    confirmPassword: ''
  }),

  methods: {
    closeModal () {
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
      this.confirmPassword = ''
      this.onClose()
    }
  }
}
</script>

<style scoped>
.button {
  padding: 5px;
  display: inline-flex
}
</style>
