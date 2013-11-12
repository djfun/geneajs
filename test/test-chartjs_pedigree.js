var ChartHelper = require('../source/chart').ChartHelper;

function getElementByRef (data, ref) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].data.ref === ref) {
      return data[i];
    }
  }
}

function isHorizontalLineAtPosition (lines, x, y) {
  // console.log("is there a horizontal line at " + x + ", " + y + "?");
  var found = false;
  for(var i = 0; i < lines.length; i++) {
    if (lines[i].data.orientation === 'horizontal' && lines[i].top == y && lines[i].left <= x &&
      lines[i].left + lines[i].data.len >= x) {
      found = true;
    }
    /*if (lines[i].data.orientation === 'horizontal') {
      console.log(lines[i]);
    }*/
  }
  return found;
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

exports.testTwoChildrenOneWithSpouse = function(test) {
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
        "spouses": false
      }, {
        "data": {
          "name": "the new child",
          "ref": 3
        },
        "spouses": [{
          "data": {
            "name": "new spouse",
            "ref": 4
          },
          "children": []
        }]
      }]
    }]
  };
  var returnObject = ChartHelper.renderPedigree(pedigree);
  test.equal(isHorizontalLineAtPosition(returnObject.lines, getElementByRef(returnObject.data, 1).left + ChartHelper.width / 2,
    getElementByRef(returnObject.data, 1).top + ChartHelper.height + ChartHelper.spacing_v + 2), true,
    "Horizontal line from spouse to children missing");
  test.done();
};