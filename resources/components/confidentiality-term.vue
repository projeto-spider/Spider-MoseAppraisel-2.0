<template>
  <div>
    <b-modal :active.sync="activate" @close="onClose"> 
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Acordo de confidencialidade</p>
            </header>
            <section class="modal-card-body">
              <p>
                A  unidade de negócio {{unit.name}} está executando
                uma avaliação de contexto segundo o método de avaliação MOSE SM ®.
                Com o intuito dar maior liberdade aos entrevistados e de preservar o
                negócio do empreendimento avaliado será acordado:
              </p>
              <p>
                1. Todas as informações registradas durante a avaliação, tais como
                questionários, discussões, entrevistas serão tratados pelo líder da avaliação e
                pela equipe de avaliação (se houver) com confidencialidade e não serão
                reportados para outros que não pertençam a equipe de avaliação;
              </p>
              <p>
                2. Todos os participantes da avaliação (membros da equipe de avaliação,
                pessoas que forem entrevistadas e patrocinador) concordam de não discutir
                as informações compartilhadas com outras pessoas;
              </p>
              <p>
                3. Todos os resultados da avaliação (exemplo: Relatório de
                Inconsistências, Relatório de Achados, entre outros) serão documentados e
                apresentados sem atribuição a indivíduos específicos;
              </p>
              <p>
                4. Todos os resultados da avaliação são de propriedade do patrocinador
                e não pode ser compartilhados sem que seja autorizado por ele.
              </p>

                Nós abaixo assinados entendemos e concordamos com as cláusulas acima
                descritas.
              </p>

              <hr/>

              <div>
                Patrocinador: <strong>{{sponsor.username}}</strong>
                <span v-if="evaluation.sponsorConfirmation === true" class="icon">
                  <i class="fa fa-check"></i>
                </span>
              </div>

              <div>
                Responsável:  <strong>{{responsible.username}}</strong> 
                <span v-if="evaluation.responsibleConfirmation === true" class="icon">
                  <i class="fa fa-check"></i>
                </span>
              </div>

              <div>
                Avaliador: <strong>{{valuer.username}}</strong> 
                <span v-if="evaluation.valuerConfirmation === true" class="icon">
                  <i class="fa fa-check"></i>
                </span>
              </div>

              <br/>
              Membros:
              <div v-for="member in members">
                <strong>{{member.member.username}}</strong>
                <span v-if="member.memberConfirmation === true" class="icon">
                  <i class="fa fa-check"></i>
                </span>
              </div>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="onClose">Cancelar</button>
                <button class="button is-primary" @click="confirmTerm">Concordar</button>
            </footer>
        </div>
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

    unit: {
      type: Object,
      default: () => ({})
    },

    evaluation: {
      type: Object,
      default: () => ({})
    },

    onClose: {
      type: Function,
      default: () => ({})
    },

    sponsor: {
      type: Object,
      default: () => ({})
    },

    valuer: {
      type: Object,
      default: () => ({})
    },

    responsible: {
      type: Object,
      default: () => ({})
    },

    confirmTerm: {
      type: Function,
      default: () => ({})
    }
  },

  //To get members related with evaluation, we start the page with this function call.
  created () {
    this.loadMembers()
  },

  data: () => ({
    members: []
  }),

  methods: {
    async loadMembers () {
      const members = await this.$axios.$get(`api/get-members/${this.evaluation.id}`)
      this.members = members
    }
  }
}
</script>

<style>

</style>
