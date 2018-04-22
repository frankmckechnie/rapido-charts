
import {Bar} from '../BaseCharts'
import {reactiveProp} from '../mixins/index'

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData", "titles"],
  data: function(){
    return {
      timeOut: "",
      options:  {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: (this.titles.heading != "") ? true : false,
          text: this.titles.heading
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: (this.titles.labely != "") ? true : false,
                labelString: this.titles.labely
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: (this.titles.labelx != "") ? true : false,
                labelString: this.titles.labelx
              }
            }
          ]
        }
      }
    }
  },
  watch: {
    titles: function(value){
      var chart = this.$data._chart;
      var self = this;
      if(this.timeOut == ""){
        this.timeOut = setTimeout(function(){ 
          chart.options.title.text = self.titles.heading;
          chart.options.title.display = (self.titles.heading != "") ? true : false
          chart.options.scales.yAxes[0].scaleLabel.display =(self.titles.labely != "") ? true : false
          chart.options.scales.xAxes[0].scaleLabel.display = (self.titles.labelx != "") ? true : false,
          chart.options.scales.yAxes[0].scaleLabel.labelString = self.titles.labely;
          chart.options.scales.xAxes[0].scaleLabel.labelString = self.titles.labelx;

          chart.update();
          self.timeOut = "";
        }, 500);
      }

    }
  },
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  }
};
