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
var GedcomDate = require('./gedcomdate').GedcomDate;
var Events = require('./event');

var inherit = (function() {
  var F = function() {};
  return function (C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  };
})();

var IndividualAttribute = function(e) {
  // TODO: add checks
  this._type = e._type;
};
inherit(IndividualAttribute, Events.IndividualEvent);

var CasteNameAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.casteName = e.casteName;
};
inherit(CasteNameAttr, IndividualAttribute);
CasteNameAttr.prototype.setCasteName = function(name) {
  this.casteName = name;
};

var PhysicalDescriptionAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.description = e.description;
};
inherit(PhysicalDescriptionAttr, IndividualAttribute);
PhysicalDescriptionAttr.prototype.setDescription = function(desc) {
  this.description = desc;
};

var ScholasticAchievementAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.education = e.education;
};
inherit(ScholasticAchievementAttr, IndividualAttribute);
ScholasticAchievementAttr.prototype.setEducation = function(educ) {
  this.education = educ;
};
var NationalIDNumberAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.nationalIDNumber = e.nationalIDNumber;
};
inherit(NationalIDNumberAttr, IndividualAttribute);
NationalIDNumberAttr.prototype.setNationalIDNumber = function(number) {
  this.nationalIDNumber = number;
};
var NationalOrTribalOriginAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.origin = e.origin;
};
inherit(NationalOrTribalOriginAttr, IndividualAttribute);
NationalOrTribalOriginAttr.prototype.setOrigin = function(origin) {
  this.origin = origin;
};
var CountOfChildrenAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.countOfChildren = e.countOfChildren;
};
inherit(CountOfChildrenAttr, IndividualAttribute);
CountOfChildrenAttr.prototype.setCountOfChildren = function(count) {
  this.countOfChildren = count;
};
var CountOfMarriagesAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.countOfMarriages = e.countOfMarriages;
};
inherit(CountOfMarriagesAttr, IndividualAttribute);
CountOfMarriagesAttr.prototype.setCountOfMarriages = function(count) {
  this.countOfMarriages = count;
};
var OccupationAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.occupation = e.occupation;
};
inherit(OccupationAttr, IndividualAttribute);
OccupationAttr.prototype.setOccupation = function(occu) {
  this.occupation = occu;
};
var PossessionsAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.possesions = e.possesions;
};
inherit(PossessionsAttr, IndividualAttribute);
PossessionsAttr.prototype.setPossessions = function(possessions) {
  this.possesions = possessions;
};
var ReligionAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.religion = e.religion;
};
inherit(ReligionAttr, IndividualAttribute);
ReligionAttr.prototype.setReligion = function(reli) {
  this.religion = reli;
};
var ResidenceAttr = function(e) {
  IndividualAttribute.call(this, e);
};
inherit(ResidenceAttr, IndividualAttribute);
var SocialSecurityNumberAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.socialSecurityNumber = e.socialSecurityNumber;
};
inherit(SocialSecurityNumberAttr, IndividualAttribute);
SocialSecurityNumberAttr.prototype.setSocialSecurityNumber = function(number) {
  this.socialSecurityNumber = number;
};
var NobilityTypeTitleAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.nobilityTypeTitle = e.nobilityTypeTitle;
};
inherit(NobilityTypeTitleAttr, IndividualAttribute);
NobilityTypeTitleAttr.prototype.setNobilityTypeTitle = function(title) {
  this.nobilityTypeTitle = title;
};
var FactAttr = function(e) {
  IndividualAttribute.call(this, e);
  this.fact = e.fact;
};
inherit(FactAttr, IndividualAttribute);
FactAttr.prototype.setFact = function(fact) {
  this.fact = fact;
};

exports.CasteNameAttr = CasteNameAttr;
exports.PhysicalDescriptionAttr = PhysicalDescriptionAttr;
exports.ScholasticAchievementAttr = ScholasticAchievementAttr;
exports.NationalIDNumberAttr = NationalIDNumberAttr;
exports.NationalOrTribalOriginAttr = NationalOrTribalOriginAttr;
exports.CountOfChildrenAttr = CountOfChildrenAttr;
exports.CountOfMarriagesAttr = CountOfMarriagesAttr;
exports.OccupationAttr = OccupationAttr;
exports.PossessionsAttr = PossessionsAttr;
exports.ReligionAttr = ReligionAttr;
exports.ResidenceAttr = ResidenceAttr;
exports.SocialSecurityNumberAttr = SocialSecurityNumberAttr;
exports.NobilityTypeTitleAttr = NobilityTypeTitleAttr;
exports.FactAttr = FactAttr;