function scrollFunction(color1,color2) {
	var header = document.getElementById("header");
	var ofset = 50;
	if ( window.pageYOffset > ofset || document.body.scrollTop > ofset || document.documentElement.scrollTop > ofset) {
		header.classList.add("py-2");
		header.classList.remove("py-4");
		header.style.backgroundImage = "linear-gradient(to right, " +color2+ ", "+ color1 + ")";
	}else {
		header.classList.add("py-4");
		header.classList.remove("py-2");
		header.style.backgroundImage = null;
	}
}

function login_page_show() {
	var x = document.getElementById('content');
	if (x.className === 'hidden') {
		document.getElementById('bodycontent').style.marginLeft = "0%";
		document.getElementsByClassName('overlape')[0].style.marginLeft = "0%";
		document.getElementsByClassName('col2')[0].style.width = "85%";
		document.getElementById('footer').style.marginLeft = "0%";
		document.getElementById('footercontent').style.marginLeft = "0%";
		x.className = '';
		disp(x);
	} else {
		x.className = 'hidden';
		setTimeout(() => {  disp(x) }, 1000);
		setTimeout(() => {
		document.getElementById('bodycontent').style.marginLeft = "-30%";
		document.getElementsByClassName('overlape')[0].style.marginLeft = "-30%";
		document.getElementsByClassName('col2')[0].style.width = "55%";
		document.getElementById('footer').style.marginLeft = "-30%";
		document.getElementById('footercontent').style.marginLeft = "30%";
	}, 500);
}
}
function disp(x){
	if (x.style.height != "0px") {
		x.style.height = "0px";
	}else{
		x.style.height = "auto";
	}
}