<template>
  <div>
    <!-- Achievement navbar options -->
    <nav class="navbar is-ligthBlue">
      <div class="navbar-start">
        <div class="navbar-item title">
          {{achievement.name}}
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <!-- Check the profiles table to understand the profile reference here -->
          <div v-if="profile === 2" class="buttons">
            <button class="button is-info" @click="editAchievement(achievement)">
              <span class="icon">
                <i class="fa fa-edit"></i>
              </span>
              <span>Editar</span>
            </button>
            <button class="button is-danger" @click="achievementDeletion = true">
              <span class="icon">
                <i class="fa fa-trash"></i>
              </span>
              <span>Deletar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <nav class="level">
      <div class="level-item has-text-centered column is-2">
        <p class="heading">Patrocinador</p>
        <div v-if="achievement.sponsor">
          <p>
            {{achievement.sponsor.username}}
          </p>
          <div <div v-if="profile === 2">
            <a class="button is-small is-info is-outlined" @click="openSponsorUpdate">editar</a>
            <a class="button is-small is-danger is-outlined" @click="disassociateSponsor">desassociar</a>
          </div>
        </div>
        <div v-else>
          <p>
            O Empreendimento não possui patrocinador.
            <a @click="openSponsorRegister">Clique aqui para cadastra-lo</a> 
            ou 
            <a @click="openSponsorUpdate"> aqui </a> para consultar na lista de usuário já cadastrados.
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">CNPJ</p>
          <p>{{achievement.cnpj}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Telefone</p>
          <p>{{achievement.phone}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Endereço</p>
          <p>{{achievement.adress}}</p>
        </div>
      </div>
    </nav>
    <section>
      <b-modal :active.sync="achievementDeletion">
        <form action="">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Essa ação não pode ser desfeita. Deseja continuar?</p>
            </header>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="achievementDeletion = false">Cancelar</button>
                <button class="button is-primary" type="button" @click="deleteAchievement">Deletar</button>
            </footer>
          </div>
        </form>
      </b-modal>
    </section>
  </div>
</template>

<script>
export default {
  /*
    All this props comes from the father component.
    To understand this, check Vue's documentation.
  */
  props: {
    profile: {
      type: Number,
      required: true
    },

    achievement: {
      type: Object,
      default: {}
    },

    editAchievement: {
      type: Function,
      default: () => ({})
    },

    deleteAchievement: {
      type: Function,
      default: () => ({})
    },

    openSponsorRegister: {
      type: Function,
      default: () => ({})
    },

    openSponsorUpdate: {
      type: Function,
      default: () => ({})
    },

    disassociateSponsor: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({
    // Used to define modal's state.
    achievementDeletion: false
  })
}
</script>
