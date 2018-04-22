<template>
  <div :id="editorId" :style="styles"></div>
</template>

<script>

import * as ace from 'brace';

require('brace/mode/javascript');
require('brace/theme/twilight');

export default {
  name: "editor",
  props: ["editorId", "code", "lang", "theme", "parent"],
  data: function() {
    return {
      editor: Object,
      beforeContent: "",
      styles: { width: "100%", height: "100%" }
    };
  },
  watch: {
    code: function(value) {
      var datasets = [];
      for (var ary = 0; ary < value.datasets.length; ary++) {
        var dataSet = {
          label: JSON.parse(JSON.stringify(value.datasets[ary].label)),
          backgroundColor: JSON.parse(
            JSON.stringify(value.datasets[ary].backgroundColor)
          ),
          data: JSON.parse(JSON.stringify(value.datasets[ary].data))
        };
        datasets.push(dataSet);
      }
      var obj = JSON.stringify(
        { titles: {heading: value.titles.heading, labelx: value.titles.labelx, labely:value.titles.labely}, labels: value.labels, datasets: datasets },
        undefined,
        2
      );

      if (this.beforeContent != obj) {
        this.beforeContent = obj;
        this.editor.setValue(obj, 1);
      }
    }
  },
  mounted() {

    const lang = this.lang;
    const theme = this.theme;

    this.styles.height =
      document.querySelector(this.parent).offsetHeight - 54 + "px";
    this.editor = window.ace.edit(this.editorId);

    this.editor.setValue(JSON.stringify(this.code, undefined, 2), 1);

    this.editor.getSession().setMode("ace/mode/" + lang);
    this.editor.setTheme("ace/theme/" + theme);
    var self = this;
    this.editor.on("input", function(value) {
      if (self.beforeContent !== self.editor.getValue()) {
        var json = JSON.parse(self.editor.getValue());
        var condition = json.datasets.length < self.code.datasets.length;

        if (condition) {
          var comapreObject = JSON.parse(self.beforeContent);
          for (var item in comapreObject.datasets) {
            var deleteItem = 0;
            for (var i in json.datasets) {
              deleteItem =
                JSON.stringify(comapreObject.datasets[item]) ==
                JSON.stringify(json.datasets[i])
                  ? deleteItem
                  : deleteItem++;
            }
            deleteItem == 0 ? self.$emit("delete-set", item) : "";
          }
        }

        self.beforeContent = self.editor.getValue();
        self.$emit("change-content", json);
      }
    });
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
