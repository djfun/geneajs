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

var Indi = function() {
  this.names = [];
  this.restriction_notice = null;
  this.sex = 'unknown';
  this.events = [];
};

Indi.prototype.getFullName = function() {
  
};
Indi.prototype.getFamC = function() {

};
Indi.prototype.getFamS = function() {

};
Indi.prototype.getSex = function() {

};
Indi.prototype.setRestrictionNotice = function(value) {
  // TODO: add check
  this.restriction_notice = value;
  return true;
};
Indi.prototype.setSex = function(value) {
  if (value === 'male' || value === 'female' || value === 'undefined') {
    this.sex = value;
  } else {
    return false;
  }
};
Indi.prototype.addName = function(name) {
  // TODO: add check
  this.names.push(name);
  return true;
};
Indi.prototype.addEvent = function(e) {
  this.events.push(e);
};

exports.Indi = Indi;