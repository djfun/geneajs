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

var uuid = require('node-uuid');

var JsonObject = {
  addElement: function(object, element, successCallback) {
    Datastore.addElement(function(newRef, newData) {
      object.elements[newRef] = newData;
    }, element, successCallback);
  },
  deleteElement: function(object, ref) {
    Datastore.deleteElement(function(ref, foundCallback) {
      foundCallback.call(this, object.elements[ref]);
    }, function(ref, data) {
      object.elements[ref] = data;
    }, function(ref) {
      delete object.elements[ref];
    }, ref);
  },
  addParentChildRelation: function(object, father, mother, child) {
    Datastore.addParentChildRelation(function(ref, foundCallback) {
      foundCallback.call(this, object.elements[ref]);
    }, function(ref, data) {
      object.elements[ref] = data;
    }, father, mother, child);
  },
  addSimpleRelation: function(object, ref1, ref2, type) {
    Datastore.addSimpleRelation(function(ref, foundCallback) {
      foundCallback.call(this, object.elements[ref]);
    }, function(ref, data) {
      object.elements[ref] = data;
    }, ref1, ref2, type);
  },
  deleteParentChildRelation: function(object, father, mother, child) {
    Datastore.deleteParentChildRelation(function(ref, foundCallback) {
      foundCallback.call(this, object.elements[ref]);
    }, function(ref, data) {
      object.elements[ref] = data;
    }, father, mother, child);
  },
  deleteSimpleRelation: function(object, ref1, ref2, type) {
    Datastore.deleteSimpleRelation(function(ref, foundCallback) {
      foundCallback.call(this, object.elements[ref]);
    }, function(ref, data) {
      object.elements[ref] = data;
    }, ref1, ref2, type);
  },
  getRelationsByType: function(object, ref, type, successCallback) {
    Datastore.getRelationsByType(function(ref, foundCallback) {
      foundCallback.call(this, object.elements[ref]);
    }, ref, type, successCallback);
  }
};

var Datastore = {
  addElement: function(saveCallback, element, successCallback) {
    var newRef = getNewElementRef();
    var newData = {};
    newData.data = element;
    newData.data.ref = newRef;
    newData.relations = [];
    saveCallback.call(this, newRef, newData);
    successCallback.call(this, newRef);
  },
  deleteElement: function(getCallback, updateCallback, deleteCallback, ref) {
    getCallback.call(this, ref, function(data) {
      data.relations.forEach(function(relation, rel_ind, relations) {
        if (relation.type == 'childParent') {
          Datastore._deleteRelation(getCallback, updatecallback, relation.ref, ref, 'parentChild');
          Datastore._deleteRelation(getCallback, updatecallback, relation.spouse, ref, 'parentChild');
        } else if (relation.type == 'parentChild') {
          Datastore._deleteRelation(getCallback, updatecallback, relation.ref, ref, 'childParent');
        } else {
          Datastore._deleteRelation(getCallback, updatecallback, relation.ref, ref, relation.type);
        }
      });
      deleteCallback.call(this, ref);
    });
  },
  addParentChildRelation: function(getCallback, updateCallback, father, mother, child) {
    getCallback.call(this, child, function(data) {
      data.relations.push({
        type: 'childParent',
        subtype: 'father',
        ref: father
      });
      data.relations.push({
        type: 'childParent',
        subtype: 'mother',
        ref: mother
      });
      updateCallback.call(this, child, data);
    });
    getCallback.call(this, father, function(data) {
      data.relations.push({
        type: 'parentChild',
        ref: child,
        spouse: mother
      });
      updateCallback.call(this, father, data);
    });
    getCallback.call(this, mother, function(data) {
      data.relations.push({
        type: 'parentChild',
        ref: child,
        spouse: father
      });
      updateCallback.call(this, mother, data);
    });
  },
  addSimpleRelation: function(getCallback, updateCallback, ref1, ref2, type) {
    getCallback.call(this, ref1, function(data) {
      data.relations.push({
        type: type,
        ref: ref2
      });
      updateCallback.call(this, ref1, data);
    });
    getCallback.call(this, ref2, function(data) {
      data.relations.push({
        type: type,
        ref: ref1
      });
      updateCallback.call(this, ref2, data);
    });
  },
  deleteParentChildRelation: function(getCallback, updateCallback, father, mother, child) {
    Datastore._deleteRelation.call(this, getCallback, updateCallback, father, child, 'childParent');
    Datastore._deleteRelation.call(this, getCallback, updateCallback, mother, child, 'childParent');
    Datastore._deleteRelation.call(this, getCallback, updateCallback, child, father, 'parentChild');
    Datastore._deleteRelation.call(this, getCallback, updateCallback, child, mother, 'parentChild');
  },
  deleteSimpleRelation: function(getCallback, updateCallback, ref1, ref2, type) {
    Datastore._deleteRelation.call(this, getCallback, updateCallback, ref1, ref2, type);
    Datastore._deleteRelation.call(this, getCallback, updateCallback, ref2, ref1, type);
  },
  _deleteRelation: function(getCallback, updateCallback, ref1, ref2, type) {
    getCallback.call(this, ref1, function(data) {
      data.relations.forEach(function(relation, rel_ind, relations) {
        if (relation.type === type &&
          relation.ref === ref2) {
          delete data.relations[rel_ind];
        }
      });
      updateCallback.call(this, ref1, data);
    });
  },
  getRelationsByType: function(getCallback, ref, type, successCallback) {
    var ret = [];
    getCallback.call(this, ref, function(data) {
      if (data.relations) {
        data.relations.filter(function(element) {
          if (element.type == type) {
            ret.push(element);
          }
        });
      }
      successCallback.call(this, ret);
    });
  }
};


function getNewElementRef() {
  return uuid.v4();
}


if (typeof exports !== 'undefined') {
  exports.JsonObject = JsonObject;
  exports.Datastore = Datastore;
}