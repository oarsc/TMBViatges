new Promise(async (resolve, reject)=>{
	let message = document.getElementById(`modern-${"browser-m"}essage`);
	message.parentElement.removeChild(message);
	resolve();

}).then(async _=>{	
	if (location.pathname.indexOf("resultats.html")>=0){
		return require('./logic.js');

	} else if (location.pathname.indexOf("excepcions.html")>=0){
		return require('./exceptions.js');

	} else {
		return require('./initialization.js');
	}

}).then(async _=>{
	_.init();
	_.load();
	document.getElementById("content").style.display="";
});