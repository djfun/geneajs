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
var GedcomDate = require('./gedcomdate');

var NoteStructure = function(e) {
  this.note_ref = e.note_ref;
  this.submitter_text = e.submitter_text;
};
NoteStructure.prototype.setNoteRef = function(ref) {
  this.note_ref = ref;
};
NoteStructure.prototype.setSubmitterText = function(text) {
  this.submitter_text = text;
};

var NoteRecord = function(e) {
  this.xref = e.xref;
  this.submitter_text = e.submitter_text;
  this.user_references = e.user_references ? e.user_references : [];
  this.record_id = e.record_id;
  this.sources = e.sources ? e.sources : [];
  this.change_date = new GedcomDate.ChangeDate(e.change_date);
};
NoteRecord.prototype.setXref = function(xref_id) {
  this.xref = xref_id;
};
NoteRecord.prototype.setSubmitterText = function(text) {
  this.submitter_text = text;
};
NoteRecord.prototype.addUserReference = function(reference) {
  this.user_references.push(reference);
};
NoteRecord.prototype.setRecordID = function(rin) {
  this.record_id = rin;
};
NoteRecord.prototype.addSource = function(source) {
  this.sources.push(source);
};
NoteRecord.prototype.setChangeDate = function(change_date) {
  this.change_date = new GedcomDate.ChangeDate(change_date);
};

exports.NoteStructure = NoteStructure;
exports.NoteRecord = NoteRecord;