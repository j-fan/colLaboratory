var sidebar = {
	init : function(){
		var closeButton = document.querySelector("#sidebar .close-button")
		closeButton.addEventListener("click",function(e){
			document.getElementById("sidebar").classList.add("hidden")
		})
		var showButton = document.querySelector("#show-sidebar")
		showButton.addEventListener("click",function(e){
			document.getElementById("sidebar").classList.remove("hidden")
		})
		var disciplines = document.querySelectorAll(".button")
		disciplines.forEach(function(d){
			d.addEventListener("click",function(e){
				e.currentTarget.classList.toggle("selected")
			})
		})
	}
}

document.addEventListener("DOMContentLoaded",sidebar.init())