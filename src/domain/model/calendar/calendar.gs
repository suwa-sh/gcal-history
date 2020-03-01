var Calendar = function(id, name, color, group) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.group = group;

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

//  var calendar = new Calendar('dummy', 'dummy', 'group');
//  -> raise error

  var calendar = new Calendar('dummy', '@home', 'group');
  var events = calendar.findEvents(new Date('2019-01-01'), new Date('2019-01-02'));
  log_debug('events.length: ' + events.length());
}
