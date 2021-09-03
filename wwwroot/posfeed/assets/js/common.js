$(function(){

	var titArray = [
		'포스피드 고객지원입니다.<br class="only-mo"/><strong>자주 묻는 질문</strong>이 궁금하신가요?', 
		'포스피드 고객지원입니다.<br class="only-mo"/><strong>제휴 문의</strong>가 궁금하신가요?',
		'포스피드 고객지원입니다.<br class="only-mo"/><strong>해지신청</strong>이 궁금하신가요?',
		'포스피드 고객지원입니다.<br class="only-mo"/><strong>포스피드를 만드는 (주)헬로월드</strong>가 궁금하신가요?',
		'포스피드 고객지원입니다.<br class="only-mo"/><strong>이용약관</strong>이 궁금하신가요?',
	];
	function titChange(){
		var $target = $('.tabmenu > a');
		$target.each(function(idx, item){
			var selected = JSON.parse($(item).attr('aria-selected'));
			if(!selected) return; 
			//console.log(idx, selected);
			$('.subheadtxt').empty().append(titArray[idx]);
		});
	}

	titChange();

	$('.tabmenu > a').on('click', function(){
		setTimeout(function(){
			titChange();
		}, 0);
	});	

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
	
	faqListEach();

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


	// hash chk
	function hashChk() {
		var hash = location.hash.substring(1);
		console.log(hash);
		hashSwitch(hash);

	}

	function hashSwitch(hash){
		var $menu = $('.tabmenu > a');
		var $innermenu = $('.innertabmenu > a');
		switch (hash) {
			case '1':
				//console.log( '1' );
				$menu.eq(1).trigger('click');
				break;
			case '2':
				//console.log( '2' );
				$menu.eq(3).trigger('click');
				break;
			case '3':
				//console.log( '3' );
				$menu.eq(4).trigger('click');
				$innermenu.eq(0).trigger('click');
				break;
			case '4':
				//console.log( '4' );
				$menu.eq(4).trigger('click');
				$innermenu.eq(1).trigger('click');
				break;
			default:
				$menu.eq(0).trigger('click');
		}
	}

	hashChk();

	$('.footerlinklist > a').click(function(){
		$(window).scrollTop(0);
		var idx = $(this).index();
		//console.log(idx/2+1+'');
		hashSwitch(idx/2+1+'');
		//return false;
	});

	
});


$(function(){
	$('.header-sub .history-back').on('click', function(e){
		history.back(); 
		e.preventDefault();
	});
});