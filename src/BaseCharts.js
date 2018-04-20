import Chart from 'chart.js';

export function generateChart (chartId, chartType) {
  return {
    render: function (createElement) {
      return createElement(
        'div', {
          style: this.styles,
          class: this.cssClasses
        },
        [
          createElement(
            'canvas', {
              attrs: {
                id: this.chartId,
                width: this.width,
                height: this.height
              },
              ref: 'canvas'
            }
          )
        ]
      )
    },

    props: {
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 400,
        type: Number
      },
      height: {
        default: 400,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object
      },
      plugins: {
        type: Array,
        default () {
          return []
        }
      }
    },

    data () {
      return {
        _chart: null,
        _plugins: this.plugins
      }
    },

    methods: {
      msieversion() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
            console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        }
        else  // If another browser, return 0
        {
            console.log('otherbrowser');
        }

        return false;
      },
      addPlugin (plugin) {
        this.$data._plugins.push(plugin)
      },
      renderChart (data, options) {
        this.$data._chart = new Chart(
          this.$refs.canvas.getContext('2d'), {
            type: chartType,
            data: data,
            options: options,
            plugins: this.$data._plugins
          }
        );
        console.log(this.msieversion());
        if(this.msieversion()){

          setTimeout(function(){
            var originalCanvas = this.$refs.canvas;

            var h = originalCanvas.style.height;
            var w = originalCanvas.style.width;

            originalCanvas.parentElement.style.height = h;
            originalCanvas.parentElement.style.width = w;      

          }.bind(this),1000)

        }

      }
    },
    beforeDestroy () {
      if (this.$data._chart) {
        this.$data._chart.destroy()
      }
    }
  }
}

export const Bar = generateChart('bar-chart', 'bar')
export const HorizontalBar = generateChart('horizontalbar-chart', 'horizontalBar')
export const Doughnut = generateChart('doughnut', 'doughnut')
export const Line = generateChart('line-chart', 'line')
export const Pie = generateChart('pie-chart', 'pie')
export const PolarArea = generateChart('polar-chart', 'polarArea')
export const Radar = generateChart('radar', 'radar')
export const Bubble = generateChart('bubble-chart', 'bubble')
export const Scatter = generateChart('scatter-chart', 'scatter')


export default {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter
}