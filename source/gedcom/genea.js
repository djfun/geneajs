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

var Indi = require('./indi').Indi;
var Event = require('./event').Event;
var GedcomDate = require('./gedcomdate').GedcomDate;

Genea = function(ged) {
/*
  var ged = {
    head: [],
    people: [],
    families: [],
    submitter: [],
    notes: [],
    objects:[],
    submission: [],
    sources: [],
    repositories: [],
    xref_people_mapping: {},
    xref_families_mapping: {},
    xref_submitter_mapping: {},
    xref_notes_mapping: {},
    xref_objects_mapping: {},
    xref_sources_mapping: {}
  };
*/
  this.people = ged.people.map(function(indi) {
    var newPerson = new Indi();
    var object, object1, object2, object3, object4;
    object = Genea.getTagObject('RESN', '1', indi);
    if (object) {
      newPerson.setRestrictionNotice(object.value);
    }
    object = Genea.getTagObject('NAME', 'N', indi);
    if (object) {
      // TODO: add aditional information for names from gedcom
      object.forEach(function(object) {
        var pos1 = object.value.search(/\//);
        var name1 = null;
        var name2 = null;
        var name3 = null;
        if (pos1 === -1) {
          name1 = object.value;
        } else {
          var pos2 = object.value.substr(pos1 + 1).search(/\//);
          if(pos1 > 0) {
            name1 = object.value.substr(0, pos1 - 1);
          }
          name2 = object.value.substr(pos1 + 1, pos2);
          var pos3 = pos1 + pos2;
          if (pos3 + 2 < object.value.length) {
            name3 = object.value.substr(pos2 + 1);
          }
        }
        newPerson.addName({
          name1: name1,
          name2: name2,
          name3: name3
        });
      });
    }
    object = Genea.getTagObject('SEX', '1', indi);
    if (object) {
      if (object.value === 'F') {
        newPerson.setSex('female');
      } else if (object.value === 'M') {
        newPerson.setSex('male');
      } else {
        newPerson.setSex('undefined');
      }
    }
    object = Genea.getTagObject('BIRT', 'N', indi);
    if (object) {
      object.forEach(function(object) {
        var birth = new Event({type: 'birth'});
        if (!object.value) {
          object1 = Genea.getTagObject('DATE', '1', object);
          if (object1) {
            birth.setDate(new GedcomDate(object1.value));
          }
          object1 = Genea.getTagObject('PLAC', '1', object);
          if (object1) {
            birth.setPlace(object1.value);
          }

          object1 = Genea.getTagObject('FAMC', '1', object);
          if (object1) {
            birth.setFamc(object1.value);
          }
        }
        newPerson.addEvent(birth);
      });
    }
    console.log(newPerson);
    return newPerson;
  });
};
Genea.getTagObject = function(tag, type, tag_object) {
  var returnObject = [];
  tag_object.data.forEach(function(dat) {
    if (dat.tag === tag) {
      returnObject.push(dat);
    }
  });
  if (type === '1') {
    return returnObject[0];
  } else {
    return returnObject;
  }
};
exports.Genea = Genea;