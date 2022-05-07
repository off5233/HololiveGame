window.onload = pageLoad;

function pageLoad(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.get("error")==1){
		document.getElementById('errordisplay').innerHTML = "Password does not match.";
	}else if (urlParams.get("error")==2){
		document.getElementById('errordisplay').innerHTML = "Username is already use.";
	}	
}