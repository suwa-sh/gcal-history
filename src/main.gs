var VERSION = 'v1.0.0';



function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menus = [
    { name: '[Ondemand] calendar -> sheets', functionName: 'mainOndemandLoad' },
    { name: '[Batch] calendar -> sheets', functionName: 'mainBatchLoad' },
    { name: '-----', functionName: 'DUMMY' },
    { name: '[init] groups', functionName: 'mainInitGroups' },
  ];
  ss.addMenu('【gcal-history】', menus)
}



function mainOndemandLoad() {
  // 設定取得
  var settings = settings_load();
  notEmpty('loglevel',        settings['loglevel']);
  notEmpty('load.start_date', settings['load.start_date']);
  notEmpty('load.end_date',   settings['load.end_date']);
  
  LOG_LEVEL          = settings['loglevel'];
  var startDate      = new Date(settings['load.start_date']);
  var endDate        = new Date(settings['load.end_date']);
  var ignorePrefixes = settings['load.ignore_prefixes'];
  
  // load
  var loadService = new LoadService();
  var loadCommand = new LoadCommand(startDate, endDate, ignorePrefixes);
  var loadResponse = loadService.load(loadCommand);
  
  SpreadsheetApp.getActive().toast("処理が終了しました。");
}


// 前回実行日〜当日
function mainBatchLoad() {
  try {
    // 設定取得
    var settings = settings_load();
    notEmpty('loglevel',      settings['loglevel']);
    notEmpty('load.end_date', settings['load.end_date']);

    LOG_LEVEL          = settings['loglevel'];
    var prevEndDate    = new Date(settings['load.end_date']);
    var ignorePrefixes = settings['load.ignore_prefixes'];

    var startDate     = prevEndDate;
    var endDate       = new Date();

    // load
    var loadService = new LoadService();
    var loadCommand = new LoadCommand(startDate, endDate, ignorePrefixes);
    var loadResponse = loadService.load(loadCommand);
    
    // 対象期間の更新
    _settings_updateDateRange(startDate, endDate);

  } catch(e) {
    log_error(JSON.stringify(e));
  }
}


function _settings_updateDateRange(startDate, endDate) {
  var startDateStr = Utilities.formatDate(startDate, 'Asia/Tokyo', 'yyyy-MM-dd');
  var endDateStr   = Utilities.formatDate(endDate,   'Asia/Tokyo', 'yyyy-MM-dd');

  var sheet = SpreadsheetApp.getActive().getSheetByName(DEFAULT_SHEETNAME_SETTINGS);
  sheet.getRange('C3').setValue(startDateStr);
  sheet.getRange('C4').setValue(endDateStr);
}

function _test_settings_updateDateRange() {
  var startDate = getYesterday();
  var endDate = new Date();
  _settings_updateDateRange(startDate, endDate);
}


// groupsの初期化
function mainInitGroups() {
  // 設定取得
  var settings = settings_load();
  notEmpty('loglevel', settings['loglevel']);
    
  LOG_LEVEL         = settings['loglevel'];
  var ignorePrefixes = settings['load.ignore_prefixes'];
    
  // initGroups
  var initGroupsService = new InitGroupsService();
  var initGroupsCommand = new InitGroupsCommand(ignorePrefixes);
  var initGroupsResponse = initGroupsService.init(initGroupsCommand);
  
  SpreadsheetApp.getActive().toast("処理が終了しました。");
}
