$(function(){
	$("#newslist").clone().attr("id", "newslist2").insertAfter("#openlist").hide();
	$("#newslist").liScroll({travelocity: 0.04});
	$("#openlist").toggle(
		function(){
			$("#newslist").hide();
			$("#newslist2").show();
			$(".tickercontainer").hide();
		},function(){
			$("#newslist").show();
			$("#newslist2").hide();
			$(".tickercontainer").show();
		}
	);
});
