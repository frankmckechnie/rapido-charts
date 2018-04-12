<template>
</template>

<script>

export default {
  name: "bar-chart",
  extends: VueChartJs.Bar,
  mixins: [VueChartJs.mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: ""
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Happiness"
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "GDP (PPP)"
            }
          }
        ]
      }
    });
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
