<template>
  <div class="exports">
  <span class="pull-left"> Export Settings</span>
      <div class="pull-left field">
        <input v-model="styles.width" class="size t-right" />
        x
        <input  v-model="styles.height" class="size" />
      </div>
      
      <div class="pull-left field">
        <span class="icon-block-square ml-icon right-arrow-icon pull-left"></span>
        <select @change="selected = $event.target.value">
          <option v-for="imgExport in imgExports" >{{imgExport}}</option>
        </select>
      </div>

      <div class="pull-left field">
        <span class="icon-block-square ml-icon right-arrow-icon pull-left"></span>
        <input type="" @change="changeColor($event.target.value);" class="jscolor no-font color-input" name="" />
      </div>

      <div class="pull-left field">
        <span class="icon-block-square ml-icon right-arrow-icon pull-left"></span>
        <div class="btn-export pull-left" @click="exportImage($event.target)">Export</div>
        <a style="display: none" :href="href" ref="downloadLink" :download="name">Export</a>
      </div>
  </div>
</template>

<script>



export default {
  name: "img-exports",
  props: ["type"],
  data: function() {
    return {
      imgExports: ["png", "bmp", "gif", "jpeg", "tiff"],
      styles: { width: "940", height: "400" },
      selected: "png",
      href: "",
      context: false,
      color: "#fff",
      rect: false
    };
  },
  methods: {
    changeColor: function(bg){
      if(this.context){
        var canvas = this.context.canvas;

        var w = canvas.width;
        var h = canvas.height;

        //clear the canvas
        this.context.clearRect(0,0,w,h);

        //restore it with original / cached ImageData
        this.context.putImageData(this.rect, 0,0);

        //set to draw behind current content
        this.context.globalCompositeOperation = "destination-over";

        this.context.fillStyle = "#" + bg;
        this.context.fillRect(0,0,w,h);

      }else{
        this.context = document.getElementById(this.type).getContext('2d');

        var canvas = this.context.canvas;

        var w = canvas.width;
        var h = canvas.height;

        //get the current ImageData for the canvas.
        this.rect = this.context.getImageData(0, 0, w, h);

        //store the current globalCompositeOperation
        var compositeOperation = this.context.globalCompositeOperation;

        //set to draw behind current content
        this.context.globalCompositeOperation = "destination-over";

        //draw background / rect on entire canvas
        this.context.fillStyle = "#" + bg;

        this.context.fillRect(0,0,w,h);

      }
    },
    exportImage: function(el){
      var originalCanvas = document.getElementById(this.type);

      var h = originalCanvas.style.height;
      var w = originalCanvas.style.width;

      originalCanvas.style.backgroundColor = '#fff';

      originalCanvas.parentElement.style.height = this.styles.height + "px";
      originalCanvas.parentElement.style.width = this.styles.width + "px";

      setTimeout(function(){
        var img    = originalCanvas.toDataURL("image/"+ this.selected);
        img = img.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

        if (originalCanvas.msToBlob) { //for IE
            var blob = originalCanvas.msToBlob();
            window.navigator.msSaveBlob(blob, this.name);
        } else {
          this.$refs['downloadLink'].href = img;
          this.$refs['downloadLink'].click();
        }
        
        originalCanvas.parentElement.style.height =  "auto";
        originalCanvas.parentElement.style.width = "auto";
        originalCanvas.style.height = h;
        originalCanvas.style.width = w;
      }.bind(this), 20);

    }
  },
  computed:{
    name: function(){
      return this.type + "." + this.selected;
    }
  }
 
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
