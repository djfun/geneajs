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

function compare (a, b) {
  if (a == b) {
    return 0;
  }
  return a > b ? 1 : -1;
}

GenDate = function (day, month, year, accuracy) {
  this.day = parseInt(day, 10) || 0;
  this.month = parseInt(month, 10) || 0;
  this.year = parseInt(year, 10) || 0;
  this.accuracy = accuracy;
  if (!this.accuracy) {
    this.accuracy = this.day !== 0 ? 'day' :
      this.month !== 0 ? 'month' : 'year';
  }
};

compareGenDate = function(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    return null;
  }
  if (!firstDate.accuracy || !secondDate.accuracy) {
    return null;
  }
  var ret = 0;
  if (firstDate.accuracy === 'year' || secondDate.accuracy === 'year') {
    ret = compare(firstDate.year, secondDate.year);
  } else if (firstDate.accuracy === 'month' || secondDate.accuracy === 'month') {
    ret = compare(firstDate.year, secondDate.year);
    if (ret === 0) {
      ret = compare(firstDate.month, secondDate.month);
    }
  } else {
    ret = compare(firstDate.year, secondDate.year);
    if (ret === 0) {
      ret = compare(firstDate.month, secondDate.month);
      if (ret === 0) {
        ret = compare(firstDate.day, secondDate.day);
      }
    }
  }
  return ret;
};

if (typeof exports !== 'undefined') {
  exports.GenDate = GenDate;
  exports.compareGenDate = compareGenDate;
}