//Creating Elements
var btn = document.createElement("input")
btn.setAttribute("value", "I'm Feeling Happy");
btn.setAttribute("aria-label", "I'm Feeling Happy");
btn.setAttribute("type", "submit");
//Appending to DOM 
document.getElementsByTagName("center")[0].appendChild(btn);