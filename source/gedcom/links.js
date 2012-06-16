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
var inherit = (function() {
  var F = function() {};
  return function (C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  };
})();

var Link = function(e) {
  // TODO: add checks
  this._type = e._type;
  this.notes = e.notes ? e.notes : [];
};
Link.prototype.addNote = function(note) {
  this.notes.push(note);
};

var ToFamilyLink = function(e) {
  Link.call(this, e);
  this.famRef = e.famRef;
};
inherit(ToFamilyLink, Link);
ToFamilyLink.prototype.setFamRef = function(ref) {
  this.famRef = ref;
};

var ChildToFamilyLink = function(e) {
  ToFamilyLink.call(this, e);
  this.linkageType = e.linkageType;
  this.linkageStatus = e.linkageStatus;
};
inherit(ChildToFamilyLink, ToFamilyLink);
ChildToFamilyLink.prototype.setLinkageType = function(type) {
  this.linkageType = type;
};
ChildToFamilyLink.prototype.setLinkageStatus = function(status) {
  this.linkageStatus = status;
};

var SpouseToFamilyLink = function(e) {
  ToFamilyLink.call(this, e);
};
inherit(SpouseToFamilyLink, ToFamilyLink);

var AssociationStructure = function(e) {
  Link.call(this, e);
  this.relationDesc = e.relationDesc;
  this.indiRef = e.indiRef;
};
inherit(AssociationStructure, Link);
AssociationStructure.prototype.setRelationDesc = function(desc) {
  this.relationDesc = desc;
};
AssociationStructure.prototype.setIndiRef = function(ref) {
  this.indiRef = ref;
};

exports.Link = Link;
exports.ChildToFamilyLink = ChildToFamilyLink;
exports.SpouseToFamilyLink = SpouseToFamilyLink;
exports.AssociationStructure = AssociationStructure;