<template>
  <div id="content">
    <section class="hero">
      <div class="hero-body">
        <h1 v-if="evaluation !== null" class="title">
          Relatório do Plano de melhoria da unidade de negócio {{evaluation.unit.name}}
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
          <h3 class="title"> Talento Humano
           </h3>

            <div v-for="objective in objectives.TH" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>


          <h3 class="title"> Gestão e Qualidade
          </h3>

            <div v-for="objective in objectives.GQ" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>


          <h3 class="title"> Cliente e Mercado
          </h3>

            <div v-for="objective in objectives.CM" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>


          <h3 class="title"> Inovação
          </h3>

            <div v-for="objective in objectives.IN" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>


          <h3 class="title"> Sociedade e sustentabilidade
          </h3>

            <div v-for="objective in objectives.SO" :key="objective.id">
              <improvementItem
                :objective="objective"
                :team="team"
              ></improvementItem>
            </div>

        </b-tabs>
        <br/>

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
              <button class="button is-primary" type="button" @click="finalizePlan">Finalizar</button>
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
import objectives from '~/static/competence-objectives.json'
import competences from '~/static/competences.json'
import improvementItem from '~/components/improvement-item-result.vue'

export default {
  name: 'improvement',

  layout: 'basic',

  components: { improvementItem },

  async created () {
    this.chargeMembers()
  },

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
    },

    filteredMemberObj () {
      return this.members.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      competences: competences,
      evidences: [],
      result: [],
      plan: {
        solution: '',
        solutionDate: new Date(),
        status: 'novo'
      },
      membersId: [],
      team: [],
      members: [],
      unit: {},
      sponsor: {},
      evaluation: {},
      finalize: false
    }

    const evaluation = await app.$axios.$get(`/api/evaluations/${id}`)
    Object.assign(data.evaluation, evaluation)

    const unitId = evaluation.unitId
    const unit = await app.$axios.$get(`/api/units/${unitId}`)
    Object.assign(data.unit, unit)

    data.membersId = unit.members

    const team = await app.$axios.$get(`/api/unit-id/${unitId}`)
    data.team = team

    const sponsor = await app.$axios.$get(`/api/users/${unit.achievement.sponsorId}`)
    Object.assign(data.sponsor, sponsor)

    return data
  },

  methods: {
    async chargeMembers () {
      this.members = []
      for (var i = 0; i < this.team.length; i++) {
        var user = this.team[i].member
        this.members.push(user)
      }
      this.members.push(this.sponsor)
      this.members.push(this.unit.responsible)
    },

    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      const result = await this.$axios.$post('/api/res-practice/', data)

      this.evidences = evidences
      this.result = result
    },

    chargeMap () {
      this.$router.push({path: `/improvement/${this.evaluation.id}/map`})
    },

    async finalizePlan () {
      const data = {
        planFinal: true
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
            document.getElementById('cmd').style.display = 'none';
        });
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
