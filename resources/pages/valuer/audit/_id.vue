<template>
  <div>
    <button class="button" @click="loadAudit()">Carregar auditoria</button>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Avaliaçao de
        </h1>
        <h2 class="subtitle">
          <strong>Unidade de negócio:</strong>
        </h2>
      </div>
    </section>
    <div class="columns margin-layout">
      <div class="column">
        <b-tabs position="is-centered">
          <b-tab-item label="Itens da Auditoria">

            <div v-for="(objective, i) in objectives.TH" :key="objective.id">
              <objectiveItem
                :objective="objective"
              ></objectiveItem>
            </div>
          </b-tab-item>


        </b-tabs>
        </br>
        <button class="button" @click="finalizeAudit">Finalizar auditoria</button>
      </div>
    </div>
    <section>
      <b-modal :active.sync="finalize">
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">Essa ação não pode ser desfeita. Deseja continuar?</p>
          </header>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="finalize = false">Cancelar</button>
              <button class="button is-primary" type="button" @click="finalizeAudit">Finalizar</button>
          </footer>
        </div>
      </form>
    </b-modal>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives-audit.json'
import competences from '~/static/competences.json'
import objectiveItem from '~/components/objective-item-audit'

export default {
  layout: 'basic',

  components: { objectiveItem },

  computed: {
    ...mapGetters(['loggedUser']),

    objectives () {
      return Object.values(objectives).reduce((acc, result) => {
        if (!acc[result.competence]) {
          acc[result.competence] = []
        }
        acc[result.competence].push(result)
        return acc
      }, {})
    }
  },

  data: () => ({

    audit: {},



  }),

  methods: {
    async loadAudit () {
      const audit = this.$route.params.id
      this.audit = audit
    },



    async finalizeAudit () {
      const data = {
        status: 'Finalizada',
        situation1: audit.situation1,
        action1: audit.action1,
        situation2: audit.situation2,
        action2: audit.action2,
        situation3: audit.situation3,
        action3: audit.action3,
        situation4: audit.situation4,
        action4: audit.action1,
      }

      await this.$axios.$put(`/api/evaluations/${this.id}`, data)
    }
  }
}
</script>

<style>
.margin-layout {
  margin: 15px;
}
</style>

<style>
.button {
  padding: 4px;
  display: inline-flex
}
</style>
