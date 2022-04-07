$(document).ready(function() {
	$(document).on({
		click : function(){
			$(this).toggleClass('on');
			$( '.termsSection .innerCont' ).slideToggle();
		}
	},'.termsSection .tit a');
	
	var winWit = $(window).outerWidth();
	if(winWit <= 1024){
		$(document).on({
			click : function(){
				$(this).parent().removeClass('active');
				$(this).parent().addClass('active').siblings().removeClass('active');
			}
		},'.pinBtn');
	} else {
		$('.pin').mouseover(function(){
			$('.pinArea').find('.pin').removeClass('active');
			$(this).addClass('active');
		}).mouseout(function() {
			$(this).removeClass('active');
		});
	};
});

setTimeout(function () {
	var swiper2 = new Swiper('.slide02', {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 48,
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,
			}
		},
	});
	var swiper3 = new Swiper('.slide03', {
		observer: true,
		observeParents: true,
		slidesPerView: "auto",
        spaceBetween: 20,
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	var swiper4 = new Swiper('.slide04', {
		observer: true,
		observeParents: true,
		slidesPerView: "auto",
        spaceBetween: 20,
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
}, 500);
