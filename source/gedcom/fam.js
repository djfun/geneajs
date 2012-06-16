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

var Family = function() {
  this.restriction_notice = null;
  this.events = [];
  this.notes = [];
  this.children = [];
  this.husband = null;
  this.wife = null;
};

Family.prototype.setRestrictionNotice = function(value) {
  // TODO: add check
  this.restriction_notice = value;
  return true;
};
Family.prototype.setHusband = function(husb) {
  this.husband = husb;
};
Family.prototype.setWife = function(wife) {
  this.wife = wife;
};
Family.prototype.addChild = function(child) {
  this.children.push(child);
};
Family.prototype.addEvent = function(e) {
  this.events.push(e);
};
Family.prototype.addNote = function(e) {
  this.notes.push(e);
};

exports.Family = Family;