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

exports.gedcom2json = function gedcom2json(file_content) {
  var lines = file_content.split(/\n\r|\n|\r/);
  
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
  
  var mode = null;
  var open_objects = [];
  var prev_level = -1;
  var object;

  lines.forEach(function (line) {
    // we now read the GEDCOM file line by line
    var line_obj = parseLine(line);

    if (parseInt(line_obj.level, 10) <= parseInt(prev_level, 10)) {
      // add open objects to prev open object
      for (var level = open_objects.length - 1; level >= parseInt(line_obj.level, 10); level--) {
        if (level !== 0) {
          object = open_objects[level - 1];
          object.data.push(open_objects.pop());
        }
      }
    }
    
    if (line_obj.level === '0') {
      if (mode === 'INDI') {
        object = open_objects.pop();
        object.arr_id = ged.people.length;
        ged.xref_people_mapping[object.xref_id] = object.arr_id;
        ged.people.push(object);
        open_objects = [];
      } else if (mode === 'FAM') {
        object = open_objects.pop();
        object.arr_id = ged.families.length;
        ged.xref_families_mapping[object.xref_id] = object.arr_id;
        ged.families.push(object);
        open_objects = [];
      } else if (mode === 'HEAD') {
        ged.head.push(open_objects.pop());
        open_objects = [];
      } else if (mode === 'SUBM') {
        object = open_objects.pop();
        object.arr_id = ged.submitter.length;
        ged.xref_submitter_mapping[object.xref_id] = object.arr_id;
        ged.submitter.push(object);
        open_objects = [];
      } else if (mode === 'NOTE') {
        object = open_objects.pop();
        object.arr_id = ged.notes.length;
        ged.xref_notes_mapping[object.xref_id] = object.arr_id;
        ged.notes.push(object);
        open_objects = [];
      } else if (mode === 'OBJE') {
        object = open_objects.pop();
        object.arr_id = ged.objects.length;
        ged.xref_objects_mapping[object.xref_id] = object.arr_id;
        ged.objects.push(object);
        open_objects = [];
      } else if (mode === 'SUBN') {
        ged.submission.push(open_objects.pop());
        open_objects = [];
      } else if (mode === 'SOUR') {
        object = open_objects.pop();
        object.arr_id = ged.sources.length;
        ged.xref_sources_mapping[object.xref_id] = object.arr_id;
        ged.sources.push(object);
        open_objects = [];
      } else if (mode === 'REPO') {
        ged.repositories.push(open_objects.pop());
        open_objects = [];
      } else {
        if (mode !== null) {
          console.log("Could not interpret " + mode);
        }
        open_objects = [];
      }
      mode = line_obj.tag;
      open_objects[0] = {
        xref_id: line_obj.xref_id,
        tag: line_obj.tag,
        value: line_obj.value,
        data: []
      };
    } else {
      if (parseInt(line_obj.level, 10) <= parseInt(prev_level, 10) + 1) {
        // add to open object
        open_objects.push({
          tag: line_obj.tag,
          value: line_obj.value,
          xref_id: line_obj.xref_id,
          data: []
        });
      } else {
        // error
        var l = parseInt(prev_level, 10);
        var l1 = parseInt(line_obj.level, 10);
        if (line_obj.tag !== '') {
          console.error("Fehler: " + l1 + " - " + l);
          console.log(line_obj);
        }

        // try to recover
        line_obj.level = prev_level;
      }
    }
    prev_level = line_obj.level;
  });
  return ged;
};

function parseLine(line) {
  var line_obj = {};
  var next = 0;
  // level:
  if (line[1] === ' ') {
    line_obj.level = line[0];
    next = 2;
  } else {
    line_obj.level = line.substr(0,2);
    next = 3;
  }
  
  // xref-id
  if (line[next] === '@') {
    // search for next @ and cut that part out
    pos_at = line.substr(next + 1).search(/@/);
    pos_space = line.substr(next + 1).search(/ /);
    if (pos_at !== -1 && pos_at < pos_space) {
      line_obj.xref_id = line.substring(next, pos_at + next + 2);
      next = pos_at + next + 3;
    } else {
      line_obj.xref_id = null;
    }
  } else {
    line_obj.xref_id = null;
  }
  
  // tag
  pos_space = line.substr(next + 1).search(/ /);
  if (pos_space === -1) {
    pos_space = line.length - next - 1;
  }
  line_obj.tag = line.substr(next, pos_space + 1);
  next = pos_space + 2 + next;
  
  // value
  if (next < line.length) {
    line_obj.value = line.substr(next);
  } else {
    line_obj.value = null;
  }

  return line_obj;
}

exports.json2gedcom = function json2gedcom(ged) {
  var gedcom = [];
  // Header
  gedcom = gedcom.concat(json2gedcomRecur(ged.head, 0));
  // Submission
  gedcom = gedcom.concat(json2gedcomRecur(ged.submission, 0));
  // other records
    // submitter
    gedcom = gedcom.concat(json2gedcomRecur(ged.submitter, 0));
    // people
    gedcom = gedcom.concat(json2gedcomRecur(ged.people, 0));
    // families
    gedcom = gedcom.concat(json2gedcomRecur(ged.families, 0));
    // sources
    gedcom = gedcom.concat(json2gedcomRecur(ged.sources, 0));
    // repositories
    gedcom = gedcom.concat(json2gedcomRecur(ged.repositories, 0));
    // notes
    gedcom = gedcom.concat(json2gedcomRecur(ged.notes, 0));
    // objects
    gedcom = gedcom.concat(json2gedcomRecur(ged.objects, 0));

  var gedcomText =  gedcom.map(function(line) {
    return json2gedcomLine(line);
  });
  // TRLR
  gedcomText.push('0 TRLR');
  return gedcomText.join("\n");
};

function json2gedcomRecur(obj, level) {
  var ret = [];
  if (obj) {
    obj.forEach(function(o) {
      ret.push({
        xref_id: o.xref_id,
        tag: o.tag,
        value: o.value,
        level: level
      });
      ret = ret.concat(json2gedcomRecur(o.data, level + 1));
    });
  }
  return ret;
}

function json2gedcomLine(line_obj) {
  var line = [];
  line.push(line_obj.level);
  if (line_obj.xref_id) {
    line.push(line_obj.xref_id);
  }
  line.push(line_obj.tag);
  if (line_obj.value) {
    line.push(line_obj.value);
  }
  var lineText = line.join(' ');

  // special case for cont
  if (line_obj.tag === 'CONT' && line_obj.value === null) {
    lineText+=' ';
  }
  return lineText;
}