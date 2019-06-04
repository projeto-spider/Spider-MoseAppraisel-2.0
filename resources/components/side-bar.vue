<template>
  <div>
    <aside class="menu">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
            <div class="has-text-centered">
              <p class="title is-4">{{loggedUser.username}}</p>
              <p class="subtitle is-6">@{{loggedUser.username}}</p>
            </div>
        </div>
      </div>
      <br/>

      <ul v-if="!isMember" class="menu-list gray">
        <!-- valuer menu -->
        <a 
          v-if="loggedProfile === 2" 
          class="button is-mose has-text-centered" 
          @click="creation = true"
          >
          <span class="icon">
            <i class="fa fa-plus-circle"></i>
          </span>
            
          <span>Novo empreendimento</span>
          </a>
        <br/>
        <p class="menu-label">
          Empreendimentos:
        </p>
        <ul>
          <div v-for="achievement in achievements" :key="achievement.id">
            <li>
              <b-collapse :open="false">
                <div slot="trigger" slot-scope="props" class="card-header">
                  <nuxt-link
                    :to="`/valuer/achievements/${achievement.id}`"
                    v-if="loggedProfile === 2"
                    class="card-header-title">
                    <span class="icon">
                      <i class="fa fa-briefcase"></i>
                    </span>
                    <span>{{achievement.name}}</span>
                  </nuxt-link>

                  <!-- sponsor menu -->
                  <nuxt-link
                    :to="`/sponsor/achievements/${achievement.id}`"
                    v-if="loggedProfile === 3"
                    class="card-header-title">
                    <span class="icon">
                      <i class="fa fa-briefcase"></i>
                    </span>
                    <span>{{achievement.name}}</span>
                  </nuxt-link>

                  <!-- responsible menu -->
                  <nuxt-link
                    :to="`/responsible/achievements/${achievement.id}`"
                    v-if="loggedProfile === 4"
                    class="card-header-title">
                    {{achievement.name}}
                  </nuxt-link>
                  <a class="card-header-icon">
                    <b-icon
                      :icon="props.open ? 'menu-up' : 'menu-down'">
                    </b-icon>
                  </a>
                </div>

                <div class="card-content">
                  <div v-for="unit in achievement.units" :key="unit.id">
                    <nuxt-link :to="`/valuer/unit/${unit.id}`" v-if="loggedProfile === 2">
                      {{unit.name}}
                    </nuxt-link>
                    <nuxt-link :to="`/sponsor/unit/${unit.id}`" v-if="loggedProfile === 3">
                      {{unit.name}}
                    </nuxt-link>
                    <nuxt-link
                      :to="`/responsible/unit/${unit.id}`"
                      v-if="loggedProfile === 4 && unit.responsibleId === loggedUser.id"
                    >
                      {{unit.name}}
                    </nuxt-link>
                  </div>
                </div>
              </b-collapse>
            </li>
          </div>
        </ul>
      </ul>

      <!-- member menu -->
      <ul v-else>
        <p class="menu-label">
          Unidades de negócio:
        </p>

        <ul>
          <div v-for="element in teamElements" :key="teamElements.id">
            <li>
              <nuxt-link :to="`/member/units/${element.unit.id}`">
                {{element.unit.name}}
              </nuxt-link>
            </li>
          </div>
        </ul>
      </ul>
    </aside>

    <!-- modals -->
    <section>
      <div v-if="creation">
        <b-modal :active.sync="creation">
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de Empredimento</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="achievement.name"
                        placeholder="Nome do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="CNPJ">
                    <b-input
                        v-model="achievement.cnpj"
                        placeholder="CNPJ do empreendimento"
                        v-mask="'##.###.###/####-##'"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                      type="tel"
                      v-model="achievement.phone"
                      placeholder="Telefone do empreendimento"
                      v-mask="'(##) #####-####'"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Endereço">
                    <b-input
                      type="textarea"
                      v-model="achievement.adress"
                      placeholder="Endereço do empreendimento"
                      required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="closeCreationModal">Cancelar</button>
                    <button class="button is-primary" @click="createAchievement">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {mask} from 'vue-the-mask'

export default {
  directives: {mask},

  mounted () {
    this.loadAchievements()
  },

  /*watch: {
    achievements: function () {
      if (!this.isResponsible) {
        this.loadAchievements()
      }
    }
  },*/

  data: () => ({
    achievements: [],
    creation: false,
    achievement: {
      name: '',
      cnpj: '',
      phone: '',
      adress: ''
    },
    teamElements: []
  }),

  computed: {
    ...mapGetters(['loggedUser', 'loggedProfile']),

    isResponsible () {
      return this.loggedProfile === 4
    },

    isMember () {
      return this.loggedProfile === 5
    }
  },

  methods: {
    async loadAchievements () {
      if (!this.isMember) {
        const id = this.loggedUser.id
        //This if is exclusive to load information that just valuer has acess.
        if (this.loggedProfile === 2) {
          const achievements = await this.$axios.$get(`/api/valuer-achivements/${id}`)
          this.achievements = achievements

        //Here we load information just for sponsor
        } else if (this.loggedProfile === 3) {
          const id = this.loggedUser.id
          const achievements = await this.$axios.$get(`/api/sponsor-achivements/${id}`)
          this.achievements = achievements
          
        //Here we load information just for responsible
        } else if (this.loggedProfile === 4) {
          const id = this.loggedUser.id

          const units = await this.$axios.$get(`/api/responsible-units/${id}`)

          var ids = []

          for (var i = 0; i < units.length; i++) {
            if (!ids.includes(units[i].achievementId)) {
              ids.push(units[i].achievementId)
            }
          }

          for (var i = 0; i < ids.length; i++) {
            var achievementId = ids[i]
            var achievement = await this.$axios.$get(`/api/achievements/${achievementId}`)
            this.achievements.push(achievement)
          }
        }
      } else {
        const id = this.loggedUser.id
        var teamElements = await this.$axios.$get(`/api/user-team/${id}`)
        this.teamElements = teamElements
      }
    },

    async createAchievement () {
      const data = {
        name: this.achievement.name,
        cnpj: this.achievement.cnpj,
        phone: this.achievement.phone,
        adress: this.achievement.adress,
        valuerId: this.loggedUser.id
      }

      await this.$axios.$post('api/achievements', data)
        .then(this.handleCreateAchievementSuccess)
        .catch(this.handleCreateAchievementFail)
    },

    handleCreateAchievementSuccess () {
      this.$toast.open({
        message: 'Empreendimento criado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },

    handleCreateAchievementFail () {
      this.$toast.open({
        message: 'Falha ao criar empreendimento. Cheque sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    closeCreationModal () {
      this.achievement.name = ''
      this.achievement.cnpj = ''
      this.achievement.phone = ''
      this.achievement.adress = ''
      this.creation = false
    }
  }
}
</script>

<style>
.button {
  padding: 5px;
  display: inline-flex;
},

.menu{
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 500px;
}
</style>
