function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");

		for(var i=0; i < images.length; i++) {
			if(images[i].getAttribute("src").match(/_off\./))
			{
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_over."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_over.", "_off."));
				}
			}
		}
	}
}

if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}


$(document).ready(function() {
	$("#using .subMenu").hide();
	$("#others .subMenu").hide();
	$("#using").mouseover(function() { $("#using .subMenu").show(); });
	$("#others").mouseover(function() { $("#others .subMenu").show(); });
	$("#using").mouseout(function() { $("#using .subMenu").hide(); });
	$("#others").mouseout(function() { $("#others .subMenu").hide(); });
});
