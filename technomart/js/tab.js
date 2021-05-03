var link = document.querySelectorAll('.tab-title button');
var service = document.querySelectorAll('.service-list li');


link.forEach(function(item, i, arr) {

	item.addEventListener('click', function(evt) {
		evt.preventDefault();
		var id = evt.target.id;
		var number = id.toString().charAt(4);
		
		var buttons = document.querySelectorAll('.tab-title button');
		
		for(var i = 0; i < buttons.length; i++) {		
			buttons[i].classList.remove('tab-title-current');
		}

		item.classList.add('tab-title-current');		

		service.forEach(function(item, i, arr) {
			item.classList.add('service-hide');
			item.classList.remove('service-show');
			if((i+1) == number) {
				item.classList.remove('service-hide');
				item.classList.add('service-show');
			}
		});

		
	});
});