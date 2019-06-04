<template>
  <div>
    <b-modal :active.sync="activate" @close="onClose">
      <form @submit.prevent="createEvidence(evidenceFont)">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Cadastro de evidência</p>
            </header>
            <section class="modal-card-body">
              <b-field label="Papel">
                <b-input
                    v-model="evidenceFont.role"
                    placeholder="Papel"
                    required>
                </b-input>
              </b-field>

              <b-field label="Habilidades">
                <b-input
                    type="textarea"
                    v-model="evidenceFont.skills"
                    placeholder="Habilidades"
                    required>
                </b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="onClose">Cancelar</button>
                <button class="button is-primary" type="submit">Cadastrar</button>
            </footer>
        </div>
      </form>
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

    createEvidence: {
      type: Function,
      default: () => ({})
    },

    onClose: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({
    evidenceFont: {
      role: '',
      skills: ''
    }
  })
}
</script>
