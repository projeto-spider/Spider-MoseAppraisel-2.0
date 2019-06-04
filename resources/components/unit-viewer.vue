<template>
  <div>
    <nav class="navbar is-ligthBlue">
      <div class="navbar-start">
        <div class="navbar-item title">
          {{unit.name}}
        </div>
      </div>

      <div v-if="profile === 3" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-warning" @click="editUnit">Editar</button>
            <button class="button is-danger" @click="deleteUnit">Deletar</button>
          </div>
        </div>
      </div>
    </nav>

    <nav class="level">
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Responsável atual</p>
          <div v-if="unit.responsible">
            <p>
              {{unit.responsible.username}}
            </p>
            <div <div v-if="profile === 3">
              <a class="button is-small" @click="openResponsibleUpdate">editar</a>
              <a class="button is-small" @click="disassociateResponsible">deletar</a>
            </div>
          </div>
          <div v-else>
            <p>
              O Unidade não possui um responsável.
              <a 
                v-if="profile === 3" 
                @click="openResponsibleCreator"
              >Clique aqui para cadastra-lo</a> ou
              <a 
                v-if="profile === 3" 
                @click="openResponsibleUpdate"
              >aqui</a> para selecionar um usuário já cadastrado.
            </p>
          </div>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">descrição</p>
          <p>{{unit.description}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Telefone</p>
          <p>{{unit.phone}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Número de membros</p>
          <p>{{unit.people_number}}</p>
        </div>
      </div>
      <div v-if="profile === 5" class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Empreendimento</p>
          <p>{{unit.achievement.name}}</p>
        </div>
      </div>
    </nav>
    <br/>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Number,
      required: true
    },

    unit: {
      type: Object,
      default: {}
    },

    editUnit: {
      type: Function,
      default: () => ({})
    },

    deleteUnit: {
      type: Function,
      default: () => ({})
    },

    openResponsibleCreator: {
      type: Function,
      default: () => ({})
    },

    openResponsibleUpdate: {
      type: Function,
      default: () => ({})
    },

    disassociateResponsible: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>
