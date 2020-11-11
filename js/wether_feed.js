$(document).ready(function(){
	$('#slideImg').galleryView({
		panel_width: 945,
		panel_height: 300,
		frame_width: 220,
		frame_height: 60
	});
});

var prefData = {
	"data":[
		{"prefName":"福岡", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8210.xml", "trID":"fukuoka"},
		{"prefName":"佐賀", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8510.xml", "trID":"saga"},
		{"prefName":"長崎", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8410.xml", "trID":"nagasaki"},
		{"prefName":"熊本", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8610.xml", "trID":"kumamoto"},
		{"prefName":"大分", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8310.xml", "trID":"ooita"},
		{"prefName":"宮崎", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8710.xml", "trID":"miyazaki"},
		{"prefName":"鹿児島", "feedUrl":"http://rss.weather.yahoo.co.jp/rss/days/8810.xml", "trID":"kagoshima"}
	]
};

var weatherIcon = {
	"icons":[
		{"weather":"晴れ", "iconUrl":"img/index/weather_icon/hare.jpg"},
		{"weather":"晴一時曇", "iconUrl":"img/index/weather_icon/hare-ichiji-kumori.jpg"},
		{"weather":"晴時々曇", "iconUrl":"img/index/weather_icon/hare-tokidoki-kumori.jpg"},
		{"weather":"晴後曇", "iconUrl":"img/index/weather_icon/hare-nochi-kumori.jpg"},
		{"weather":"晴一時雨", "iconUrl":"img/index/weather_icon/hare-ichiji-ame.jpg"},
		{"weather":"晴時々雨", "iconUrl":"img/index/weather_icon/hare-tokidoki-ame.jpg"},
		{"weather":"晴後雨", "iconUrl":"img/index/weather_icon/hare-nochi-ame.jpg"},
		{"weather":"晴一時雪", "iconUrl":"img/index/weather_icon/hare-ichiji-yuki.jpg"},
		{"weather":"晴時々雪", "iconUrl":"img/index/weather_icon/hare-tokidoki-yuki.jpg"},
		{"weather":"晴後雪", "iconUrl":"img/index/weather_icon/hare-nochi-yuki.jpg"},
		{"weather":"曇り", "iconUrl":"img/index/weather_icon/kumori.jpg"},
		{"weather":"曇一時晴", "iconUrl":"img/index/weather_icon/kumori-ichiji-hare.jpg"},
		{"weather":"曇時々晴", "iconUrl":"img/index/weather_icon/kumori-tokidoki-hare.jpg"},
		{"weather":"曇後晴", "iconUrl":"img/index/weather_icon/kumori-nochi-hare.jpg"},
		{"weather":"曇一時雨", "iconUrl":"img/index/weather_icon/kumori-ichiji-ame.jpg"},
		{"weather":"曇時々雨", "iconUrl":"img/index/weather_icon/kumori-tokidoki-ame.jpg"},
		{"weather":"曇後雨", "iconUrl":"img/index/weather_icon/kumori-nochi-ame.jpg"},
		{"weather":"曇一時雪", "iconUrl":"img/index/weather_icon/kumori-ichiji-yuki.jpg"},
		{"weather":"曇時々雪", "iconUrl":"img/index/weather_icon/kumori-tokidoki-yuki.jpg"},
		{"weather":"曇後雪", "iconUrl":"img/index/weather_icon/kumori-nochi-yuki.jpg"},
		{"weather":"雨", "iconUrl":"img/index/weather_icon/ame.jpg"},
		{"weather":"雨一時晴", "iconUrl":"img/index/weather_icon/ame-nochi-hare.jpg"},
		{"weather":"雨時々晴", "iconUrl":"img/index/weather_icon/ame-tokidoki-hare.jpg"},
		{"weather":"雨後晴", "iconUrl":"img/index/weather_icon/ame-nochi-hare.jpg"},
		{"weather":"雨一時曇", "iconUrl":"img/index/weather_icon/ame-ichiji-kumori.jpg"},
		{"weather":"雨時々曇", "iconUrl":"img/index/weather_icon/ame-tokidoki-kumori.jpg"},
		{"weather":"雨後曇", "iconUrl":"img/index/weather_icon/ame-nochi-kumori.jpg"},
		{"weather":"雨一時雪", "iconUrl":"img/index/weather_icon/ame-ichiji-yuki.jpg"},
		{"weather":"雨時々雪", "iconUrl":"img/index/weather_icon/ame-tokidoki-yuki.jpg"},
		{"weather":"雨後雪", "iconUrl":"img/index/weather_icon/ame-nochi-yuki.jpg"},
		{"weather":"雪", "iconUrl":"img/index/weather_icon/yuki.jpg"},
		{"weather":"雪一時晴", "iconUrl":"img/index/weather_icon/kumori-ichiji-hare.jpg"},
		{"weather":"雪時々晴", "iconUrl":"img/index/weather_icon/yuki-tokidoki-hare.jpg"},
		{"weather":"雪後晴", "iconUrl":"img/index/weather_icon/yuki-nochi-hare.jpg"},
		{"weather":"雪一時曇", "iconUrl":"img/index/weather_icon/yuki-ichiji-kumori.jpg"},
		{"weather":"雪時々曇", "iconUrl":"img/index/weather_icon/yuki-tokidoki-kumori.jpg"},
		{"weather":"雪後曇", "iconUrl":"img/index/weather_icon/yuki-nochi-kumori.jpg"},
		{"weather":"雪一時雨", "iconUrl":"img/index/weather_icon/yuki-ichiji-ame.jpg"},
		{"weather":"雪時々雨", "iconUrl":"img/index/weather_icon/yuki-tokidoki-ame.jpg"},
		{"weather":"雪後雨", "iconUrl":"img/index/weather_icon/yuki-nochi-ame.jpg"}
	]
}

google.load("feeds", "1");

function initialize() {
	for (i=0; i<prefData["data"].length; i++) {
		google.feeds.lookupFeed(prefData["data"][i].feedUrl, getFeedUrl);
	}
}

function getFeedUrl(result){
	if (!result.error){
		if (result.url != null) {
			var feed = new google.feeds.Feed(result.url);
			feed.setNumEntries(1);
			feed.load(dispfeed);
		}
	}else{
		var container = document.getElementById("feed");
		container.innerHTML = "フィードがありません";
	}
}

function dispfeed(result){
	if (!result.error){
		var container = document.getElementById("feed");
		var htmlstr = "";

		result.feed.title.match(/[（](.*)[）]/);//正規表現で県名の判定
		var prefStr = RegExp.$1;
		
		for (i=0; i<prefData["data"].length; i++) {
			if( prefData["data"][i].prefName == prefStr ) {
				result.feed.entries[0].title.match(/[】]\s(.*)\s[-]\s(.*)[-]\s/);//天気、気温の取得
				var appendElm01 = $(document.createElement("img"));
				var appendElm02 = $(document.createElement("span")).text(RegExp.$2);
				if(RegExp.$1 != "") {
					for (j=0; j<weatherIcon["icons"].length; j++) {
						if(weatherIcon["icons"][j].weather == RegExp.$1) {
							appendElm01.attr("src", weatherIcon["icons"][j].iconUrl);
						}
					}
				}
				$("#" + prefData["data"][i].trID + " .icon").append(appendElm01);
				$("#" + prefData["data"][i].trID + " .temperature").append(appendElm02);
			}
		}
		
	}else{
		alert(result.error.code + ":" + result.error.message);
	}
}
google.setOnLoadCallback(initialize);
