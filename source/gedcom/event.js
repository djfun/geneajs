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

var inherit = (function() {
  var F = function() {};
  return function (C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  };
})();

var Event = function(e) {
  // TODO: add checks
  this._type = e._type;
  this.type = e.type;
  this.place = e.place;
  this.date = new GedcomDate(e.date);
  this.address = e.address;
  this.agency = e.agency;
  this.religion = e.religion;
  this.cause = e.cause;
  this.restriction_notice = e.restriction_notice;
  this.notes = e.notes ? e.notes : [];
  this.sources = e.sources ? e.sources : [];
  this.multimedia = e.multimedia ? e.multimedia : [];
};
Event.prototype.setType = function(type) {
  this.type = type;
};
Event.prototype.setPlace = function(place) {
  this.place = place;
};
Event.prototype.setDate = function(date) {
  this.date = new GedcomDate(date);
};
Event.prototype.setAddress = function(address) {
  this.address = address;
};
Event.prototype.setAgency = function(agency) {
  this.agency = agency;
};
Event.prototype.setReligion = function(religion) {
  this.religion = religion;
};
Event.prototype.setCause = function(cause) {
  this.cause = cause;
};
Event.prototype.setRestrictionNotice = function(restriction_notice) {
  this.restriction_notice = restriction_notice;
};
Event.prototype.addNote = function(e) {
  this.notes.push(e);
};

var IndividualEvent = function(e) {
  Event.call(this, e);
  this.age = e.age;
};
inherit(IndividualEvent, Event);
IndividualEvent.setAge = function(age) {
  this.age = age;
};

var BirthEvent = function(e) {
  IndividualEvent.call(this, e);
  this.famc = e.famc;
};
inherit(BirthEvent, IndividualEvent);
BirthEvent.prototype.setFamc = function(xref_id) {
  this.famc = xref_id;
};

var ChristeningEvent = BirthEvent;
var DeathEvent = IndividualEvent;
var BurialEvent = IndividualEvent;
var CremationEvent = IndividualEvent;

var AdoptionEvent = function(e) {
  IndividualEvent.call(this, e);
  this.famc = e.famc;
  this.adopted_by = e.adopted_by;
};
inherit(AdoptionEvent, IndividualEvent);
AdoptionEvent.prototype.setFamc = function(xref_id) {
  this.famc = xref_id;
};
AdoptionEvent.prototype.setAdoptedBy = function(value) {
  this.adopted_by = value;
};

var BaptismEvent = IndividualEvent;
var BarMitzvahEvent = IndividualEvent;
var BasMitzvahEvent = IndividualEvent;
var BlesEvent = IndividualEvent;

var AdultChristeningEvent = IndividualEvent;
var ConfirmationEvent = IndividualEvent;
var FirstCommunionEvent = IndividualEvent;
var OrdinationEvent = IndividualEvent;

var NaturalizationEvent = IndividualEvent; // Einbürgerung
var EmigrationEvent = IndividualEvent;
var ImmigrationEvent = IndividualEvent;

var CensusEvent = IndividualEvent;
var ProbateEvent = IndividualEvent; // Testament
var WillEvent = IndividualEvent;

var GradEvent = IndividualEvent;
var RetiEvent = IndividualEvent;

var FamilyEvent = function(e) {
  Event.call(this, e);
  this.husband_age = e.husband_age;
  this.wife_age = e.wife_age;
};
inherit(FamilyEvent, Event);
FamilyEvent.prototype.setHusbandAge = function(age) {
  this.husband_age = age;
};
FamilyEvent.prototype.setWifeAge = function(age) {
  this.wife_age = age;
};

exports.Event = Event;
exports.IndividualEvent = IndividualEvent;
exports.BirthEvent = BirthEvent;
exports.ChristeningEvent = ChristeningEvent;
exports.DeathEvent = DeathEvent;
exports.BurialEvent = BurialEvent;
exports.CremationEvent  = CremationEvent;
exports.AdoptionEvent = AdoptionEvent;
exports.BaptismEvent = BaptismEvent;
exports.BarMitzvahEvent = BarMitzvahEvent;
exports.BasMitzvahEvent = BasMitzvahEvent;
exports.BlesEvent = BlesEvent;
exports.AdultChristeningEvent = AdultChristeningEvent;
exports.ConfirmationEvent = ConfirmationEvent;
exports.FirstCommunionEvent = FirstCommunionEvent;
exports.OrdinationEvent = OrdinationEvent;
exports.NaturalizationEvent = NaturalizationEvent;
exports.EmigrationEvent = EmigrationEvent;
exports.ImmigrationEvent = ImmigrationEvent;
exports.CensusEvent = CensusEvent;
exports.ProbateEvent = ProbateEvent;
exports.WillEvent = WillEvent;
exports.GradEvent = GradEvent;
exports.RetiEvent = RetiEvent;
exports.FamilyEvent = FamilyEvent;