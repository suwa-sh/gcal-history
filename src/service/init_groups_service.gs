var InitGroupsService = function() {
  this.repo = new CalendarQueryRepo();
}


var InitGroupsCommand = function(ignorePrefixes) {
  notEmpty('LoadCommand.ignorePrefixes', ignorePrefixes);

  this.ignorePrefixes = ignorePrefixes;
}
var InitGroupsResponse = function(command, calendars) {
  this.ignorePrefixes = command.ignorePrefixes;
  this.calendarCount = calendars.length();
}


InitGroupsService.prototype.init = function(command) {
  log_info("InitGroupsService.init start");
  notNull('command', command);

  var calendars = this.repo.find(command.ignorePrefixes);
  calendars.save();

  log_info("InitGroupsService.init end");
  return new InitGroupsResponse(command, calendars);
}



//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_InitGroupsService() {
  LOG_LEVEL = LOG_LEVEL_DEBUG;
  var service = new LoadService();

  var command = new LoadCommand(new Date('2019-08-14'), new Date('2019-08-15'));
  var res = service.load(command);

  log_debug("res:" + res);
}