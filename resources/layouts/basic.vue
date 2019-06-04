<template>
  <div>
    <nav class="navbar is-mose">
      <!-- navbar brand, navbar menu... -->
      <div class="navbar-start">
        <a class="navbar-item">
          MOSE
        </a>
      </div>
      
      <div class="navbar-end">
        <div class="navbar-item">
          <p>Olá, {{ loggedUser.username }}</p>
        </div>
        <div class="navbar-item">
          <p class="button is-danger" @click="logout">
            <span class="icon">
              <i class="fa fa-sign-out"></i>
            </span>
            <span>logout</span>
          </p>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-one-fifth">
        <sideBar></sideBar>
      </div>

      <nuxt class="column" />
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Universidade Federal do Pará &nbsp;·&nbsp;
          Graduação em Ciência da Computação &nbsp;·&nbsp;
          Faculdade de Computação &nbsp;·&nbsp;
          Projeto Spider
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logoMose from '~/assets/img/mose-logo.png'
import sideBar from '~/components/side-bar.vue'

export default {
  components: { sideBar },

  computed: {
    ...mapGetters(['loggedUser'])
  },

  data: () => ({
    logoMose
  }),

  methods: {
    async logout () {
      await this.$store.dispatch('logout')   
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
.moseLogo {
  max-width: 40px
}
</style>
