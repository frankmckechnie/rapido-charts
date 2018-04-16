
import {Bar} from '../BaseCharts'
import {reactiveProp} from '../mixins/index'

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData", "titles"],
  data: function(){
    return {
     options:  {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: ((this.titles.heading != "") ? true : false),
        text: this.titles.heading
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: ((this.titles.labely != "") ? true : false),
              labelString: this.titles.labely
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: ((this.titles.labelx != "") ? true : false),
              labelString: this.titles.labelx
            }
          }
        ]
      }
    }
    }
  },
  watch: {

  },
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  },
  created:{

  }
};
