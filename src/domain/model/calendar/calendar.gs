var Calendar = function(id, name) {
  this.id = id;
  this.name = name;

  this._repo = new EventQueryRepo(name);
}

Calendar.prototype.toString = function() {
  return JSON.stringify(this.name);
}

Calendar.prototype.findEvents = function(fromDate, toDate) {
  return this._repo.find(fromDate, toDate);
}


//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_Calendar() {
  LOG_LEVEL = LOG_LEVEL_DEBUG;

//  var calendar = new Calendar('dummy', 'dummy');
//  -> raise error

  var calendar = new Calendar('dummy', 'home');
  var events = calendar.findEvents(new Date('2019-01-01'), new Date('2019-01-02'));
  log_debug('events.length: ' + events.length());
}
