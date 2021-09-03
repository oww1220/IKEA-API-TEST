$(function(){

	$('.slidewrap .slidelink').on('click', function(){
		var idx = $(this).parent().parent().index();
		var $target = $('.layer-box .layer-wrap');

		$target.eq(idx).addClass('active').siblings().removeClass('active');
		//console.log(idx);
	});

	$('.layer-wrap .layer-close').on('click', function(){
		var $target = $('.layer-box .layer-wrap');
		$target.removeClass('active');
	});


});