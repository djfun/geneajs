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
  test.equal(2, countVerticalLines(returnObject.lines), "Ancestor chart with father and his siblings doesn't have correct amount of vertical lines");
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
  test.equal(4, countVerticalLines(returnObject.lines), "Ancestor chart with father, his siblings and ancestors doesn't have correct amount of vertical lines");
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
  test.equal(2, countVerticalLines(returnObject.lines), "Ancestor chart with mother and her siblings doesn't have correct amount of vertical lines");
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
  test.equal(4, countVerticalLines(returnObject.lines), "Ancestor chart with mother, her siblings and ancestors doesn't have correct amount of vertical lines");
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
  test.equal(ChartHelper.width + ChartHelper.spacing, getElementByRef(data, 3).left - getElementByRef(data, 2).left, 
    "Position of parents of father of mother is not correct");
  test.equal(ChartHelper.width + ChartHelper.spacing, getElementByRef(data, 6).left - getElementByRef(data, 5).left,
    "Position of parents of mother of mother is not correct");
  test.equal(ChartHelper.width + ChartHelper.spacing, getElementByRef(data, 10).left - getElementByRef(data, 9).left, 
    "Position of parents of father of father is not correct");
  test.equal(ChartHelper.width + ChartHelper.spacing, getElementByRef(data, 13).left - getElementByRef(data, 12).left,
    "Position of parents of mother of father is not correct");

  test.equal(ChartHelper.width * 2 + ChartHelper.spacing * 2, getElementByRef(data, 4).left - getElementByRef(data, 1).left, 
    "Position of parents of mother is not correct");
  test.equal(ChartHelper.width * 2 + ChartHelper.spacing * 2, getElementByRef(data, 11).left - getElementByRef(data, 8).left, 
    "Position of parents of mother is not correct");

  test.equal(ChartHelper.width * 4 + ChartHelper.spacing * 4, getElementByRef(data, 0).left - getElementByRef(data, 7).left, 
    "Position of parents is not correct");

  test.done();
};