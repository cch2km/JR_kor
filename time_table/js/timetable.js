function timetable_change(name, no) {
	if (no == null) no = '01';
	$("#timeTableArea").load(name+"/"+no+".html", function(){
		$(".upLine").find("tbody tr:odd").addClass("grayTd");
		$(".downLine").find("tbody tr:odd").addClass("grayTd");
		location.hash = 'timeTableArea';
	});

	return false;
}

function calendar_open(url) {
	var _calendar;
	_calendar = window.open(url,"_calendar","width=310,height=460,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizaeable=no'");
	_calendar.focus();
	return false;
}
