<template>
  <div :class="computedClasses">
  </div>
</template>

<script>
export default {
  /* 
    This component recieves a color as a string.
    And convert it to CSS color hexadecimal definition.
  */
  props: ['color'],

  computed: {
    computedClasses () {
      return {
        box: true,
        blue: this.color === 'Azul',
        green: this.color === 'Verde',
        yellow: this.color === 'Amarelo',
        orange: this.color === 'Laranja',
        red: this.color === 'Vermelho',
        gray: this.color === 'Cinza'
      }
    }
  }
}
</script>

<style scoped>
.blue {
  background-color: #91eafe;
}

.green {
  background-color: #36ff2f;
}

.yellow {
  background-color: #ffdb00;
}

.orange {
  background-color: #ed8b00;
}

.red {
  background-color: #d41d1d;
}

.gray {
  background-color: #2b2b2b;
}
</style>