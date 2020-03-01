var CalendarCommandRepo = function() {
  this.adapter = new GroupsSheetAdapter();
}

CalendarCommandRepo.prototype.save = function(calendars) {
  log_debug('CalendarCommandRepo.save start');

  this.adapter.clear();
  var insertValues = [];
  for (var idx in calendars.list()) {
    var calendar = calendars.list()[idx];
    insertValues.push(this._getRowValue(calendar));
  }
  this.adapter.insertBatch(insertValues);

  log_debug('CalendarCommandRepo.save end');
}

CalendarCommandRepo.prototype._getRowValue = function(calendar) {
  return this.adapter.getRowValue(
    calendar.group,
    calendar.name,
    calendar.color
    );
}


//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_CalendarCommandRepo() {
  LOG_LEVEL = LOG_LEVEL_DEBUG;

  var query = new CalendarQueryRepo();
  var calendars = query.findAll();
  log_debug('calendars.length: ' + calendars.length());

  var command = new CalendarCommandRepo();
  command.save(calendars);
}
