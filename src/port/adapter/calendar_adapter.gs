var __calendarAdapter = null;

function NewCalendarAdapter() {
  if (__calendarAdapter != null) { return __calendarAdapter; }
  __calendarAdapter = new CalendarAdapter();
  return __calendarAdapter;
}

var CalendarAdapter = function() {
  var gcals = CalendarApp.getAllCalendars();
  this._names = this._calendarNames(gcals);
  this._map = this._calendarMap(gcals);
}

CalendarAdapter.prototype._calendarNames = function(gcals) {
  var names = [];
  for (var idx in gcals) {
    var curGcal = gcals[idx];
    names.push(curGcal.getName())
  }
  return names;
}

CalendarAdapter.prototype._calendarMap = function(gcals) {
  var map = {};
  for (var idx in gcals) {
    var curGcal = gcals[idx];
    map[curGcal.getName()] = curGcal;
  }
  return map;
}


CalendarAdapter.prototype.names = function() {
  return this._names;
}
CalendarAdapter.prototype.findByName = function(name) {
  return this._map[name];
}


CalendarAdapter.prototype.findEvents = function(name, fromDate, toDate) {
  log_debug("CalendarAdapter.findEvents(" + name + ", " + fromDate + ", " + toDate + ")");
  var gcal = this.findByName(name);
  if (isNull(gcal)) throw new Error(name + ' カレンダーは存在しません。');
  return gcal.getEvents(fromDate, toDate);
}



//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_CalendarAdapter() {
  LOG_LEVEL = LOG_LEVEL_TRACE;
  var adapter = new CalendarAdapter();
  
  var calendarNames = adapter.names();
  for (var idx in calendarNames) {
    var curName = calendarNames[idx];
    log_debug('curCalendar: ' + curName);

    var events = adapter.findEvents(curName, new Date('2019-10-01'), new Date('2019-10-31'));
    for (var event_idx in events) {
    
      var curEvent = events[event_idx];
      var startTime = curEvent.getStartTime();
      var endTime = curEvent.getEndTime();

      var startWeekDay = Utilities.formatDate(startTime, 'Asia/Tokyo', 'DDD')
      var startDate = Utilities.formatDate(startTime, 'Asia/Tokyo', 'yyyy-MM-dd')
      var startAt = Utilities.formatDate(startTime, 'Asia/Tokyo', 'HH:mm')
      var duration_sec = (endTime - startTime) / 1000;
      var duration = timeFormat(duration_sec);
      log_debug('-- ' + curEvent.getTitle() + ': ' + startWeekDay + ', ' + startDate + ', ' + startAt + ', ' + duration);
    }
  }

}
