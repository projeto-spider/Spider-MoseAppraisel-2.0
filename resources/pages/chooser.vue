<template>
  <div>
    <div>
      <section class="hero is-primary is-fullheight">
        <div class="hero-body">
          <div class="container is-fluid has-text-centered">
            <p>Entrar na ferramenta como:</p>
              <button
                v-for="profiles in loggedUser.profiles"
                class="button"
                @click="selectRoute(profiles.profile)"
              >
               {{profiles.profile}}
             </button>
            </br>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Chooser',

  computed: {
    ...mapGetters(['loggedUser'])
  },

  methods: {
    selectRoute (profile) {
      switch (profile) {
        case 'administrador':
          this.$store.commit('SET_PROFILE', 1)
          this.$router.push({path: '/admin/users', success: true})
          break
        case 'avaliador':
          this.$store.commit('SET_PROFILE', 2)
          this.$router.push({path: '/valuer/achievements', success: true})
          break
        case 'patrocinador':
          this.$store.commit('SET_PROFILE', 3)
          this.$router.push({path: '/sponsor/achievements', success: true})
          break
        case 'responsável':
          this.$store.commit('SET_PROFILE', 4)
          this.$router.push({path: '/responsible/achievements', success: true})
          break
        case 'time':
          this.$store.commit('SET_PROFILE', 5)
          this.$router.push({path: '/member/units', success: true})
      }
    }
  }
}
</script>

<style>
.button {
  padding: 5px;
  display: inline-flex;
  margin: 5px;
}
</style>
