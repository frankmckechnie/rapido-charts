<template>
  <div class="exports">
      <div class="pull-left field">
        <span class="pull-left ">Size</span>
        <span class="icon-block-square ml-icon right-arrow-icon pull-left"></span>
        <input v-model="styles.width" class="size t-right" />
        x
        <input  v-model="styles.height" class="size" />
      </div>
      
      <div class="pull-left field">
        <span class="pull-left ">Type</span>
         <span class="icon-block-square ml-icon right-arrow-icon pull-left"></span>
        <select><option v-for="imgExport in imgExports" >{{imgExport}}</option></select>
      </div>

      <div class="pull-left field">
        <div class="btn-export pull-left">      <span class="icon-block-square ml-icon right-arrow-icon pull-left"></span>
 Export</div>
      </div>
  </div>
</template>

<script>



export default {
  name: "img-exports",
  props: [],
  data: function() {
    return {
      imgExports: ["JPG", "PNG"],
      styles: { width: " ", height: "" }
    };
  }
 
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
