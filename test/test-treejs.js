var json2Tree = require('../source/tree').json2Tree;

exports.testOnlyElement1 = function(test) {
  var jsonObject = {
    elements: {
      1: {
        'data': {
          'name': 'element #1',
          'some-other-data': 'the value',
          'ref': 1
        }
      }
    }
  };
  var tree = json2Tree(jsonObject, 1);
  test.equal(tree.pedigree.data.name, 'element #1', "name attribute of element #1 was not set");
  test.equal(tree.pedigree.data['some-other-data'], 'the value', "custom attribute 'some-other-data' of element #1 was not set");
  test.done();
};

exports.testFatherAndMother = function(test) {
  var jsonObject = {
    elements: {
      1: {
        'data': {
          'name': 'element #1',
          'ref': 1
        },
        'relations': [
          {type: 'father', ref: 2},
          {type: 'something-undefined', ref: 1}
        ]
      },
      2: {
        'data': {
          'name': 'the father',
          'ref': 2
        },
        'relations': [
          {type: 'father', ref: 3},
          {type: 'mother', ref: 4}
        ]
      },
      3: {
        'data': {
          'name': 'grandfather',
          'ref': 3
        }
      },
      4: {
        'data': {
          'name': 'grandmother',
          'ref': 4
        }
      }
    }
  };
  var tree = json2Tree(jsonObject, 1);
  test.equal(tree.father.data.name, 'the father', "father of element #1 not found");
  test.equal(tree.father.father.data.name, 'grandfather', "grandfather of element #1 not found");
  test.equal(tree.father.mother.data.name, 'grandmother', "grandmother of element #1 not found");
  test.done();
};

exports.testSiblings = function(test) {
  var jsonObject = {
    elements: {
      1: {
        'data': {
          'name': 'element #1',
          'ref': 1
        },
        'relations': [
          {type: 'father', ref: 2},
          {type: 'mother', ref: 3}
        ]
      },
      2: {
        'data': {
          'name': 'the father',
          'ref': 2
        },
        'relations': [
          {type: 'child', ref: 1, spouse: 3},
          {type: 'child', ref: 4, spouse: 3}
        ]
      },
      3: {
        'data': {
          'name': 'mother',
          'ref': 3
        },
        'relations': [
          {type: 'child', ref: 1, spouse: 2},
          {type: 'child', ref: 4, spouse: 2}
        ]
      },
      4: {
        'data': {
          'name': 'brother',
          'ref': 4
        }
      }
    }
  };
  var tree = json2Tree(jsonObject, 1);
  test.equal(tree.siblings1[0].data.name, 'brother', "brother of element #1 not found");
  test.done();
};

exports.testSpouses = function(test) {
  var jsonObject = {
    elements: {
      1: {
        'data': {
          'name': 'element #1',
          'ref': 1
        },
        'relations': [
          {type: 'spouse', ref: 2},
          {type: 'child', ref: 3, spouse: 2}
        ]
      },
      2: {
        'data': {
          'name': 'the wife',
          'ref': 2
        },
        'relations': [
          {type: 'spouse', ref: 1},
          {type: 'child', ref: 3, spouse: 1}
        ]
      },
      3: {
        'data': {
          'name': 'a child',
          'ref': 3
        },
        'relations': [
          {type: 'mother', ref: 1},
          {type: 'father', ref: 2}
        ]
      }
    }
  };
  var tree = json2Tree(jsonObject, 1);
  test.equal(tree.pedigree.spouses[0].data.name, 'the wife', "spouse of element #1 not found");
  test.equal(tree.pedigree.spouses[0].children[0].data.name, 'a child', "child of element #1 not found");
  test.done();
};

exports.testFatherSiblings = function(test) {
  var jsonObject = {
    elements: {
      1: {
        'data': {
          'name': 'element #1',
          'ref': 1
        },
        'relations': [
          {type: 'father', ref: 2},
          {type: 'mother', ref: 3}
        ]
      },
      2: {
        'data': {
          'name': 'the father',
          'ref': 2
        },
        'relations': [
          {type: 'child', ref: 1, spouse: 3},
          {type: 'father', ref: 5},
          {type: 'mother', ref: 6}
        ]
      },
      3: {
        'data': {
          'name': 'mother',
          'ref': 3
        },
        'relations': [
          {type: 'child', ref: 1, spouse: 2},
          {type: 'child', ref: 4, spouse: 2}
        ]
      },
      4: {
        'data': {
          'name': 'brother',
          'ref': 4
        },
        'relations': [
          {type: 'father', ref: 5},
          {type: 'mother', ref: 6}
        ]
      },
      5: {
        'data': {
          'name': 'grandfather',
          'ref': 5
        },
        'relations': [
          {type: 'child', ref: 2, spouse: 6},
          {type: 'child', ref: 4, spouse: 6},
          {type: 'spouse', ref: 6}
        ]
      },
      6: {
        'data': {
          'name': 'grandfather',
          'ref': 6
        },
        'relations': [
          {type: 'child', ref: 2, spouse: 5},
          {type: 'child', ref: 4, spouse: 5},
          {type: 'spouse', ref: 5}
        ]
      }
    }
  };
  var tree = json2Tree(jsonObject, 1);
  test.equal(tree.father_siblings[0].data.name, 'brother', "brother of father of element #1 not found");
  test.done();
};