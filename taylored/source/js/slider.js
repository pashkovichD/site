var toggles = document.querySelectorAll('.advantages__toggles .slider__toggle');
var items = document.querySelectorAll('.advantages__list .slider__item');

var togglesReview = document.querySelectorAll('.review__toggles .slider__toggle');
var itemsReview = document.querySelectorAll('.review__item');

var prev = document.querySelector('.slider__prev');
var next = document.querySelector('.slider__next');

// удаляем стили для отображения первого слайда, на случай, когда не работает JS
var slider = document.querySelectorAll('.slider'); // на странице таких слайдеров может быть несколько
slider.forEach(function(el) {
	el.classList.remove('slider--nojs');
});

function startSlider(toggles, items, prev, next) {
	num = 0;	
	items[num].classList.add('slider-show'); // показываем первый слайд

	toggles.forEach(function(el) { // перебираем массив (список точек)    
    
		el.addEventListener('click', function (e) {
			e.preventDefault();
			removeStyle(); // удаляем стили видимости слайдов и активного button

			num = this.textContent - 1; // получаем номер button, который прописан в span.visually-hidden и, уменьшая на 1, получаем номер соответствующего элемента массива (вернее, NodeList'а) item			
			slideShow(); // показываем слайд и активный button
	    });
	});

	if(prev && next) { // если есть стрелки Назад и Вперед
		prev.addEventListener('click', function (e) {
			e.preventDefault();
			removeStyle(); // удаляем стили видимости слайдов и активного button

			num--;
			if(num == -1) {num = 2;}
			slideShow(); // показываем слайд и активный button
		});

		next.addEventListener('click', function (e) {
			e.preventDefault();
			removeStyle(); // удаляем стили видимости слайдов и активного button

			num++;
			if(num == 3) {num = 0;}
			slideShow(); // показываем слайд и активный button			
		});
	}	

	function removeStyle() {		
		// скрываем все слайды
		items.forEach(function(item) {
			item.classList.remove('slider-show');
		});

		// убираем у всех button стили активной кнопки
		toggles.forEach(function(toggle) {
			toggle.classList.remove('slider__toggle--active');
		});
	}

	function slideShow() {
		items[num].classList.add('slider-show');
		toggles[num].classList.add('slider__toggle--active'); // делаем активной button
	}

	return;
}

startSlider(toggles, items); // первый слайдер
startSlider(togglesReview, itemsReview, prev, next); // второй слайдер