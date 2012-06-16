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
var Name = function(e) {
  this.name1 = e.name1;
  this.name2 = e.name2;
  this.name3 = e.name3;
  this.notes = e.notes ? e.notes : [];
};
Name.prototype.setName1 = function(name) {
  this.name1 = name;
};
Name.prototype.setName2 = function(name) {
  this.name2 = name;
};
Name.prototype.setName3 = function(name) {
  this.name3 = name;
};
Name.prototype.addNote = function(note) {
  this.notes.push(note);
};

exports.Name = Name;