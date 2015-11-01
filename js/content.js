var runSentimentSearch = function(){
    var sentimental = -1;
    var sentiUrl = "http://google.com/";
    var loop;
    
    var xmlhttp = new XMLHttpRequest();
    var query = document.getElementById("lst-ib").value;
		var googlekey = "";
		var havenkey = "";
    var url = "https://www.googleapis.com/customsearch/v1?key=" + googlekey + "&cx=002494473691101639048:kfwgrseieb0&q=" + query;
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
	console.log
	if( arr["items"] === undefined ) {
		window.location.replace("https://www.google.com/#q=" + query);
	} else {
		loop = arr["items"].length;
		for(i = 0; i < arr["items"].length; i++) {
				urls.push(arr["items"][i].link);
		}
		for(i = 0; i < urls.length; i++ ) { // Runs 10x
				sentiment(urls[i]);
		}
	}
    };
		

    function sentiment(data) {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?apikey=" + havenkey + "&url=" + data;
	xmlhttp.onreadystatechange = function() { // async
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		loop--;
		var myArr = JSON.parse(xmlhttp.responseText);
		//console.log(myArr["aggregate"].score);
		//console.log(loop);
		if( myArr["aggregate"].score > sentimental ) {
		    sentimental = myArr["aggregate"].score;
		    sentiUrl = data;
		}
	    } else if (xmlhttp.readyState == 4 ) {
		loop--;
	    }
	    if( loop == 0 ) {
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
btn.addEventListener("click", function(event){
    event.preventDefault();
    runSentimentSearch();
});
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
setTimeout(document.getElementById("lst-ib").addEventListener("keyup",addButton),3000);
