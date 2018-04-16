<template>
  <div class="exports">
      <div class="pull-left field">
          <span class="pull-left ">Size</span>
        <input v-model="styles.width" class="size t-right" />
        x
        <input  v-model="styles.height" class="size" />
      </div>
      
      <div class="pull-left field">
        <span class="pull-left ">Type</span>
        <select><option v-for="imgExport in imgExports" >{{imgExport}}</option></select>
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
