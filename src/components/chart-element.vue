<template>
<div >
  <div class="header clearfix">
    <span class="pull-left ">Size</span>
    <input v-model="styles.width" class="size t-right" />
    x
    <input  v-model="styles.height" class="size" />
    <div class="icon-block-square ml-icon pull-right" @click="switchComp(type)" :class="type+'-icon'" v-for="type in types">
      <div class="tipt">{{type}}</div>
    </div>
    <span class="pull-right">Charts</span>
  </div>
  <div class="chart-inner" v-bind:style="styles">
    <component :chart-data="charts" :is="dynamicComponent"></component>
  <div>
  </div>
</template>

<script>
import barChart from './bar-chart'
import radar from './Radar'
import doughnut from './Doughnut'
import lineChart from './line-chart'
import pieChart from './pie-chart'

export default {
  name: "chart-element",
    components: {
    barChart,
    radar,
    doughnut,
    lineChart,
    pieChart
  },
  props: ["labels", "datasets"],
  data: function() {
    return {
      dynamicComponent: "bar-chart",
      types: ["bar-chart", "pie-chart", "line-chart", "Doughnut", "Radar"],
      excaptions: ["line-chart", "Radar"],
      styles: { width: " ", height: "" }
    };
  },
  methods: {
    switchComp: function(name) {
      this.dynamicComponent = name;
    }
  },
  computed: {
    charts: function() {
      if (this.excaptions.includes(this.dynamicComponent)) {
        var arys = [];
       
        for(i in this.datasets){
          arys.push({label: this.datasets[i].label, backgroundColor: this.datasets[i].backgroundColor[0], data: this.datasets[i].data});
        }
       
        return {
          labels: this.labels,
          datasets: arys
        };
      } else {
        return {
          labels: this.labels,
          datasets: this.datasets
        };
      }
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
