<template>
<div :style="{backgroundColor: bgColor}">
  <div class="header clearfix">

    <imgExports :type="dynamicComponent"></imgExports>

    <div class="chart-types">
      <div class="icon-block-square ml-icon pull-right" @click="switchComp(type)" :class="type+'-icon'" v-for="type in types">
        <div class="tipt">{{type}}</div>
      </div>
      <span class="pull-right">Charts</span>
    </div>
  </div>
  <div class="chart-inner" v-bind:style="styles">
    <component :chart-data="charts" :titles="titles" :is="dynamicComponent"></component>
  </div>
 
</div>
</template>

<script>

import barChart from './bar-chart.js'
import radar from './radar.js'
import pieChart from './pie-chart.js'
import doughnut from './doughnut.js'
import lineChart from './line-chart.js'

import imgExports from './img-exports'

export default {
  name: "chart-element",
    components: {
    pieChart,
    barChart,
    radar,
    doughnut,
    lineChart,
    imgExports
  },
  props: ["labels", "datasets", "titles"],
  data: function() {
    return {
      dynamicComponent: "bar-chart",
      types: ["bar-chart", "pie-chart", "line-chart", "doughnut", "radar"],
      excaptions: ["line-chart", "radar"],
      styles: { width: " ", height: "" },
      bgColor: "#fff",
      imgExports: ["JPG", "PNG"]
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
       
        for(var i in this.datasets){
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
