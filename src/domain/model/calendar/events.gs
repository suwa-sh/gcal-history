var Events = function(calendarName) {
  this._repo = new EventCommandRepo();

  this.calendarName = calendarName;
  this._list = [];
}

Events.prototype.toString = function() {
  return JSON.stringify(this._list);
}

Events.prototype.push = function(event) {
  return this._list.push(event);
}

Events.prototype.length = function() {
  return this._list.length;
}

Events.prototype.list = function(event) {
  return this._list;
}

Events.prototype.save = function() {
  return this._repo.save(this);
}
