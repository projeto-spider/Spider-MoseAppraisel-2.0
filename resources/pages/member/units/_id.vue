<template>  
  <div>
    <unitViewer
      :profile="5"
      :unit="unit"
    >
    </unitViewer>

    <b-tabs position="is-centered">
      <b-tab-item label="Avaliações">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Avaliações
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <div v-if="selected.evaluation">
                  <div v-if="choosed.evaluation.status === 'Vigente'">
                    <a class="button" @click="openTerm = true">Acordo de confidencialidade</a>
                  </div>
                  <div v-else>
                    <button class="button" @click="chargeImprovement">Plano de melhoria</button>
                    <button class="button" @click="chargeMap">Mapa de calor</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div v-if="unit.evaluations.length === 0">
          Ainda não existem avaliações.
        </div>
        <div v-else>
          <b-table
            @click="selected.evaluation = true"
            :data="evaluations"
            :columns="columns.evaluation"
            :selected.sync="choosed.evaluation"
            focusable
          ></b-table>
        </div>
      </b-tab-item>

      <b-tab-item label="Membros">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Membros
            </div>
          </div>
        </nav>
        <div v-if="memberList.length === 0">
          Ainda não existem membros.
        </div>
        <div v-else>
          <b-table
            :data="memberList"
            :columns="columns.member"
          ></b-table>
        </div>
      </b-tab-item>

      <b-tab-item label="Fontes de evidência">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Fonte de evidência
            </div>
          </div>
        </nav>
        <div v-if="evidencesFont.length === 0">
          Ainda não existem fontes de evidências.
        </div>
        <div v-else>
          <b-table
            :data="evidencesFont"
            :columns="columns.evidenceFont"
          ></b-table>
        </div>
      </b-tab-item>
    </b-tabs>

    <section>
      <div v-if="openTerm">
        <confidentialityTerm
          :activate="!!openTerm"
          :unit="unit"
          :evaluation="choosed.evaluation"
          :sponsor="sponsor"
          :responsible="unit.responsible"
          :valuer="unit.valuer"
          :confirm-term="confimMemberTerm"
          :on-close="closeTermModal"
        ></confidentialityTerm>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import unitViewer from '~/components/unit-viewer.vue'
import confidentialityTerm from '~/components/confidentiality-term.vue'

export default {
  name: 'member-unit',

  components: { unitViewer, confidentialityTerm },

  computed: {
    ...mapGetters(['loggedUser'])
  },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      unit: {},
      evaluations: [],
      memberList: [],
      evidencesFont: [],
      sponsor: {},
      openTerm: false,
      selected: {
        evaluation: false,
      },
      choosed: {
        evaluation: {}
      },
      columns: {
        evaluation: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'type',
            label: 'Tipo',
            centered: true
          },
          {
            field: 'status',
            label: 'Status',
            centered: true
          },
          {
            field: 'contractor',
            label: 'Contratante',
            centered: true
          },
          {
            field: 'valuer.username',
            label: 'Avaliador',
            centered: true
          },
          {
            field: 'responsible.username',
            label: 'Responsável',
            centered: true
          },
          {
            field: 'partner',
            label: 'Parceiro',
            centered: true
          },
          {
            field: 'startDate',
            label: 'Date de início',
            centered: true
          },
          {
            field: 'endDate',
            label: 'Data de finalização',
            centered: true
          }
        ],

        evidenceFont: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'role',
            label: 'Papel',
            centered: true
          },
          {
            field: 'skills',
            label: 'Habilidades',
            centered: true
          }
        ],
        member:[
          {
            field: 'member.id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'member.username',
            label: 'Nome de usuário',
            centered: true
          },
          {
            field: 'member.email',
            label: 'Email',
            centered: true
          }
        ]
      }
    }

    const unit = await app.$axios.$get(`api/units/${id}`)
    Object.assign(data.unit, unit)

    const evaluations = await app.$axios.$get(`api/per-unit/${id}`)
    for (var i = 0; i < evaluations.length; i++) {
      evaluations[i].startDate = new Date(evaluations[i].startDate).toLocaleDateString()
      if (evaluations[i].endDate) {
        evaluations[i].endDate = new Date(evaluations[i].endDate).toLocaleDateString()
      }
    }

    data.evaluations = evaluations

    const sponsor = await app.$axios.$get(`/api/users/${unit.achievement.sponsorId}`)
    Object.assign(data.sponsor, sponsor)

    const evidencesFont = await app.$axios.$get(`api/evidence-unit/${id}`)
    data.evidencesFont = evidencesFont

    const members = await app.$axios.$get(`api/unit-id/${id}`)
    data.memberList = members

    return data
  },

  methods: {
    chargeImprovement () {
      this.$router.push({path: `/improvement/${this.choosed.evaluation.id}`})
    },

    chargeMap () {
      this.$router.push({path: `/improvement/${this.choosed.evaluation.id}/map`})
    },

    closeTermModal () {
      this.openTerm = false
    },

    async confimMemberTerm () {
      const members = await this.$axios.$get(`api/get-members/${this.choosed.evaluation.id}`)

      var result = members.find(obj => {
        return obj.memberId === this.loggedUser.id
      })

      const data = {
        memberConfirmation: true
      }

      await this.$axios.$post(`api/member-confirm/${result.id}`, data)
        .then(this.handleConfirmSuccess)
        .cath(this.handleConfirmFail)
    },

    handleConfirmSuccess () {
      this.$toast.open({
        message: 'Acordo assinado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.openTerm = false
      this.loadEvaluations()
    },

    handleConfirmFail () {
      this.$toast.open({
        message: 'Falha ao assinar acordo. Verifique sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style>
  
</style>
