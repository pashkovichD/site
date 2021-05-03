var link = document.querySelector('.write-us');
var link_map = document.querySelector('.map-link');
var close_map = document.querySelector('.close-map');
var close_message = document.querySelector('.close-message');

var popup = document.querySelector('.modal-message');
var map = document.querySelector('.modal-map');
var people = popup.querySelector('[name=name]');
var email = popup.querySelector('[name=email]');

var overlay = document.querySelector('.overlay');

var form = popup.querySelector('form');


link.addEventListener('click', function(evt) {
	evt.preventDefault();	
	popup.classList.add('modal-show');
	overlay.classList.add('overlay-show');
	people.focus();
});

link_map.addEventListener('click', function(evt) {
	evt.preventDefault();	
	map.classList.add('modal-show');
	overlay.classList.add('overlay-show');	
});

close_map.addEventListener('click', function(evt) {
	evt.preventDefault();
	map.classList.remove('modal-show');
	overlay.classList.remove('overlay-show');	
});

close_message.addEventListener('click', function(evt) {
	evt.preventDefault();
	popup.classList.remove('modal-show');
	overlay.classList.remove('overlay-show');
	popup.classList.remove('modal-error');
});

overlay.addEventListener('click', function(evt) {
	evt.preventDefault();			
	popup.classList.remove('modal-show');	
	map.classList.remove('modal-show');	
	overlay.classList.remove('overlay-show');
	popup.classList.remove('modal-error');
});

// закрытие модального окна при нажатии на Esc
window.addEventListener('keydown', function(evt) {
	if(evt.keyCode === 27) {				
		evt.preventDefault();
		if(popup.classList.contains('modal-show')) {
			popup.classList.remove('modal-show');
			popup.classList.remove('modal-error');
		}
		if(map.classList.contains('modal-show')) {
			map.classList.remove('modal-show');
		}
		if(overlay.classList.contains('overlay-show')) {
			overlay.classList.remove('overlay-show');
		}
	}
});

form.addEventListener('submit', function(evt) {
	if(!people.value || !email.value) {
		evt.preventDefault();
		popup.classList.add('modal-error');
	}
	
});