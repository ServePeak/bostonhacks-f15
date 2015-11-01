

var runSentimentSearch = function(){
    var sentimental = -1;
		var sentiUrl = "http://google.com/";
		var loop = 0;

		var xmlhttp = new XMLHttpRequest();
		var query = document.getElementById("lst-ib").value;
		var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCt44Xj-RFsiVL-MeR5g5U4Chrsbb7DvfA&cx=002494473691101639048:kfwgrseieb0&q=" + query;
		xmlhttp.onreadystatechange = function() { // async
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var myArr = JSON.parse(xmlhttp.responseText);
				parseSearch(myArr);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();

		//parseSearch = function(arr,callback){
		function parseSearch(arr) {
			var urls = [];
			for(i = 0; i < arr["items"].length; i++) {
				urls.push(arr["items"][i].link);
			}
			for(i = 0; i < urls.length; i++ ) { // Runs 10x
				sentiment(urls[i]);
			}
		};

		function sentiment(data) {
			var xmlhttp = new XMLHttpRequest();
			var url = "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?apikey=f8003a4c-8955-4b29-b21b-ae353c626758&url=" + data;
			xmlhttp.onreadystatechange = function() { // async
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					loop++;
					var myArr = JSON.parse(xmlhttp.responseText);
					console.log(myArr["aggregate"].score);
					if( myArr["aggregate"].score > sentimental ) {
						sentimental = myArr["aggregate"].score;
						sentiUrl = data;
					}
				} else if (xmlhttp.readyState == 4 && (!xmlhttp.status == 200) ) {
					loop++;
				}
				if( loop == 10 ) {
					window.location.replace(sentiUrl);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		}
}

var addButton = function() {
	document.getElementsByClassName("sbsb_g")[0].appendChild(outerSpan);
};


//Creating Elements
var btn = document.createElement("input");
btn.setAttribute("value", "I'm Feeling Happy");
btn.setAttribute("aria-label", "I'm Feeling Happy");
btn.setAttribute("type", "submit");
btn.addEventListener("click", runSentimentSearch);
//Appending to DOM 
document.getElementsByTagName("center")[0].appendChild(btn);


var sBtn = document.createElement("input");
sBtn.setAttribute("type", "button");
sBtn.setAttribute("value", "I'm Feeling Happy");
sBtn.setAttribute("class", "lsb");
sBtn.addEventListener("mousedown", runSentimentSearch);
var innerSpan = document.createElement("span");
innerSpan.setAttribute("class", "lsbb");
var outerSpan = document.createElement("span");
outerSpan.setAttribute("class", "ds");
innerSpan.appendChild(sBtn);
outerSpan.appendChild(innerSpan);
document.getElementById("lst-ib").addEventListener("keyup",addButton);