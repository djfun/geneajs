var GenDate = require('../source/date').GenDate;
var compareGenDate = require('../source/date').compareGenDate;

exports.testExactAccuracy = function(test) {
  var d = new GenDate(14, 11, 2013);

  test.equal(d.accuracy, 'day', "did not recognize exact accuracy");
  test.equal(d.day, 14, "did not recognize day");
  test.equal(d.month, 11, "did not recognize month");
  test.equal(d.year, 2013, "did not recognize year");
  test.done();
};

exports.testMonthAccuracy = function(test) {
  var d = new GenDate(14, 11, 2013, 'month');

  test.equal(d.accuracy, 'month', "did not recognize accuracy 'month'");
  test.done();
};

exports.testAccuracyWithNullValues = function(test) {
  var d = new GenDate(null, null, 2013);

  test.equal(d.accuracy, 'year', "did not recognize accuracy with null values");
  test.done();
};

exports.testCompareDatesYear = function(test) {
  var d1 = new GenDate(14, 11, 2013);
  var d2 = new GenDate(null, null, 2013);

  test.equal(compareGenDate(d1, d2), 0);
  test.done();
};

exports.testCompareDatesMonth = function(test) {
  var d1 = new GenDate(0, 10, 2013, 'month');
  var d2 = new GenDate(14, 11, 2013);

  test.equal(compareGenDate(d1, d2), -1);
  test.done();
};

exports.testCompareDatesExact = function(test) {
  var d1 = new GenDate(1, 2, 1970);
  var d2 = new GenDate(1, 1, 1970);

  test.equal(compareGenDate(d1, d2), 1);
  test.done();
};