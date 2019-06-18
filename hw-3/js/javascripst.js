$(document).ready(function(){
    $('.slider').slick({
       slidesToShow: 1,
       slidesToScroll: 1,
       dots: true,
       autoplay: true,
       autoplaySpeed: 4000,
       arrows: false
    });
  });

  $(document).ready(function(){
    $('.nav-btn').on('click', function() {
          console.log('test')
          $('body').toggleClass('menu-active');
      })
  });
  