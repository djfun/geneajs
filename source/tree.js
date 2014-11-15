/*
  This file is part of geneajs.
  geneajs is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  geneajs is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with geneajs.  If not, see <http://www.gnu.org/licenses/>.
*/

// transforms a javascript object with elements and relations into the tree structure
// needed by chart.js
function json2Tree(jsonObject, ref) {
  return datastore2Tree(function(ref) {
    return jsonObject.elements[ref];
  }, ref);
}

function datastore2Tree(getCallback, ref) {
  var element = getCallback.call(this, ref);
  
  var myTree = {
    father: getFather(getCallback, element),
    mother: getMother(getCallback, element),
    siblings1: getSiblings(getCallback, element, element.data.birth, -1),
    siblings2: getSiblings(getCallback, element, element.data.birth, 1),
    father_siblings: getSiblings(getCallback, getFatherElement(getCallback, element)),
    mother_siblings: getSiblings(getCallback, getMotherElement(getCallback, element)),
    pedigree: {
      data: element.data,
      spouses: getSpouses(getCallback, element)
    }
  };
  return myTree;
}



// returns father and his ancestors
function getFather(getCallback, element) {
  var father = getFatherElement(getCallback, element);
  if (father) {
    return {
      data: father.data,
      father: getFather(getCallback, father),
      mother: getMother(getCallback, father)
    };
  } else {
    return false;
  }
}
// returns mother and her ancestors
function getMother(getCallback, element) {
  var mother = getMotherElement(getCallback, element);
  if (mother) {
    return {
      data: mother.data,
      father: getFather(getCallback, mother),
      mother: getMother(getCallback, mother)
    };
  } else {
    return false;
  }
}
// returns father of the element
function getFatherElement(getCallback, element) {
  var fatherElement = false;
  if (element.relations) {
    element.relations.forEach(function(rel, rel_ind, relations) {
      if (rel.type === 'childParent' && rel.subtype == 'father') {
        fatherElement = getCallback.call(this, rel.ref);
      }
    });
  }
  return fatherElement;
}
// returns mother of the element
function getMotherElement(getCallback, element) {
  var motherElement = false;
  if (element.relations) {
    element.relations.forEach(function(rel, rel_ind, relations) {
      if (rel.type === 'childParent' && rel.subtype == 'mother') {
        motherElement = getCallback.call(this, rel.ref);
      }
    });
  }
  return motherElement;
}
// returns for now all siblings of the element with spouse(s) and children
function getSiblings(getCallback, element, compareDate, compareResult) {
  var mother = getMotherElement(getCallback, element);
  var father = getFatherElement(getCallback, element);

  var siblings = [];
  var child;
  var addPerson = true;
  var notComparable = false;
  var actualCompareResult;

  if (mother.relations && father.relations) {
    mother.relations.forEach(function (rel, rel_ind, relations) {
      if (rel.type === 'parentChild') {
        if (rel.spouse === father.data.ref && rel.ref !== element.data.ref) {
          child = getCallback.call(this, rel.ref);
          addPerson = true;
          notComparable = false;

          if (compareResult) {
            actualCompareResult = compareGenDate(compareDate, child.data.birth);

            if (actualCompareResult === null) {
              notComparable = true;
            } else if (actualCompareResult === compareResult * -1) {
              addPerson = false;
            }

            // add non-comparable persons to right-hand side
            if (compareResult === 1 && notComparable) {
              addPerson = true;
              notComparable = false;
            }
          }
          if (addPerson && !notComparable) {
            siblings.push({
              data: child.data,
              spouses: getSpouses(getCallback, child)
            });
          }
        }
      }
    });
  }
  if (siblings.length === 0) {
    return false;
  } else {
    return siblings;
  }
}
// returns spouses of the element with their children
function getSpouses(getCallback, element) {
  var spouses = [], spouse;
  var spouse_refs = [];
  var children_refs_for_spouse = {};
  var children, child;
  var ref;

  if (element.relations) {
    element.relations.forEach(function(rel, rel_ind, relations) {
      if (rel.type === 'spouse') {
        spouse_refs.push(rel.ref);
        if (!children_refs_for_spouse[rel.ref]) {
          children_refs_for_spouse[rel.ref] = [];
        }
      }
      if (rel.type === 'parentChild') {
        if (!children_refs_for_spouse[rel.spouse]) {
          children_refs_for_spouse[rel.spouse] = [];
        }
        children_refs_for_spouse[rel.spouse].push(rel.ref);
      }
    });

    for (var ref_ind in spouse_refs) {
      if (spouse_refs.hasOwnProperty(ref_ind)) {
        ref = spouse_refs[ref_ind];
        children = [];
        spouse = getCallback.call(this, ref);
        children_refs_for_spouse[ref].forEach(function(c_ref, c_ref_ind, c_refs) {
          child = getCallback.call(this, c_ref);
          children.push({
            data: child.data,
            spouses: getSpouses(getCallback, child)
          });
        });
        spouses.push({
          data: spouse.data,
          children: children
        });
      }
    }
  }
  if (spouses.length === 0) {
    return false;
  } else {
    return spouses;
  }
}

if (typeof exports !== 'undefined') {
  exports.json2Tree = json2Tree;
  exports.datastore2Tree = datastore2Tree;
}