<template>

  <div id="content">
    <section class="hero">

    </section>
    <button id="botao" class="button" @click="genpdf">Gerar Relatório </button>
    <br>
    <img src="~assets/img/certificaMose3.1.jpg">
    <h6 class="title" v-if="evaluation !== null">
          {{evaluation.unit.name}}
        </h6>

    <br>

    <h26 class="title" v-if="evaluation !== null">
          Achievement {{evaluation.unit.id}}
        </h26>

    <br>

    <h7 class="title" v-if="evaluation !== null">
          {{finalResult}} estrela(s)
    </h7>

    <br>
    <h9 class="title" v-if="evaluation !== null">
    <div v-if=" evaluation.type == 'Contexto'">
       bronze,
     </div>
    </h9>

    <br>
    <h10 class="title" v-if="evaluation !== null">
    <div v-if=" evaluation.type == 'Implementação'">
       prata,
     </div>
    </h10>

    <br>
    <h10 class="title" v-if="evaluation !== null">
    <div v-if=" evaluation.type == 'Institucionalização'">
       ouro,
     </div>
    </h10>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives.json'
import helpers from '~/static/helpers.json'
import colorConversor from '~/components/color-conversor.vue'
import colorGuide from '~/components/color-guide.vue'
import jsPDF from 'jsPDF'
import html2canvas from 'html2canvas'

export default {
  name: 'heat-map',

  layout: 'basic',

  components: { colorConversor, colorGuide },

  computed: {
    ...mapGetters(['loggedUser'])
  },

  async created () {
    const id = this.$route.params.id
    const evaluation = await this.$axios.$get(`/api/evaluations/${id}`)
    this.evaluation = evaluation

    const objectivesIds = Object.keys(objectives)

    var data = {
      evaluationId: evaluation.id
    }

    for (var i = 0; i < objectivesIds.length; i++) {
      data.practice = objectivesIds[i]
      var result = await this.$axios.$post('/api/res-practice/', data)
      this.results.push(result)
    }

    this.buildData(this.results)
  },

  data: () => ({
    evaluation: null,
    results: [],
    data: [],
    helpers: helpers,
    red: '2b2b2b',
    finalResult: '',
    columns: [
      {
        field: 'dimensão',
        label: 'Dimensão',
        width: '40'
      },
      {
        field: '1',
        label: '1',
        width: '40',
        centered: true
      },
      {
        field: '2',
        label: '2',
        width: '40',
        centered: true
      },
      {
        field: '3',
        label: '3',
        width: '40',
        centered: true
      },
      {
        field: '4',
        label: '4',
        width: '40',
        centered: true
      },
      {
        field: 'resultado',
        label: 'resultado',
        width: '40',
        centered: true
      }
    ]
  }),

  methods: {
    buildData (results) {
      var t = {
        'dimensão': 'Talento humano',
        1: results[0][0].result,
        2: results[1][0].result,
        3: results[2][0].result,
        4: results[3][0].result
      }

      this.checkResult(t)

      var t = {
        'dimensão': 'Gestão e qualidade',
        '1': results[4][0].result,
        '2': results[5][0].result,
        '3': results[6][0].result,
        '4': results[7][0].result
      }

      this.checkResult(t)

      var t = {
        'dimensão': 'Cliente e mercado',
        '1': results[8][0].result,
        '2': results[9][0].result,
        '3': results[10][0].result,
        '4': results[11][0].result
      }

      this.checkResult(t)

      var t = {
        'dimensão': 'Inovação',
        '1': results[12][0].result,
        '2': results[13][0].result,
        '3': results[14][0].result,
        '4': results[15][0].result
      }

      this.checkResult(t)

      var t = {
        'dimensão': 'Sociedade e sustentabilidade',
        '1': results[16][0].result,
        '2': results[17][0].result,
        '3': results[18][0].result,
        '4': results[19][0].result
      }

      this.checkResult(t)
      this.checkFinalResult(t)
    },

    checkResult (t) {
      var answers = Object.values(t)

      if (answers.includes('Vermelho')) {
        t.resultado = 'Vermelho'
        this.data.push(t)
      } else if (answers.includes('Laranja')){
        t.resultado = 'Laranja'
        this.data.push(t)
      } else if (answers.includes('Amarelo')){
        t.resultado = 'Amarelo'
        this.data.push(t)
      } else if (answers.includes('Verde')){
        t.resultado = 'Verde'
        this.data.push(t)
      } else if (answers.includes('Azul')){
        t.resultado = 'Azul'
        this.data.push(t)
      }
    },

    checkFinalResult () {
      var result = []
      var x = 0;
      for (var i = 0; i < this.data.length; i++) {
        result.push(this.data[i].resultado)
      }

      if (result.includes('Vermelho')) {
        this.finalResult = '0'
      } else if (result.includes('Laranja')){
        this.finalResult = '0'
      } else if (result.includes('Amarelo')){
        this.finalResult = '0'
      } else if (result.includes('Verde')){
        this.finalResult = '1'
      } else if (result.includes('Azul')){
        this.finalResult = '1'
      }
      for (var i = 0; i < 5; i++) {
        if((result[i] == 'Azul') || (result[i] == 'Verde')){
          x++;
        }
        if(x == 5) {
          this.finalResult = '2'
        }
      }

    },

    genpdf(){

     document.getElementById('botao').style.display = 'none';
     html2canvas(document.getElementById("content")).then(function(canvas) {

                var img = canvas.toDataURL('image/png');
                var doc = new jsPDF();
                doc.addImage(img, 'JPEG', 0, 0, 250, 300);
                doc.save('test.pdf');
            });
           }
  }
}
</script>

<style>
.image {

	   position: relative;

	   width: 100%; /* for IE 6 */
}
h6 {
   position: absolute;
   top: 450px;
   left: 750px;
   width: 100%;
}

h6  {
   color: black;
   font: times 240px/450px Times;
   letter-spacing: -1px;
   padding: 10px;
}

h26 {
   position: absolute;
   top: 400px;
   left: 700px;
   width: 100%;
}

h26  {
   color: black;
   font: times 240px/450px Times;
   letter-spacing: -1px;
   padding: 10px;
}

h7 {
   position: absolute;
   top: 520px;
   left: 710px;
   width: 100%;
}

h7  {
   color: black;
   font: times 20px/45px Helvetica, Sans-Serif;
   letter-spacing: -2px;
   padding: 10px;
}

h8 {
   position: absolute;
   top: 520px;
   left: 1020px;
   width: 100%;
}

h8  {
   color: black;
   font: times 20px/45px Helvetica, Sans-Serif;
   letter-spacing: -2px;
   padding: 10px;
}

h9 {
   position: absolute;
   top: 520px;
   left: 1020px;
   width: 100%;
}

h9  {
   color: black;
   font: times 20px/45px Helvetica, Sans-Serif;
   letter-spacing: -2px;
   padding: 10px;
}

h10 {
   position: absolute;
   top: 520px;
   left: 1020px;
   width: 100%;
}

h10  {
   color: black;
   font: times 20px/45px Helvetica, Sans-Serif;
   letter-spacing: -2px;
   padding: 10px;
}

.upper {
  padding-top: 30px;
}
</style>
