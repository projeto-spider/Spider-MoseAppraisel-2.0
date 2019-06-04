<template>
  <div>
    <unitViewer
      :profile="4"
      :unit="unit"
    >
    </unitViewer>

    <div class="columns">
      <div class="column is-2">
        <a class="button is-info" @click="openUserModal = true">cadastrar membro</a>
        <p>Ou procure um usuário já cadastrado <a @click="memberSearch = true">aqui</a></p>  
      </div>
      <div class="column">
        <a class="button is-info" @click="EvidenceFontModal">cadastrar fonte de evidência</a>
      </div>
    </div>

    <b-tabs position="is-centered">
      <b-tab-item @click="chargeEvaluations" label="Avaliações">
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
                  <div v-if="!choosed.evaluation.colorFinal && choosed.evaluation.status != 'Finalizada'">
                    <nuxt-link class="button" :to="`/responsible/evidences/${choosed.evaluation.id}`">
                      Adicinionar evidências
                    </nuxt-link>
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

      <b-tab-item @click="chargeMembers" label="Membros">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Membros
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <div v-if="selected.member">
                  <button class="button is-warning" @click="openUserEditionModal">Editar</button>
                  <button class="button is-danger" @click="">Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div v-if="memberList.length === 0">
          Ainda não existem membros.
        </div>
        <div v-else>
          <b-table
            @click="selected.member = true"
            :data="memberList"
            :columns="columns.member"
            :selected.sync="choosed.member"
            focusable
          ></b-table>
        </div>
      </b-tab-item>

      <b-tab-item @click="chargeEvidences" label="Fontes de evidência">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Fonte de evidência
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <div v-if="selected.evidenceFont">
                  <button class="button is-warning" @click="openEditionEvidenceModal">Editar</button>
                  <button class="button is-danger" @click="deleteEvidence">Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div v-if="evidencesFont.length === 0">
          Ainda não existem fontes de evidências.
        </div>
        <div v-else>
          <b-table
            @click="selected.evidenceFont = true"
            :data="evidencesFont"
            :columns="columns.evidenceFont"
            :selected.sync="choosed.evidenceFont"
            focusable
          ></b-table>
        </div>
      </b-tab-item>
    </b-tabs>

    <!-- Modals -->
    <section>
      <div v-if="openUserModal">
        <userRegister
          :activate="!!openUserModal"
          :profile="profiles.team"
          :create-user="(user, confirmPassword) => submitUser(user, confirmPassword)"
          :on-close="closeUserModal"
        >
        </userRegister>
      </div>

      <div v-if="openEvidenceFontModal">
        <evidenceFontModal
          :activate="!!openEvidenceFontModal"
          :create-evidence="(evidenceFont) => submitEvidenceFont(evidenceFont)"
          :on-close="closeEvidenceFontModal"
        >
        </evidenceFontModal>
      </div>

      <div v-if="editor.evidenceFont">
        <b-modal :active.sync="editor.evidenceFont">
          <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                  <p class="modal-card-title">Edição de fonte evidência</p>
              </header>
              <section class="modal-card-body">
                <b-field label="Papel">
                  <b-input
                      v-model="edited.evidenceFont.role"
                      placeholder="Papel"
                      required>
                  </b-input>
                </b-field>

                <b-field label="Habilidades">
                  <b-input
                      type="textarea"
                      v-model="edited.evidenceFont.skills"
                      placeholder="Habilidades"
                      required>
                  </b-input>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                  <button class="button" type="button" @click="editor.evidenceFont = false">Cancelar</button>
                  <button class="button is-primary" @click="updateEvidence">Atualizar</button>
              </footer>
          </div>
        </b-modal>
      </div>

      <div v-if="editor.user">
        <b-modal :active.sync="editor.user">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Edição de membro</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Usuário">
                  <b-input
                      v-model="edited.user.username"
                      placeholder="Nome de usuário"
                      required>
                  </b-input>
                </b-field>

                <b-field label="Email">
                  <b-input
                      type="email"
                      v-model="edited.user.email"
                      placeholder="Email do usuário"
                      required>
                  </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="editor.user = false">Cancelar</button>
                <button class="button is-primary" @click="updateUser">Atualizar</button>
            </footer>
          </div>
        </b-modal>
      </div>

      <div v-if="memberSearch">
        <b-modal :active.sync="memberSearch">
          <form>
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Busca de membros</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome de  usuário do membro">
                    <b-autocomplete
                      rounded
                      v-model="name"
                      :data="filteredUserObj"
                      placeholder="Insira o nome do novo membro"
                      icon="magnify"
                      field="username"
                      @select="option => newMember = option">
                    </b-autocomplete>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="memberSearch = false">Cancelar</button>
                    <button class="button is-primary" @click="addMember">Adicionar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="openTerm && isCurrentResposible">
        <confidentialityTerm
          :activate="!!openTerm"
          :unit="unit"
          :evaluation="choosed.evaluation"
          :on-close="closeTermModal"
          :sponsor="sponsor"
          :responsible="unit.responsible"
          :valuer="unit.valuer"
          :members="memberList"
          :confirm-term="confimResponsibleTerm"
        ></confidentialityTerm>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import profiles from '~/static/profiles.json'
import unitViewer from '~/components/unit-viewer.vue'
import userRegister from '~/components/user-register-modal.vue'
import evidenceFontModal from '~/components/evidence-font-modal.vue'
import confidentialityTerm from '~/components/confidentiality-term.vue'

export default {
  name: 'responsible-unit',

  layout: 'basic',

  components: { unitViewer, userRegister, evidenceFontModal, confidentialityTerm },

  async asyncData ({ app, params }) {
    const { id } = params

    const data = {
      id,
      profiles: profiles,
      unit: {},
      evaluations: [],
      users: [],
      sponsor: {},
      openUserModal: false,
      openEvidenceFontModal: false,
      evidencesFont: [],
      memberList: [],
      memberSearch: false,
      newMember: null,
      name: '',
      selected: {
        evaluation: false,
        evidenceFont: false,
        member: false
      },
      choosed: {
        evaluation: {},
        evidenceFont: {},
        member: {}
      },
      edited: {
        evidenceFont: {},
        user: {}
      },
      editor: {
        evidenceFont: false,
        user: false
      },
      openTerm: false,
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
        member: [
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

    const users = await app.$axios.$get('/api/users')
    data.users = users

    return data
  },

  computed: {
    ...mapGetters(['loggedUser']),

    isCurrentResposible () {
      return this.unit.responsibleId === this.loggedUser.id
    },

    filteredUserObj () {
      return this.users.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },

  methods: {
    EvidenceFontModal () {
      this.openEvidenceFontModal = true
    },

    chargeEvaluations () {
      this.selected.evidenceFont = false
      this.selected.member = false
      this.selected.evaluation = false
    },

    async chargeEvidences () {
      this.selected.evidenceFont = false
      this.selected.member = false
      this.selected.evaluation = false

      const evidencesFont = await this.$axios.$get(`api/evidence-unit/${this.id}`)
      this.evidencesFont = evidencesFont
    },

    async chargeMembers () {
      this.selected.evidenceFont = false
      this.selected.member = false
      this.selected.evaluation = false

      const members = await this.$axios.$get(`api/unit-id/${this.id}`)
      this.memberList = members
    },

    chargeImprovement () {
      this.$router.push({path: `/improvement/${this.choosed.evaluation.id}`})
    },

    chargeMap () {
      this.$router.push({path: `/improvement/${this.choosed.evaluation.id}/map`})
    },

    async submitUser (user, confirmPassword) {
      user.profiles = [profiles.team.id]

      if (user.password === confirmPassword) {
        const { id } = await this.$axios.$post('api/users', user)
        const updates = { members: [ id ] }

        await this.$axios.$put(`api/units/${this.id}`, updates)
          .then(this.handleUserRegisterSucess)
          .catch(this.handleUserRegisterFail)
      } else {
        this.$toast.open({
          message: 'As senhas não correspondem, tente novamente.',
          duration: 5000,
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      }
    },

    handleUserRegisterSucess () {
      this.$toast.open({
        message: 'Membro registrado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
      this.chargeMembers()
      this.closeUserModal()
    },

    handleUserRegisterFail () {
      this.$toast.open({
        message: 'Falha ao registrar usuário. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    closeUserModal () {
      this.openUserModal = false
    },

    openUserEditionModal () {
      Object.assign(this.edited.user, this.choosed.member.member)
      this.editor.user = true
    },

    async updateUser () {
      const {id} = this.choosed.member.member

      await this.$axios.$put(`api/users/${id}`, this.edited.user)
        .then(this.handleUserUpdaterSuccess)
        .catch(this.handleUserUpdaterFail)
    },

    handleUserUpdaterSuccess () {
      this.$toast.open({
        message: 'Membro atualizado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.editor.user = false
      this.edited.user = {}
      this.chargeMembers()
    },

    handleUserUpdaterFail () {
      this.$toast.open({
        message: 'Falha ao atualizar membro. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async submitEvidenceFont (evidenceFont) {
      evidenceFont.unitId = this.id
      await this.$axios.$post('api/evidences-font', evidenceFont)
        .then(this.handleEvidenceFontRegisterSucess)
        .catch(this.handleEvidenceFontRegisterFail)
    },

    handleEvidenceFontRegisterSucess () {
      this.$toast.open({
        message: 'Fonte de evidência registrada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.chargeEvidences()
      this.closeEvidenceFontModal()
    },

    handleEvidenceFontRegisterFail () {
      this.$toast.open({
        message: 'Falha ao registrar fonte de evidência. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    closeEvidenceFontModal () {
      this.openEvidenceFontModal = false
    },

    openEditionEvidenceModal () {
      Object.assign(this.edited.evidenceFont, this.choosed.evidenceFont)
      this.editor.evidenceFont = true
    },

    async updateEvidence () {
      const {id} = this.choosed.evidenceFont

      const evidence = {
        role: this.edited.evidenceFont.role,
        skills: this.edited.evidenceFont.skills
      }

      await this.$axios.$put(`api/evidences-font/${id}`, evidence)
        .then(this.handleEvidenceFontUpdaterSucess)
        .catch(this.handleEvidenceFontUpdaterFail)
    },

    handleEvidenceFontUpdaterSucess () {
      this.$toast.open({
        message: 'Fonte de evidência atualizada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.edited.evidenceFont = {}
      this.editor.evidenceFont = false
      this.chargeEvidences()
    },

    handleEvidenceFontUpdaterFail () {
      this.$toast.open({
        message: 'Falha ao atualizar fonte de evidência. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async deleteEvidence () {
      const { id } = this.choosed.evidenceFont

      await this.$axios.$delete(`api/evidences-font/${id}`)
        .then(this.handleEvidenceFontDeleteSucess)
        .catch(this.handleEvidenceFontDeleteFail)
    },

    handleEvidenceFontDeleteSucess () {
      this.$toast.open({
        message: 'Fonte de evidência apagada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
      this.choosed.evidenceFont = {}
      this.chargeEvidences()
    },

    handleEvidenceFontDeleteFail () {
      this.$toast.open({
        message: 'Falha ao apagar fonte de evidência. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    closeTermModal () {
      this.openTerm = false
    },

    async confimResponsibleTerm () {
      const data = {responsibleConfirmation: true}

      await this.$axios.$post(`api/responsible-confirm/${this.choosed.evaluation.id}`, data)
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

      this.$router.go()
      this.openTerm = false
    },

    handleConfirmFail () {
      this.$toast.open({
        message: 'Falha ao assinar acordo. Verifique sua conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    async addMember () {
      // user.profiles = [profiles.team.id]

      const { id } = this.newMember
      const updates = { members: [ id ] }

      await this.$axios.$put(`api/units/${this.id}`, updates)
        .then(this.handleUserAdd)
        .catch(this.handleUserAddFail)
    },

    handleUserAdd () {
      this.$toast.open({
        message: 'Novo membro adicionado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      this.openTerm = false
      this.loadEvaluations()
    },

    handleUserAddFail () {
      this.$toast.open({
        message: 'Falha ao adicionar membro. Verifique a conexão e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    }
  }
}
</script>
