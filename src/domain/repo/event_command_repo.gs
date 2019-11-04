var EventCommandRepo = function() {
  this.adapter = new HistorySheetAdapter();
}

EventCommandRepo.prototype.save = function(events) {
  log_debug('EventCommandRepo.save start');

  var insertValues = [];
  for (var idx in events.list()) {
    var event = events.list()[idx];
    insertValues.push(this._getRowValue(event));
  }
  this.adapter.insertBatch(insertValues);

  log_debug('EventCommandRepo.save end');
}

EventCommandRepo.prototype._getRowValue = function(event) {
  return this.adapter.getRowValue(
    event.calendarName,
    event.title,
    event.startDayOfWeek,
    event.startDate,
    event.startTime,
    event.duration
    );
}


//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_EventCommandRepo() {
  LOG_LEVEL = LOG_LEVEL_DEBUG;

  var calendarName = 'home';
  var query = new EventQueryRepo(calendarName);
  var events = query.find(new Date('2019-01-01'), new Date('2019-01-02'));
  log_debug('events.length: ' + events.length());

  var command = new EventCommandRepo();
  command.save(events);
}
