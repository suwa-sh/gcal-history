var Event = function(group, calendarName, id, title, startTimestamp, endTimestamp) {
  this.group = group;
  this.calendarName = calendarName;
  this.id = id;
  this.title = title;

  this.startYear = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'yyyy');
  this.startMonth = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'MM');
  this.startWeek = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'ww');
  this.startDayOfWeek = '日月火水木金土'[startTimestamp.getDay()];
  this.startDate = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'yyyy-MM-dd');
  this.startTime = Utilities.formatDate(startTimestamp, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm');
  this.endTime = Utilities.formatDate(endTimestamp, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm');
  duration_sec = (endTimestamp - startTimestamp) / 1000;
  this.duration = duration_sec / 60 / 60;
}
