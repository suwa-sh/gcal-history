var CalendarQueryRepo = function() {
  this.adapter = NewCalendarAdapter();
}

// Calendars
CalendarQueryRepo.prototype.findAll = function() {
  log_debug('CalendarQueryRepo.findAll start');
  
  var calendarNames = this.adapter.names();
  var calendars = new Calendars();
  for (var idx in calendarNames) {
    var curName = calendarNames[idx];
    var gcal = this.adapter.findByName(curName);
    calendars.push(this.parse(gcal));
  }

  log_debug('CalendarQueryRepo.findAll end');
  return calendars;
}


// Google Calendar API.Calendar -> Calendar
CalendarQueryRepo.prototype.parse = function(gcal) {
  var calendar = new Calendar(gcal.getId(), gcal.getName());
  return calendar;
}
