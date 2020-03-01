var CalendarQueryRepo = function() {
  this._calendar_adapter = NewCalendarAdapter();
  this._groups_sheet_adapter = new GroupsSheetAdapter();
}

// Calendars
CalendarQueryRepo.prototype.find = function(ignorePrefixes) {
  log_debug('CalendarQueryRepo.find start');

  var calendarNames = this._calendar_adapter.names();
  var calendars = new Calendars();
  for (var idx in calendarNames) {
    var curName = calendarNames[idx];
    if (this._isIgnore(curName, ignorePrefixes)) continue;
    
    var gcal = this._calendar_adapter.findByName(curName);
    calendars.push(this._parse(gcal));
  }

  log_debug('CalendarQueryRepo.find end');
  return calendars;
}

CalendarQueryRepo.prototype.findAll = function() {
  log_debug('CalendarQueryRepo.findAll start');
  
  var calendars = this.find('');

  log_debug('CalendarQueryRepo.findAll end');
  return calendars;
}

CalendarQueryRepo.prototype._isIgnore = function(name, ignorePrefixesStr) {
  if (isEmpty(ignorePrefixesStr)) return false;

  var ignorePrefixes = ignorePrefixesStr.split(',')
  for (var idx in ignorePrefixes) {
    var prefix = ignorePrefixes[idx];
    if (forwardMatch(name, prefix)) return true;
  }
  return false;
}

// Google Calendar API.Calendar -> Calendar
CalendarQueryRepo.prototype._parse = function(gcal) {
  var group = this._groups_sheet_adapter.findGroupByCalendar(gcal.getName());
  var calendar = new Calendar(gcal.getId(), gcal.getName(), gcal.getColor(), group);
  return calendar;
}
