<template>
  <div id="content">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title" v-if="evaluation !== null">
          Relatório da Auditoria da avaliação de {{evaluation.type}} da unidade de negocio {{evaluation.unit.name}}, feita pelo(a)
          Avaliador(a) Sandro.
        </h1>
      </div>





<script type="text/javascript" src="js/jspdf/jspdf.plugin.addimage.js"></script>
<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>

    </section>
    <div id="editor"></div>
    <button class="button" id="cmd" @click="createPDF">Gerar PDF</button>

    <div class="columns margin-layout">
      <div class="column">
        <b-tabs position="is-centered">
          <h3 class="title"> Itens da Auditoria
           </h3>
            <div v-for="(objective, i) in objectives.AD" :key="objective.id">
              <objectiveItem
                :objective="objective"
              ></objectiveItem>
            </div>

        </b-tabs>
        </br>

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
              <button class="button is-primary" type="button" @click="finalizeEvaluation">Finalizar</button>
          </footer>
        </div>
      </form>
    </b-modal>
    </section>
  </div>
</template>

<script src=”//mrrio.github.io/jsPDF/dist/jspdf.debug.js”></script>
<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives-teste.json'
import competences from '~/static/competences-teste.json'
import objectiveItem from '~/components/objective-item-audit-result'
import jsPDF from 'jsPDF'

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

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      competences: competences,
      finalize: false,
      evaluation: {}
    }

    const evaluation = await app.$axios.$get(`/api/evaluations/${id}`)
    Object.assign(data.evaluation, evaluation)

    return data
  },

  methods: {
    async loadEvaluation () {
      const evaluation = await this.$axios.$get(`/api/evaluations/${this.id}`)
      this.evaluation = evaluation
    },

    async checkFinalize () {
      const results = await this.$axios.$get(`/api/evaluation-result/${this.id}`)

      if (results.length < 20) {
        this.$toast.open({
          message: 'Os objetios não foram avaliados por completo. Avalie todos e tente novamente.',
          duration: 5000,
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      } else {
        this.finalize = true
      }
    },


    async finalizeEvaluation () {
      const data = {
        colorFinal: true,
        status: 'Finalizada',
        endDate: new Date()
      }

      await this.$axios.$put(`/api/evaluations/${this.id}`, data)
      this.$router.push({path: `/valuer/unit/${this.evaluation.unitId}`, success: true})
    },

    createPDF(){
       var doc = new jsPDF();
        var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
        };

        $('#cmd').click(function () {
            doc.fromHTML($('#content').html(), 15, 15, {
                'width': 170,
                    'elementHandlers': specialElementHandlers
            });
            doc.save('sample-file.pdf');
        });
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
