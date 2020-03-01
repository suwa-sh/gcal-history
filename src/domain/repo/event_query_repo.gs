var EventQueryRepo = function(calendarName) {
  this.calendarName = calendarName;
  this.adapter = NewCalendarAdapter();
  this.calendarGroup = new GroupsSheetAdapter().findGroupByCalendar(calendarName);
}

// Events
EventQueryRepo.prototype.find = function(fromDate, toDate) {
  log_debug('EventQueryRepo.find start');
  var events = new Events(this.calendarName);

  var from = clearTime(fromDate);
  var to = clearTime(toDate);
  var gcalEvents = this.adapter.findEvents(this.calendarName, from, to);
  for (idx in gcalEvents) {
    var gcalEvent = gcalEvents[idx];
    events.push(this._parse(gcalEvent));
  }

  log_debug('EventQueryRepo.find end');
  return events;
}

// Google Calendar API.CalendarEvent -> Event
EventQueryRepo.prototype._parse = function(gcalEvent) {
  var event = new Event(
    this.calendarGroup,
    this.calendarName,
    gcalEvent.getId(), 
    gcalEvent.getTitle(), 
    gcalEvent.getStartTime(), 
    gcalEvent.getEndTime());
  return event;
}


//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_EventQueryRepo() {
  LOG_LEVEL = LOG_LEVEL_DEBUG;

  var calendarName = '@home';
  
  var query = new EventQueryRepo(calendarName);
  var events = query.find(new Date('2019-01-01'), new Date('2019-08-15'));

  log_debug('events.length: ' + events.length());
}
