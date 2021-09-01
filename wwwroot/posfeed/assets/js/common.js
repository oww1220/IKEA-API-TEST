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

	var curActiveVal = '전체';
	faqListEach();
	function faqListEach() {
		$('.faq-item').removeClass('sort-active');
		$('.faq-item').each(function(idx, item){
			var $target = $(item);
			var itemSort = $target.data('sort');
			if(itemSort === curActiveVal || curActiveVal === '전체') {
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
		if($('.category-search input').val()) searchFaq();
	});

	function searchFaq() {
		var searchIdx = 0;
		var searchVal = $('.category-search input').val();
		var regex = new RegExp(searchVal,'gi');
		//console.log(searchVal, regex);
		$('.faq-item').removeClass('no-serach');
		$('.faq-item').each(function(idx, item){
			var $target = $(item);
			if(!$target.hasClass('sort-active')) return;
			var tarTxtSt = $target.find('.faq-top strong').text();
			var tarTxtQa = $target.find('.faq-top .faq-qa').text();
			var tarTxtAw = $target.find('.faq-cont .faq-aw').text();

			if(regex.test(tarTxtSt) || regex.test(tarTxtQa) || regex.test(tarTxtAw)){
				//console.log(tarTxtSt, tarTxtQa, tarTxtAw);
				searchIdx++;
			}
			else {
				$target.addClass('no-serach');
			}			
		});
		if(searchIdx) {
			$('.faq-item.no-result').hide();
		}
		else {
			$('.faq-item.no-result').show();
		}
		//console.log(searchIdx);

	}

	$('.category-search .btn-search').on('click', function(){
		searchFaq();
	});
	$('.category-search input').on('keyup', function() {
        searchFaq();
    });

});