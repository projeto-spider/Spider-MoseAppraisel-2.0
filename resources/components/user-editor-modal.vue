<template>
  <div>
    <b-modal :active.sync="edition" @close="onClose">
      <form action="">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">Edição de usuário</p>
          </header>
          <section class="modal-card-body">
              <b-field label="Usuário">
                <b-input
                    :value="user.username"
                    @input=""
                    placeholder="Nome de usuário"
                    required>
                </b-input>
              </b-field>

              <b-field label="Email">
                <b-input
                    type="email"
                    v-model="user.email"
                    placeholder="Email do usuário"
                    required>
                </b-input>
              </b-field>
          </section>
          <footer class="modal-card-foot">
              <button class="button" type="button" @click="edition = false">Cancelar</button>
              <button class="button is-primary" @click="updateUser">Atualizar</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['edition', 'user', 'onClose'],

  updateUsename (value) {
    this.$emit('input', value)
  }
}
</script>

<style>

</style>
