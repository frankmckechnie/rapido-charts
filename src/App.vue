<template>
  <div id="rapido" class="container rela-block">
    
    <div class="callout">
     <div class="logo"></div>
    </div>
    
    <section class="nav">
      <div class="nav-right">
        <ul class="pull-right">
          <li>Sign-up</li>
          <li>Login</li>
        </ul>
      </div>
    </section>

    <section class="content drop-level-1">
      <div class="options pull-left ">
        <options :fields="dataSource" v-on:add-data="addData" v-on:update-field="updateField" v-on:update="updateLabels" :edit="isEdit" v-on:toggle-edit="toogleEdit" v-on:delete="deleteSet" :labels="labels" v-on:titles-update="titlesUpdate" :titles="titles" :title="title"></options>
            

          <editor v-show="isEdit" v-on:delete-set="deleteSet" editor-id="editor" lang="javascript" theme="twilight" :code="{titles: titles,labels:labels,datasets:dataSource}" v-on:change-content="changeContent" parent=".content"></editor>
      </div>

      <div class="charts pull-right " >        
        <chart-element :titles="titles" :datasets="dataSource" :labels="labels"></chart-element>
      </div>      
    </section>

  </div>
</template>

<script>

import options from './components/options'
import chartElement from './components/chart-element'
import editor from './components/editor'

export default {
  name: 'App',
  components: {
    options,
    chartElement,
    editor
  },
  data: function(){
    return{
      isEdit: false,
      title: { config: "Configuration" },
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      dataSource: [
        {
          label: "This years loss",
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 15, 24, 1)"
          ],
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ],
      maxDataSet: 5,
      titles: {heading: "",labelx: "", labely:""}
    }
  },
  methods: {
    titlesUpdate: function(key,value){     
      this.titles[key] = value;
      this.titles = JSON.parse(JSON.stringify(this.titles));
    },
    toogleEdit: function() {
      this.isEdit = this.isEdit ? false : true;
    },
    changeContent: function(json) {
      this.labels = json.labels;
      this.titles = json.titles;
      for (var i = 0; i < json.datasets.length; i++) {
       this.dataSource[i] = json.datasets[i];
      }
    },
    deleteSet: function(index) {
      this.dataSource.splice(index, 1);
    },
    updateLabels: function(value, delim) {
      this.labels = value.split(delim);
    },
    updateField: function(index, key, data) {
      this.dataSource[index][key] = data;
      this.dataSource.splice(index, 1, this.dataSource[index]);
    },
    addData: function(n) {
      if (this.dataSource.length <= this.maxDataSet) {
        this.dataSource.push({
          label: this.dataSource.length + " Name me!",
          backgroundColor: JSON.parse(
            JSON.stringify(this.dataSource[0].backgroundColor)
          ),
          data: JSON.parse(JSON.stringify(this.dataSource[0].data))
        });
      }
    }
  }
};


</script>

<style>
 
</style>
