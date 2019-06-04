<template>
  <div>
    <b-collapse class="card" :open="false" >
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title" @click="chargeEvidences(objective.id)">
          {{objective.id}} - {{objective.description}}
        </p>
        <a @click="chargeEvidences(objective.id)" class="card-header-icon">
          <b-icon
            :icon="props.open ? 'menu-up' : 'menu-down'">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <section>
          <div v-for="(evidence, i) in evidences" :key="evidence.id">
            <p>link para a evidência {{i}}: 
              <a :href="evidence.url" target="blank">{{evidence.url}}</a> 
            </p>
            <p>Membro fornecedor: <strong>{{evidence.member.username}}</strong></p>
            <p>Papel do membro: <strong>{{evidence.evidenceFont.role}}</strong></p>
            <button class="button is-small" @click="deleteEvidence(evidence)">deletar</button>
          </div>
          </br>
          <a class="button is-small" @click="setPractice(objective.id)">Adicionar evidências</a>
        </section>
      </div>
    </b-collapse>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    objective: {
      type: Object,
      required: true
    },

    setPractice: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({
    evidences: []
  }),

  methods: {
    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      this.evidences = evidences
    },

    async deleteEvidence (evidence) {
      const practice = evidence.practice

      await this.$axios.$delete(`/api/evidences/${evidence.id}`)

      this.chargeEvidences(practice)
    }
  }
}
</script>

<style>
  
</style>
