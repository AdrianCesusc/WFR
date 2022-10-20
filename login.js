window.onload=function(){
	document.getElementById('formLogin').addEventListener('submit', sendToProfile);
}

function sendToProfile(){
    window.open('profile.html', '_parent');
}