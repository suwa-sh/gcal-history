var GroupsSheetAdapter = function() {
  this.SHEETNAME = 'groups';
  this.HEADER_ROW_COUNT = 1;

  this.sheet = SpreadsheetApp.getActive().getSheetByName(this.SHEETNAME);
  this._map = this._calendarMap();
}

GroupsSheetAdapter.prototype._calendarMap = function() {
  var rows = this.sheet.getDataRange().getValues();
  // [
  //   [ group,   calendar  , color ], ※header
  //   [ group-A, calendar-1, #000000 ], 
  //   [ group-A, calendar-2, #000000 ],
  //   [ group-B, calendar-3, #000000 ]
  // ]
  
  var map = {};
  for (var idx in rows) {
    if ( idx < this.HEADER_ROW_COUNT ) continue;
    var rowValues = rows[idx];
    var group = rowValues[0];
    var calendar = rowValues[1];
    map[calendar] = group;
  }
  return map;
}

GroupsSheetAdapter.prototype.clear = function(values) {
  var deleteStartRow = this.HEADER_ROW_COUNT + 1;
  var lastRow = this.sheet.getRange('B:B').getLastRow();
  if (lastRow <= deleteStartRow) return;

  var deleteRowNum = lastRow - deleteStartRow;
  this.sheet.deleteRows(deleteStartRow, deleteRowNum);
}

GroupsSheetAdapter.prototype.insertBatch = function(values) {
  var insertStartRow = this.HEADER_ROW_COUNT + 1;
  this.sheet.insertRowsAfter(insertStartRow, values.length);

  this.sheet.getRange(insertStartRow, 1, values.length, this.sheet.getLastColumn()).setValues(values);
}

GroupsSheetAdapter.prototype.getRowValue = function(
  group,
  calendar,
  color
  ) {

  var rowValue = [];
  rowValue.push(group);
  rowValue.push(calendar);
  rowValue.push(color);
  return rowValue;
}

GroupsSheetAdapter.prototype.findGroupByCalendar = function(calendar) {
  return this._map[calendar];
}



//--------------------------------------------------------------------------------------------------
// test
//--------------------------------------------------------------------------------------------------
function test_GroupsSheetAdapter() {
  LOG_LEVEL = LOG_LEVEL_TRACE;
  var sheetAdapter = new GroupsSheetAdapter();
  
  sheetAdapter.clear();
  
  var values = [];
  values.push(sheetAdapter.getRowValue( 'group-a', 'cal-1' ));
  values.push(sheetAdapter.getRowValue( 'group-a', 'cal-2' ));
  values.push(sheetAdapter.getRowValue( 'group-b', 'cal-3' ));

  sheetAdapter.insertBatch(values);
}
