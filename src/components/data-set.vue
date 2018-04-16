<template>
     <div >
      <div class="field-block">
        <label>Data Title <span v-show="version != 0" @click="deleteDataSet()" class="icon-block x-icon medium-icon pull-right"></span></label>
        <input v-model="dataTitle" @input="$emit('update-field', version, 'label', $event.target.value)">
      </div>

      <div class="field-block">
        <label>Datasets <span v-show="isNumeric(dataSet)" class="pull-right">{{this.field.data.length + " items"}}</span> <span class="error">{{texareaError}}</span></label>
        <textarea v-model="dataSet" @input="validateTextarea($event.target.value)" name="" id="" cols="20" rows="7"></textarea>
      </div>

      <div class="field-block">
        <label>Colors<span v-show="isNumeric(dataSet)" class="pull-right">{{this.field.data.length + " items"}}</span> <span class="error">{{texareaError}}</span></label>
        <div style="width: 100%">
          <color v-for="item in this.field.data.length" :colors="field.backgroundColor" :version="version" v-on:update-field="updateColors" :item="item"></color>
        </div>
        <label @click="activeLink = (activeLink) ? false : true; updateColors()" :class="{ 'active': activeLink }" class="btn-label">linked colors</label>
      </div>
    </div>
</template>

<script>

import color from './color'

export default {
  name: "data-set", 
  components: {
    color
  },
 props: ["data", "field", "version"],
  watch: {
    "field.data": function(value) {
      var newline = this.dataSet.indexOf("\n") > -1;
      var comma = this.dataSet.indexOf(",") > -1;
      this.dataSet = this.field.data.join(comma ? "," : "\n");
    },
    "field.label": function(value) {
      this.dataTitle = this.field.label;
    }
  },
  data: function() {
    return {
      dataTitle: "",
      dataSet: "",
      texareaError: "",
      activeLink: false,
      oldColors: []
    };
  },
  methods: {
    deleteDataSet: function() {
      this.$emit("delete", this.version);
    },
    validateTextarea: function(value) {
      this.texareaError = "";
      var newline = value.indexOf("\n") > -1;

      var comma = value.indexOf(",") > -1;
      var condition = (newline && comma) || !this.isNumeric(value);

      if (condition) {
        this.texareaError = this.isNumeric(value)
          ? "Only use , or new line"
          : "Number please!";
        return;
      }
      this.updateField(this.version, "data", value.split(comma ? "," : "\n"));
    },
    updateField: function(index, key, data) {
      this.$emit("update-field", index, key, data);
    },
    isNumeric: function(n) {
      var n = n.replace(/[\n\s,]/g, "");
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    updateColors: function(index, key, data) {
      if (this.activeLink) {
        this.oldColors = data != undefined ? this.oldColors : this.field.backgroundColor.slice();
        var ary = this.field.backgroundColor.slice();
        for (var i = 0; i < ary.length; ++i) {
          ary[i] = ary[0];
        }
        this.oldColors[0] = ary[0];
        this.updateField(this.version, "backgroundColor", ary);
      } else {
        var newColors = data || this.oldColors;
        this.updateField(this.version, "backgroundColor", newColors);
      }
    }
  },
  created: function() {
    this.dataTitle = this.field.label;
    this.dataSet = this.field.data.join(",");
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
