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
          <div class="navbar-item">
            <p>Olá, {{ loggedUser.username }} </p>
          </div>
          <div class="navbar-item">
            <p class="button is-danger" @click="logout">
              logout
            </p>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-one-fifth">
        <aside class="menu">
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by3">
                <img :src="moseLogo" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="moseLogo" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{loggedUser.username}}</p>
                  <p class="subtitle is-6">@{{loggedUser.username}}</p>
                </div>
              </div>
            </div>
          </div>
          <ul class="menu-list gray">
            <li><nuxt-link to="/admin/users/"> Usuários </nuxt-link></li>
            <li><nuxt-link to="/admin/achievements/"> Empreendimentos </nuxt-link></li>
            <li><nuxt-link to="/admin/units/"> Unidades de negócio </nuxt-link></li>
             <li><nuxt-link to="/admin/evaluations/"> Avaliações </nuxt-link></li>
            <li></li>
          </ul>
        </aside>
      </div>

      <nuxt class="column"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moseLogo from '~/assets/img/mose-logo.png'

export default {
  computed: {
    ...mapGetters(['loggedUser'])
  },

  data: () => ({
    moseLogo
  }),

  methods: {
    async logout () {
      await this.$store.dispatch('logout')   
      this.$router.push({path: '/'})
    }
  }
}
</script>
