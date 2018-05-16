var users = {
	userList : [
		{
			name: "Alvin Zhong",
			description: "Multidisciplinary artist based in Darlinghurst",
			dp : "az.jpg",
			gallery: [
									"az1.jpg",
									"az2.jpg",
									"az3.jpg",
									"az4.jpg",
									"az5.jpg",
									"az6.jpg"							
							 ]
		},
		{
			name: "Jane Fan",
			description: "Media artist based in Inner West Sydney",
			dp : "jf.jpg",
			gallery: [
									"jf1.jpg",
									"jf2.jpg",
									"jf3.jpg",
									"jf4.jpg",
									"jf5.jpg",
									"jf6.jpg"							
							 ]
		}
	],
	generateUserCards : function(){
		var markers = document.querySelectorAll("#map .marker")
		for(var i=0;i<users.userList.length;i++){
			// user card
			var marker = markers[i]
			var userCard = document.createElement("div")
			userCard.classList.add("user-card")

			// user picture
			var dp = document.createElement("div")
			dp.classList.add("display-pic")
			var dp_img = document.createElement("div")
			dp_img.classList.add("dp-img")
			dp_img.style.backgroundImage = "url('../img/" + users.userList[i].dp + "')"
			var dp_border = document.createElement("div")
			dp_border.classList.add("dp-border")
			dp_border.appendChild(dp_img)
			dp.appendChild(dp_border)
			userCard.appendChild(dp)

			// user name 
			var name = document.createElement("div")
			name.classList.add("name")
			name.innerHTML = users.userList[i].name
			userCard.appendChild(name)

			// user description
			var description = document.createElement("div")
			description.classList.add("description")
			description.innerHTML = users.userList[i].description
			userCard.appendChild(description)

			//buttons
			var buttons = document.createElement("div")
			buttons.classList.add("buttons")

			var chatButton = document.createElement("div")
			chatButton.classList.add("button")
			chatButton.classList.add("chat")
			chatButton.innerHTML = "chat"
			buttons.appendChild(chatButton)

			var profileButton = document.createElement("div")
			profileButton.classList.add("button")
			profileButton.classList.add("profile")
			profileButton.innerHTML = "profile"
			buttons.appendChild(profileButton)

			userCard.appendChild(buttons)

			// append user gallery
			var gallery = document.createElement("div")
			gallery.classList.add("gallery")
			for(var j=0; j < users.userList[i].gallery.length; j++){
				var pic = document.createElement("div")
				pic.classList.add("pic")
				pic.style.backgroundImage = "url('../img/" + users.userList[i].gallery[j] + "')"
				gallery.appendChild(pic)
			}
			userCard.appendChild(gallery)

			//add open/close interaction
			var pin = document.createElement("div")
			pin.classList.add("pin")
			pin.addEventListener("click",function(e){
				var card = e.currentTarget.parentElement.querySelector(".user-card")
				card.classList.toggle("visible")
			})

			//add to main marker containter
			marker.appendChild(userCard)
			marker.appendChild(pin)	

		}
	},
	updateNumResults : function(){
		var result = document.querySelector(".top-message .highlight")
		var oldText = result.innerHTML 
		oldText = oldText.replace(/[0-9]+/, users.userList.length)
		if(users.userList.length > 1)
			oldText = oldText.replace("collaborator", "collaborators")
		else 
			oldText = oldText.replace("collaborators", "collaborator")
		result.innerHTML = oldText
	}

}



var mapObj = {
	map : null,
	init : function(){
		mapObj.map = new maptalks.Map('map', {
			center: [151.2081,-33.8713],
			zoom: 16,
			//pitch : 50,
			baseLayer: new maptalks.TileLayer('base', {
				urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
				subdomains: ['a','b','c','d']
			})
		})


		var extent = mapObj.map.getExtent(),
			min = extent.getMin(),
			w = extent.getWidth(),
			h = extent.getHeight();

		//create markers
		for (var i = 0; i < users.userList.length; i++) {
			var marker = new maptalks.ui.UIMarker([min.x + Math.random() * w, min.y + Math.random() * h],
				{
					'single'        : false,
					'content'       : '<div class="marker user-' + i + '"></div>'
				})
			marker.addTo(mapObj.map).show()
		}

		users.generateUserCards()
		users.updateNumResults()
	},


}





document.addEventListener("DOMContentLoaded",mapObj.init())