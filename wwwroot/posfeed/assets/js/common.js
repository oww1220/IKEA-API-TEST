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
		$('.faq-list li').removeClass('sort-active');
		$('.faq-list li').each(function(idx, item){
			var itemSort = $(item).data('sort');
			if(itemSort === curActiveVal || curActiveVal === '전체') {
				$(item).addClass('sort-active');
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

	function searchFaq() {
		var searchIdx = 0;
		var searchVal = $('.category-search input').val();
		var regex = new RegExp(searchVal,'gi');
		console.log(searchVal, regex);
		$('.faq-list li').removeClass('no-serach');
		$('.faq-list li').each(function(idx, item){
			var tarTxtSt = $(item).find('.faq-top strong').text();
			var tarTxtQa = $(item).find('.faq-top .faq-qa').text();
			var tarTxtAw = $(item).find('.faq-cont .faq-aw').text();

			if(regex.test(tarTxtSt) || regex.test(tarTxtQa) || regex.test(tarTxtAw)){
				console.log(tarTxtSt, tarTxtQa, tarTxtAw);
				searchIdx++;
			}
			else {
				$(item).addClass('no-serach');
			}			
		});
		if(searchIdx) {
			$('.faq-list .no-result').hide();
		}
		else {
			$('.faq-list .no-result').show();
		}
		console.log(searchIdx);

	}

	$('.category-search .btn-search').on('click', function(){
		searchFaq();
	});
	$('.category-search input').on('keyup', function() {
        searchFaq();
    });

});