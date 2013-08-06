var ChartHelper = require('../source/chart').ChartHelper;

function getElementByRef (data, ref) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].data.ref === ref) {
      return data[i];
    }
  }
}

exports.testChildWithSpouseNoGrandchildren = function(test) {
  var pedigree = {
    "data": {
      "name": "Element #1",
      "gender": "male",
      "birth": "xx.xx.xxxx",
      "ref": 0
    },
    "spouses": [{
      "data": {
        "name": "S1",
        "gender": "female",
        "birth": "xx.xx.xxxx",
        "ref": 1
      },
      "children": [{
        "data": {
          "name": "Child 1",
          "gender": "male",
          "birth": "xx.xx.xxxx",
          "ref": 2
        },
        "spouses": [{
          "data": {
            "name": "new spouse",
            "ref": 3
          },
          "children": []
        }]
      }, {
        "data": {
          "name": "the new child",
          "ref": 4
        },
        "spouses": false
      }]
    }]
  };
  var returnObject = ChartHelper.renderPedigree(pedigree);
  test.notEqual(getElementByRef(returnObject.data, 3).left, getElementByRef(returnObject.data, 4).left,
    "spouse of child 1 and the second child have the same left value");
  test.done();
};

exports.testOneChild = function(test) {
  var pedigree = {
    "data": {
      "name": "Element #1",
      "gender": "male",
      "birth": "xx.xx.xxxx",
      "ref": 0
    },
    "spouses": [{
      "data": {
        "name": "S1",
        "gender": "female",
        "birth": "xx.xx.xxxx",
        "ref": 1
      },
      "children": [{
        "data": {
          "name": "Child 1",
          "gender": "male",
          "birth": "xx.xx.xxxx",
          "ref": 2
        }}
      ]
    }]
  };
  var returnObject = ChartHelper.renderPedigree(pedigree);
  test.equal(getElementByRef(returnObject.data, 2).left, getElementByRef(returnObject.data, 0).left + (ChartHelper.width + ChartHelper.spacing) / 2,
    "only child is not in the middle of father and mother");
  test.done();
};