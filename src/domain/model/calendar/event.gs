var Event = function(calendarName, id, title, startTimestamp, endTimestamp) {
  this.calendarName = calendarName;
  this.id = id;
  this.title = title;
  this.startDayOfWeek = '日月火水木金土'[startTimestamp.getDay()];
  this.startDate = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'yyyy-MM-dd')
  this.startTime = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'HH:mm');
  
  var duration_sec = (endTimestamp - startTimestamp) / 1000;
  this.duration = timeFormat(duration_sec);
}
