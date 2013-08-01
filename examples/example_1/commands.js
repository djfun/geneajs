document.getElementById("chart").innerHTML = ChartHelper.render(myTree, 3,
  "{{name}}<br />" +
  "{{#if birth}}* {{birth}}<br />{{/if}}" +
  "{{#if death}}† {{death}}{{/if}}");