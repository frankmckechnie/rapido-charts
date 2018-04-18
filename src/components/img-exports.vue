<template>
  <div class="exports">
      <div class="pull-left field">
        <span> Export Settings:</span>
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
        <input type="" @change="changeColor($event.target.value);" class="jscolor no-font color-input" name="">
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
      context: "",
      color: "#fff"
    };
  },
  methods: {
    changeColor: function(bg){

      var context = document.getElementById(this.type).getContext('2d');

      var canvas = context.canvas;

      var w = canvas.width;
      var h = canvas.height;

      var data;

      //get the current ImageData for the canvas.
      data = context.getImageData(0, 0, w, h);

      //store the current globalCompositeOperation
      var compositeOperation = context.globalCompositeOperation;

      //set to draw behind current content
      context.globalCompositeOperation = "destination-over";

      //draw background / rect on entire canvas
      context.fillStyle = "#" + bg;

      context.fillRect(0,0,w,h);
  
      //clear the canvas
      context.clearRect (0,0,w,h);

      //restore it with original / cached ImageData
      context.putImageData(data, 0,0);

      //reset the globalCompositeOperation to what it was
      context.globalCompositeOperation = compositeOperation;
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
        
        this.$refs['downloadLink'].href = img;
        this.$refs['downloadLink'].click();
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
