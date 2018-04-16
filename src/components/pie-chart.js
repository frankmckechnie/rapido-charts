
import {Pie} from '../BaseCharts'
import {reactiveProp} from '../mixins/index'

export default {
  extends: Pie,
  mixins: [reactiveProp],
  data: function(){
    return {
     options:  {
      responsive: true,
      maintainAspectRatio: false
      }
    }
  },
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  }
};

