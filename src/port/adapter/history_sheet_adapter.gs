var HistorySheetAdapter = function() {
  this.SHEETNAME = 'history';
  this.HEADER_ROW_COUNT = 1;

  this.sheet = SpreadsheetApp.getActive().getSheetByName(this.SHEETNAME);
}

HistorySheetAdapter.prototype.insertBatch = function(values) {
  var insertRowNum = this.sheet.getRange('A:A').getLastRow();
  var count = values.length;
  this.sheet.insertRowsBefore(insertRowNum, count)

  this.sheet.getRange(insertRowNum, 1, count, this.sheet.getLastColumn()).setValues(values);
}

HistorySheetAdapter.prototype.getRowValue = function(
  group,
  calendar,
  title,
  startYear,
  startMonth,
  startWeek,
  startDayOfWeek,
  startDate,
  startTime,
  endTime,
  duration
  ) {

  var rowValue = [];
  rowValue.push(group);
  rowValue.push(calendar);
  rowValue.push(title);
  rowValue.push(startYear);
  rowValue.push(startMonth);
  rowValue.push(startWeek);
  rowValue.push(startDayOfWeek);
  rowValue.push(startDate);
  rowValue.push(startTime);
  rowValue.push(endTime);
  rowValue.push(duration);
  return rowValue;
}





//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_HistorySheetAdapter() {
  LOG_LEVEL = LOG_LEVEL_TRACE;
  var listSheetAdapter = new HistorySheetAdapter();
  
  var values = [];
  values.push(listSheetAdapter.getRowValue( 1, 2, 3, 4, 5, 6 ));
  values.push(listSheetAdapter.getRowValue( 2, 2, 3, 4, 5, 6 ));
  values.push(listSheetAdapter.getRowValue( 3, 2, 3, 4, 5, 6 ));
  listSheetAdapter.insertBatch(values);
}
