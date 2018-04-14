<template>
<div class="field-color">
  <input :id="random" class="jscolor no-font" :value="color" :style="{backgroundColor: color}"  @change="inputColor($event.target.value)">
</div>
</template>

<script>

export default {
 name: "color", 
 props: ["item", "version", "colors"],
  data: function() {
    return {
      color: "",
      random: Math.random()
        .toString(36)
        .substring(7)
    };
  },
  watch: {
    colors: function() {
      this.color = this.colors[this.item - 1];
    }
  },
  methods: {
    inputColor: function(color) {
      var ary = this.colors;
      ary[this.item - 1] = "#" + color;
      this.$emit("update-field", this.version, "backgroundColor", ary);
    }
  },
  created: function() {
    this.color = this.colors[this.item - 1];
  },
  mounted: function() {
    jscolor.installByClassName("jscolor");
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
