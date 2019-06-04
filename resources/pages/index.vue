<template>
  <div class="column is-4 is-offset-4">
    <div class="box">
      <form @submit.prevent="login">
        <section>
          <b-field>
            <b-input
              type="email"
              placeholder="Email"
              v-model="email"
              required
            >
            </b-input>
          </b-field>

          <b-field>
              <b-input
                type="password"
                password-reveal
                placeholder="Senha"
                v-model="password"
                required
              >
              </b-input>
          </b-field>
        </section>
        <br/>
        <a class="button is-info" type="submit" @click="login">Entrar</a>
      </form>
    </div>
      <p class="has-text-white">
        <a href="../">Recuperar a senha</a> &nbsp;·&nbsp;
        <a href="../">Precisa de ajuda?</a>
      </p>
  </div>
</template>

<script>
export default {
  name: 'Login',

  layout: 'auth',

  data: () => ({
    email: '',
    password: ''
  }),

  //Used to capture the last email used to log on MOSE tool.
  mounted () {
    this.email = localStorage.getItem('lastEmail') || ''
  },

  methods: {
    async login () {
      const { email, password } = this
      this.$store.dispatch('login', { email, password })
        .then(this.handleSuccess)
        .catch(this.handleFail)
    },

    handleSuccess () {
      localStorage.setItem('lastEmail', this.email)

      this.$toast.open({
        message: 'Login realizado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      //This else if structure is used to set the profile that is acessing the tool.
      if (this.$store.getters.profiles) {
        this.$router.push({path: '/chooser', success: true})
      } else if (this.$store.getters.isAdmin) {
        this.$store.commit('SET_PROFILE', 1)
        this.$router.push({path: '/admin/users', success: true})
      } else if (this.$store.getters.isValuer) {
        this.$store.commit('SET_PROFILE', 2)
        this.$router.push({path: '/valuer/achievements', success: true})
      } else if (this.$store.getters.isSponsor) {
        this.$store.commit('SET_PROFILE', 3)
        this.$router.push({path: '/sponsor/achievements', success: true})
      } else if (this.$store.getters.isResponsible) {
        this.$store.commit('SET_PROFILE', 4)
        this.$router.push({path: '/responsible/achievements', success: true})
      } else if (this.$store.getters.isMember) {
        this.$store.commit('SET_PROFILE', 5)
        this.$router.push({path: '/member/units', success: true})
      }
    },

    handleFail (response) {
      this.$toast.open({
        message: 'Falha ao entrar. Email ou senha incorretos.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
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
