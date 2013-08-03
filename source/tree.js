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
  var element = jsonObject.elements[ref];
  
  var myTree = {
    father: getFather(jsonObject, element),
    mother: getMother(jsonObject, element),
    siblings1: getSiblings1(jsonObject, element),
    father_siblings: getSiblings1(jsonObject, getFatherElement(jsonObject, element)),
    mother_siblings: getSiblings1(jsonObject, getMotherElement(jsonObject, element)),
    pedigree: {
      data: element.data,
      spouses: getSpouses(jsonObject, element)
    }
  };
  return myTree;
}
// returns father and his ancestors
function getFather(jsonObject, element) {
  var father = getFatherElement(jsonObject, element);
  if (father) {
    return {
      data: father.data,
      father: getFather(jsonObject, father),
      mother: getMother(jsonObject, father)
    };
  } else {
    return false;
  }
}
// returns mother and her ancestors
function getMother(jsonObject, element) {
  var mother = getMotherElement(jsonObject, element);
  if (mother) {
    return {
      data: mother.data,
      father: getFather(jsonObject, mother),
      mother: getMother(jsonObject, mother)
    };
  } else {
    return false;
  }
}
// returns father of the element
function getFatherElement(jsonObject, element) {
  var fatherElement = false;
  if (element.relations) {
    element.relations.forEach(function(rel, rel_ind, relations) {
      if (rel.type === 'father') {
        fatherElement = jsonObject.elements[rel.ref];
      }
    });
  }
  return fatherElement;
}
// returns mother of the element
function getMotherElement(jsonObject, element) {
  var motherElement = false;
  if (element.relations) {
    element.relations.forEach(function(rel, rel_ind, relations) {
      if (rel.type === 'mother') {
        motherElement = jsonObject.elements[rel.ref];
      }
    });
  }
  return motherElement;
}
// returns for now all siblings of the element with spouse(s) and children
function getSiblings1(jsonObject, element) {
  var mother = getMotherElement(jsonObject, element);
  var father = getFatherElement(jsonObject, element);

  var siblings = [];
  var child;

  if (mother.relations && father.relations) {
    mother.relations.forEach(function (rel, rel_ind, relations) {
      if (rel.type === 'child') {
        if (rel.spouse === father.data.ref && rel.ref !== element.data.ref) {
          child = jsonObject.elements[rel.ref];
          siblings.push({
            data: child.data,
            spouses: getSpouses(jsonObject, child)
          });
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
function getSpouses(jsonObject, element) {
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
      if (rel.type === 'child') {
        if (!children_refs_for_spouse[rel.spouse]) {
          children_refs_for_spouse[rel.spouse] = [];
        }
        children_refs_for_spouse[rel.spouse].push(rel.ref);
      }
    });

    for (var ref_ind in spouse_refs) {
      ref = spouse_refs[ref_ind];
      children = [];
      spouse = jsonObject.elements[ref];
      children_refs_for_spouse[ref].forEach(function(c_ref, c_ref_ind, c_refs) {
        child = jsonObject.elements[c_ref];
        children.push({
          data: child.data,
          spouses: getSpouses(jsonObject, child)
        });
      });
      spouses.push({
        data: spouse.data,
        children: children
      });
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
}