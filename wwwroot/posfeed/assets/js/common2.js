$(function(){

	$('.faq-item .faq-top').on('click', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next().removeClass('active');
		}
		else{
			$(this).addClass('active');
			$(this).next().addClass('active');
		}
	});

	var curActiveVal = '서비스 이용약관';
	faqListEach();
	function faqListEach() {
		$('.terms-list li').removeClass('sort-active');
		$('.terms-list li').each(function(idx, item){
			var $target = $(item);
			var itemSort = $target.data('sort');
			if(itemSort === curActiveVal) {
				$target.addClass('sort-active');
				//console.log(item);
			}
		});
	}

	$('.category-list ul li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
		curActiveVal = $(this).data('active');
		//console.log(curActiveVal);
		faqListEach();
	});


});