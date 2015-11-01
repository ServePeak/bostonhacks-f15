var runSentimentSearch = function(){
    var sentimental = -1; // Sentimental lowest is -1
    var sentiUrl = "http://google.com/"; // Default url in case of fuckups
    var loop;
    
    var xmlhttp = new XMLHttpRequest();
    var query = document.getElementById("lst-ib").value; // Search bar for google
    var googlekey = "AIzaSyD_14Ih1GGAUYqOiX-_dlHZfCli4MYLBVk"; // Your Google API key
    var havenkey = "f8003a4c-8955-4b29-b21b-ae353c626758"; // Your HavenOnDemand API key
    var url = "https://www.googleapis.com/customsearch/v1?key=" + googlekey + "&cx=002494473691101639048:kfwgrseieb0&q=" + query;
    xmlhttp.onreadystatechange = function() { // Retrieving JSON data
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var parseJSON = JSON.parse(xmlhttp.responseText);
            parseSearch(parseJSON);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function parseSearch(JSON) {
        if (JSON["items"] === undefined) { // If there are zero search results, returns regular google search 
            window.location.replace("https://www.google.com/#q=" + query);
        } else {
            loop = JSON["items"].length;
            for (i = 0; i < JSON["items"].length; i++) {
                sentiment(JSON["items"][i].link); // Run through HavenOnDemand API
            }
        }
    };

    function sentiment(data) {
        var xmlhttp = new XMLHttpRequest();
        var url = "https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?apikey=" + havenkey + "&url=" + data;
        xmlhttp.onreadystatechange = function() { // Retrieving JSON data
            if (xmlhttp.readyState == 4) {
                //console.log(loop);
                loop--;
                if (xmlhttp.status == 200) { // Run on success
                    //console.log(myArr["aggregate"].score);
                    var myArr = JSON.parse(xmlhttp.responseText);
                    if (myArr["aggregate"].score > sentimental) { // Only replaces if score is higher for most positive search
                        sentimental = myArr["aggregate"].score;
                        sentiUrl = data;
                    }
                }
            }
            if (!loop) { // When done going through all searches, redirects to the happiest url
                window.location.replace(sentiUrl);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

var addButton = function() {
    if (document.getElementsByClassName("sbsb_g")[0] != undefined) { // Cannot append to undefined
        document.getElementsByClassName("sbsb_g")[0].appendChild(outerSpan);
    }
};

var btn = document.createElement("input"); // Body button
btn.value = "I'm Feeling Happy";
btn.type = "submit";
btn.setAttribute("aria-label", "I'm Feeling Happy");
btn.addEventListener("click", function(event) {
    event.preventDefault();
    runSentimentSearch();
}); 
document.getElementsByTagName("center")[0].appendChild(btn);

var sBtn = document.createElement("input"); // Search window button
sBtn.type = "button";
sBtn.value = "I'm Feeling Happy";
sBtn.setAttribute("class", "lsb");
sBtn.addEventListener("mousedown", runSentimentSearch);

var innerSpan = document.createElement("span");
innerSpan.setAttribute("class", "lsbb");

var outerSpan = document.createElement("span");
outerSpan.setAttribute("class", "ds");

innerSpan.appendChild(sBtn);
outerSpan.appendChild(innerSpan);

document.getElementById("lst-ib").addEventListener("keypress",addButton);