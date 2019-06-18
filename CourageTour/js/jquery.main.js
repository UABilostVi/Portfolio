jQuery(function(){
	initMenu();
});

function initMenu() {
	var opener = jQuery('.menu-opener');
	var page = jQuery('html');
	var classActive = 'menu-active';

	var clickHandler = function(e) {
		e.preventDefault();
		page.toggleClass(classActive);
	};
	opener.on('click', clickHandler);
}

$(document).ready(function(){
	$('.visual-slider').slick({
		slidesToShow: 1,
		arrows: false,
		dots: true,
		mobileFirst: true,
		//autoplay: true
	});
});

$(document).ready(function(){
	$('.offers-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		mobileFirst: true,
		arrows: true,
		dots: false
	});
});

