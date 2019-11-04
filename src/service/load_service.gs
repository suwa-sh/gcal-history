var LoadService = function() {
  this.repo = new CalendarQueryRepo();
}


var LoadCommand = function(startDate, endDate) {
  notEmpty('LoadCommand.startDate', startDate);
  notEmpty('LoadCommand.endDate', endDate);
  
  // 前後チェック
  if (! isAfterDate(startDate, endDate)) {
    var startDateStr = Utilities.formatDate(startDate, 'Asia/Tokyo', 'yyyy-MM-dd');;
    var endDateStr = Utilities.formatDate(endDate, 'Asia/Tokyo', 'yyyy-MM-dd');;
    throw new Error('endDate は startDate より後の日付を指定してください。 startDate:' + startDateStr + ', endDate:' + endDateStr);
  }

  this.startDate = startDate;
  this.endDate = endDate;
}
var LoadResponse = function(command, calendars, events) {
  this.startDate = command.startDate;
  this.endDate = command.endDate;
  this.calendarCount = calendars.length();
  this.eventCount = events.length();
}


LoadService.prototype.load = function(command) {
  log_info("LoadService.load start");
  notNull('command', command);

  var calendars = this.repo.findAll();
  var events = calendars.findEvents(command.startDate, command.endDate);
  events.save();

  log_info("LoadService.load end");
  return new LoadResponse(command, calendars, events);
}



//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_LoadService() {
  LOG_LEVEL = LOG_LEVEL_DEBUG;
  var service = new LoadService();

  var command = new LoadCommand(new Date('2019-08-14'), new Date('2019-08-15'));
  var res = service.load(command);

  log_debug("res:" + res);
}