function compareDate(date1, date2) {
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}

function isBeforeDate(refDate, date) {
  if (compareDate(refDate, date) > 0) return true;
  return false;
}

function isAfterDate(refDate, date) {
  if (compareDate(date, refDate) > 0) return true;
  return false;
}


function clearTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

function toUnixtime(date) {
  return Math.floor(date.valueOf() / 1000 ).toString();
}

function getYesterday() {
  var now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
}

function timeFormat(sec) {
	var result = "";
	var h = sec / 3600 | 0;
	var m = sec % 3600 / 60 | 0;
	var s = sec % 60;

	if (h != 0) {
		result = h + ":" + padZero(m) + ":" + padZero(s);
	} else if (m != 0) {
		result = "0:" + m + ":" + padZero(s);
	} else {
		result = "0:00:" + s;
	}

	return result;

	function padZero(v) {
		if (v < 10) {
			return "0" + v;
		} else {
			return v;
		}
	}
}