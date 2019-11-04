var Calendars = function() {
  this._repo = new CalendarQueryRepo();
  this._list = [];
}

Calendars.prototype.toString = function() {
  return JSON.stringify(this._list);
}

Calendars.prototype.list = function() {
  return this._list;
}

Calendars.prototype.push = function(calendar) {
  return this._list.push(calendar);
}

Calendars.prototype.length = function() {
  return this._list.length;
}

Calendars.prototype.findEvents = function(fromDate, toDate) {
  var events = new Events();
  for (idx in this._list) {
    var curCalendar = this._list[idx];
    
    var curEvents = curCalendar.findEvents(fromDate, toDate);
    for (eventIdx in curEvents.list()) {
      var curEvent = curEvents.list()[eventIdx];
      events.push(curEvent);
    }
  }
  return events;
}
