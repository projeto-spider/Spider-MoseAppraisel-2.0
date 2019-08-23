<template>
  <div>
      <b-card bg-variant="white" text-variant="dark" title="Item 1">
  <b-card-text>
    O plano de melhoria está correto e completo?
  </b-card-text>
  <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation1">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

              </b-select>
            </b-field>

            <b-field label="Ação">
              <b-input maxlength="1000" type="textarea" v-model="audit.action1"></b-input>
            </b-field>
            <button class="button" @click="addAudit1()">Confirmar</button>
           </section>



        <div v-if="editing">
          <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation1">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

            <b-field label="Problemas encontrados">
              <b-input maxlength="1000" type="textarea" v-model="audit.action1"></b-input>
            </b-field>
          </section>
        </div>
</b-card>

<b-card bg-variant="white" text-variant="dark" title="Item 2">
  <b-card-text>
    O mapa de calor está correto e completo?
  </b-card-text>
  <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation2">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

            <b-field label="Ação">
              <b-input maxlength="1000" type="textarea" v-model="audit.action2"></b-input>
            </b-field>
            <button class="button" @click="addAudit2(audit)">Confirmar</button>
           </section>


        <div v-if="editing">
          <section>
            <b-field label="Resultado">
              <b-select
                placeholder="Selecione uma cor"
                v-model="audit.situation2"
              >

              </b-select>
            </b-field>

            <b-field label="Problemas encontrados">
              <b-input maxlength="1000" type="textarea" v-model="audit.action2"></b-input>
            </b-field>
          </section>
          <button class="button" @click="updateEvaluation(objective.id, evaluation)">Atualizar</button>
          <button class="button" @click="closeEdition">Cancelar</button>
        </div>
</b-card>

<b-card bg-variant="white" text-variant="dark" title="Item 3">
  <b-card-text>
    O resultado da avaliação está correto e completo?
  </b-card-text>
  <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation3">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

            <b-field label="Ação">
              <b-input maxlength="1000" type="textarea" v-model="audit.action3"></b-input>
            </b-field>
            <button class="button" @click="addAudit3(audit)">Confirmar</button>
           </section>


        <div v-if="editing">
          <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation3">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

            <b-field label="Problemas encontrados">
              <b-input maxlength="1000" type="textarea" v-model="audit.action3"></b-input>
            </b-field>
          </section>
          <button class="button" @click="updateEvaluation(objective.id, evaluation)">Atualizar</button>
          <button class="button" @click="closeEdition">Cancelar</button>
        </div>
</b-card>

<b-card bg-variant="white" text-variant="dark" title="Item 4">
  <b-card-text>
    O acordo de confidencialidade foi assinado por todos os envolvidos?
  </b-card-text>
  <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation4">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

            <b-field label="Ação">
              <b-input maxlength="1000" type="textarea" v-model="audit.action4"></b-input>
            </b-field>
            <button class="button" @click="addAudit4(audit)">Confirmar</button>

           </section>


        <div v-if="editing">
          <section>
            <b-field label="Informe a situação do item">
            <b-select placeholder="Informe a situação do item"
                v-model="audit.situation4">
                <option value="Conforme">Conforme</option>
                <option value="Não Conforme">Não Conforme</option>
                <option value="Não se aplica">Não se aplica</option>
            </b-select>
            </b-field>

            <b-field label="Problemas encontrados">
              <b-input maxlength="1000" type="textarea" v-model="audit.action4"></b-input>
            </b-field>
          </section>
          <button class="button" @click="updateEvaluation(objective.id, evaluation)">Atualizar</button>
          <button class="button" @click="closeEdition">Cancelar</button>
        </div>
</b-card>

  </div>
</template>

<script>


export default {


    data: () => ({

    audit: {
      status: 'Vigente',
      item1: 'item1',
      situation1: '',
      action1: '',
      item2: 'item2',
      situation2: '',
      action2: '',
      item3: 'item3',
      situation3: '',
      action3: '',
      item4: 'item4',
      situation4: '',
      action4: ''
    }
  }),




  methods: {

    async addAudit1 () {
    audit.auditId = this.$route.params.id

    await this.$axios.$post('/api/audits/', audit)
    alert('Salvo com sucesso')
    },

    async addAudit2 (audit) {
      const data = {
        auditId: this.$route.params.id
      }
      const situation2 = await this.$axios.$post('/api/audit/', audit)
      const action2 = await this.$axios.$post('/api/audit/', audit)

      this.situation2 = situation2
      this.action2 = action2
      alert('Salvo com sucesso')
    },

    async addAudit3 (audit) {
      const data = {
        auditId: this.$route.params.id
      }
      const situation3 = await this.$axios.$post('/api/audit/', audit)
      const action3 = await this.$axios.$post('/api/audit/', audit)

      this.situation3 = situation3
      this.action3 = action3
      alert('Salvo com sucesso')
    },

    async addAudit4 (audit) {
      const data = {
        auditId: this.$route.params.id
      }
      const situation4 = await this.$axios.$post('/api/audit/', audit)
      const action4 = await this.$axios.$post('/api/audit/', audit)

      this.situation4 = situation4
      this.action4 = action4
      alert('Salvo com sucesso')
    },

    editAudit1 () {
      this.audit.situation1 = this.situation1.audit
      this.audit.action1 = this.action1.audit

      this.editing = true
    },

    editAudit2 () {
      this.audit.situation2 = this.situation2.audit
      this.audit.action2 = this.action2.audit

      this.editing = true
    },

    editAudit3 () {
      this.audit.situation3 = this.situation3.audit
      this.audit.action3 = this.action3.audit

      this.editing = true
    },

    editAudit4 () {
      this.audit.situation4 = this.situation4.audit
      this.audit.action4 = this.action4.audit

      this.editing = true
    },

    async updateAudit (audit) {
      const id = this.situation1.id

      await this.$axios.$put(`/api/audit/${id}`, audit)

    },


  }
}
</script>

<style scoped>
.margin-layout {
  margin: 0px 700px 0px 0px
}
</style>
