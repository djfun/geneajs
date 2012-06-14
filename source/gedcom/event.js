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

var Event = function(e) {
  // TODO: add checks
  this.type = e.type;
  this.place = e.place;
  this.date = e.date;
};
Event.prototype.setPlace = function(place) {
  this.place = place;
};
Event.prototype.setDate = function(date) {
  this.date = date;
};
Event.prototype.setFamc = function(xref_id) {
  this.famc = xref_id;
};

exports.Event = Event;