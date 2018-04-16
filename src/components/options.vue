<template>
  <div>
    <div class="nav">{{title.config}}      
      <span @click="$emit('toggle-edit')"  class="icon-block-square code-icon ml-icon pull-right"></span> 
      <span class=" icon-block-square medium-icon pull-right down-arrow" @click="toggleShow()" :class="showMenu"></span>
    </div>

    <div v-show="!edit" class="settings" :class="{'active': showMenu == 'up-icon'}">

      <div class="tab-nav">   
         <ul>  
            <li  v-for="(tab, index) in tabs"   @click="selectedTab = index"  :class="{ 'active': selectedTab == index }" class="">{{tab }}</li>
            <hr />
        </ul> 
      </div>

      <div v-show="selectedTab == 0 " >

        <ul class="tab-clicks animated fadeInLeft" :class="{'active': showMenu == 'up-icon'}">
          <li @click="selectedCategory = index"  v-for="(field, index) in fields" :class="{ 'active': selectedCategory == index }">{{index}}</li>
          <li @click="$emit('add-data')" class="plus-icon small-icon"></li>
        </ul>
        <data-set class="animated fadeIn" v-show="selectedCategory == index " v-for="(field, index) in fields" v-on:update-field="updateField" v-on:delete="deleteSet" :field="field" :version="index" ></data-set>
      </div>


      <div v-show="selectedTab == 1 " >
        <div  class="field-block">
          <label>Labels <span v-show="list != ''" class="pull-right">{{labels.length + " items"}}</span> <span class="error">{{texareaError}}</span></label>
          <textarea v-model="list" @input="validateTextarea($event.target.value)" cols="30" rows="7"></textarea>
        </div>
        <div  class="field-block">
          <label>Chart heading </label>
          <input :value="titles.heading" v-on:input="$emit('titles-update', 'heading' ,$event.target.value)">
        </div>

        <div  class="field-block">
          <label>Label X </label>
          <input :value="titles.labelx" v-on:input="$emit('titles-update', 'labelx' ,$event.target.value)">
        </div>

        <div  class="field-block">
          <label>bLabel Y </label>
          <input :value="titles.labely" v-on:input="$emit('titles-update', 'labely' ,$event.target.value)">
        </div>        
      </div>

    </div>
  </div>
</template>

<script>
import dataSet from './data-set'

export default {
  name: "options", 
  components: {
    dataSet
  },
  props: ["title", "labels", "fields", "edit", "titles"],
  data: function() {
    return {
      showMenu: "down-icon",
      tabs: ["Data", "Labels"],
      selectedCategory: "",
      texareaError: "",
      list: "",
      selectedTab: 0
    };
  },
  watch: {
    labels: function(value) {
      var newline = this.list.indexOf("\n") > -1;
      var comma = this.list.indexOf(",") > -1;
      this.list = this.labels.join(comma ? "," : "\n");
    }
  },
  methods: {
    toggleShow() {
      this.showMenu = this.showMenu == "down-icon" ? "up-icon" : "down-icon";
    },
    deleteSet: function(version) {
      this.$emit("delete", version);
      this.selectedCategory = 0;
    },
    updateField: function(index, key, data) {
      this.$emit("update-field", index, key, data);
    },
    validateTextarea: function(value) {
      this.texareaError = "";
      var newline = value.indexOf("\n") > -1;
      var comma = value.indexOf(",") > -1;
      var condition = (newline && comma) || value.trim() == "";

      if (condition) {
        this.texareaError = "Only use , or new line ";
        return;
      }
      this.$emit("update", value, comma ? "," : "\n");
    }
  },
  created() {
    this.selectedCategory = 0;
    this.list = this.labels.join(",");
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
