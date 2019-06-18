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
	$('.vertical-slider').slick({
		slidesToShow: 1,
		arrows: false,
		dots: true,
		mobileFirst: true
	});
  });

  $(document).ready(function(){
	$('.they-say-slider').slick({
		slidesToShow: 1,
		dots: true,
		mobileFirst: true
	});
  });