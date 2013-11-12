var ChartHelper = require('../source/chart').ChartHelper;

function countVerticalLines (lines) {
  var count = 0;
  for(var i = 0; i < lines.length; i++) {
    if (lines[i].data.orientation === 'vertical') {
      count++;
    }
  }
  return count;
}

function getElementByRef (data, ref) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].data.ref === ref) {
      return data[i];
    }
  }
}

exports.testFatherWithSiblingsButWithoutAncestors = function(test) {
  var ancestors = {
    father_siblings: [
      {
        data: {
          name: "Aunt",
          gender: "female"
        }
      },
      {
        data: {
          name: "Uncle",
          gender: "male"
        }
      }
    ],
    father: {
      data: {
        name: "Father",
        gender: "male"
      }
    }
  };
  var returnObject = ChartHelper.renderAncestors(ancestors, 2);
  // console.log(JSON.stringify(returnObject));
  test.equal(countVerticalLines(returnObject.lines), 2, "Ancestor chart with father and his siblings doesn't have correct amount of vertical lines");
  test.done();
};

exports.testFatherWithSiblingsAndAncestors = function(test) {
  var ancestors = {
    father_siblings: [
      {
        data: {
          name: "Aunt",
          gender: "female"
        }
      },
      {
        data: {
          name: "Uncle",
          gender: "male"
        }
      }
    ],
    father: {
      data: {
        name: "Father",
        gender: "male"
      },
      father: {
        data: {
          name: "Grandfather",
          gender: "male"
        }
      },
      mother: {
        data: {
          name: "Grandmother",
          gender: "female"
        }
      }
    }
  };
  var returnObject = ChartHelper.renderAncestors(ancestors, 2);
  test.equal(countVerticalLines(returnObject.lines), 4, "Ancestor chart with father, his siblings and ancestors doesn't have correct amount of vertical lines");
  test.done();
};

exports.testMotherWithSiblingsButWithoutAncestors = function(test) {
  var ancestors = {
    mother_siblings: [
      {
        data: {
          name: "Aunt",
          gender: "female"
        }
      },
      {
        data: {
          name: "Uncle",
          gender: "male"
        }
      }
    ],
    mother: {
      data: {
        name: "Mother",
        gender: "female"
      }
    }
  };
  var returnObject = ChartHelper.renderAncestors(ancestors, 2);
  // console.log(JSON.stringify(returnObject));
  test.equal(countVerticalLines(returnObject.lines), 2, "Ancestor chart with mother and her siblings doesn't have correct amount of vertical lines");
  test.done();
};

exports.testMotherWithSiblingsAndAncestors = function(test) {
  var ancestors = {
    mother_siblings: [
      {
        data: {
          name: "Aunt",
          gender: "female"
        }
      },
      {
        data: {
          name: "Uncle",
          gender: "male"
        }
      }
    ],
    mother: {
      data: {
        name: "Mother",
        gender: "female"
      },
      father: {
        data: {
          name: "Grandfather",
          gender: "male"
        }
      },
      mother: {
        data: {
          name: "Grandmother",
          gender: "female"
        }
      }
    }
  };
  var returnObject = ChartHelper.renderAncestors(ancestors, 2);
  test.equal(countVerticalLines(returnObject.lines), 4, "Ancestor chart with mother, her siblings and ancestors doesn't have correct amount of vertical lines");
  test.done();
};

exports.testPositionsFullTree = function(test) {
  var ancestors = {
    mother: {
      data: {
        name: "Mother",
        gender: "female",
        ref: 0
      },
      father: {
        data: {
          name: "Grandfather",
          gender: "male",
          ref: 1
        },
        father: {
          data: {
            name: "Great-grandfather",
            gender: "male",
            ref: 2
          }
        },
        mother: {
          data: {
            name: "Great-grandmother",
            gender: "female",
            ref: 3
          }
        }
      },
      mother: {
        data: {
          name: "Grandmother",
          gender: "female",
          ref: 4
        },
        father: {
          data: {
            name: "Great-grandfather",
            gender: "male",
            ref: 5
          }
        },
        mother: {
          data: {
            name: "Great-grandmother",
            gender: "female",
            ref: 6
          }
        }
      }
    },
    father: {
      data: {
        name: "Mother",
        gender: "female",
        ref: 7
      },
      father: {
        data: {
          name: "Grandfather",
          gender: "male",
          ref: 8
        },
        father: {
          data: {
            name: "Great-grandfather",
            gender: "male",
            ref: 9
          }
        },
        mother: {
          data: {
            name: "Great-grandmother",
            gender: "female",
            ref: 10
          }
        }
      },
      mother: {
        data: {
          name: "Grandmother",
          gender: "female",
          ref: 11
        },
        father: {
          data: {
            name: "Great-grandfather",
            gender: "male",
            ref: 12
          }
        },
        mother: {
          data: {
            name: "Great-grandmother",
            gender: "female",
            ref: 13
          }
        }
      }
    }
  };
  var returnObject = ChartHelper.renderAncestors(ancestors, 3);
  var data = returnObject.data;
  test.equal(getElementByRef(data, 3).left - getElementByRef(data, 2).left, ChartHelper.width + ChartHelper.spacing,
    "Position of parents of father of mother is not correct");
  test.equal(getElementByRef(data, 6).left - getElementByRef(data, 5).left, ChartHelper.width + ChartHelper.spacing,
    "Position of parents of mother of mother is not correct");
  test.equal(getElementByRef(data, 10).left - getElementByRef(data, 9).left, ChartHelper.width + ChartHelper.spacing,
    "Position of parents of father of father is not correct");
  test.equal(getElementByRef(data, 13).left - getElementByRef(data, 12).left, ChartHelper.width + ChartHelper.spacing,
    "Position of parents of mother of father is not correct");

  test.equal(getElementByRef(data, 4).left - getElementByRef(data, 1).left, ChartHelper.width * 2 + ChartHelper.spacing * 2,
    "Position of parents of mother is not correct");
  test.equal(getElementByRef(data, 11).left - getElementByRef(data, 8).left, ChartHelper.width * 2 + ChartHelper.spacing * 2,
    "Position of parents of mother is not correct");

  test.equal(getElementByRef(data, 0).left - getElementByRef(data, 7).left, ChartHelper.width * 4 + ChartHelper.spacing * 4,
    "Position of parents is not correct");


  test.equal(getElementByRef(data, 3).top - getElementByRef(data, 2).top, 0, "Gread-grandparents do not have the same vertical position");
  test.equal(getElementByRef(data, 3).top - getElementByRef(data, 5).top, 0, "Gread-grandparents do not have the same vertical position");

  test.equal(getElementByRef(data, 8).top - getElementByRef(data, 11).top, 0, "Grandparents do not have the same vertical position");

  test.equal(getElementByRef(data, 7).top - getElementByRef(data, 0).top, 0, "Parents do not have the same vertical position");

  test.done();
};

exports.testDepthOfTree = function(test) {
  var ancestors = {
    mother: {
      data: {
        name: "Mother",
        gender: "female",
        ref: 0
      }
    },
    father: {
      data: {
        name: "Father",
        gender: "male",
        ref: 1
      }
    }
  };
  var returnObject = ChartHelper.renderAncestors(ancestors, 5);
  test.equal(getElementByRef(returnObject.data, 0).left - getElementByRef(returnObject.data, 1).left - ChartHelper.width, ChartHelper.spacing,
    "Spacing between parents is not ChartHelper.spacing");
  test.done();
};