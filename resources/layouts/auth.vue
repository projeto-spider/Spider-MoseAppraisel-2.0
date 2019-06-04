<template>
  <div>
    <section class="hero is-mose is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="navbar-brand">
            <a class="navbar-item">
              Mose competence
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" href="https://github.com/projeto-spider" target="blank">
                Projeto spider
              </a>
              <a class="navbar-item" href="https://github.com/leochrisis/bronze-mose/" target="blank">
                Github
              </a>
              <a class="navbar-item">
                Sobre
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container is-fluid has-text-centered">
          <a href="http://www.mosecompetence.com/" target="blank">
            <img class="moseLogo" :src="moseLogo">
          </a>
          <nuxt/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moseLogo from '~/assets/img/mose-logo.png'

export default {
  data: () => ({
    moseLogo
  })
}
</script>

<style scoped>
.moseLogo {
  max-width: 128px
}
</style>
