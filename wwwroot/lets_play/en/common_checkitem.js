$(document).ready(function() {
  var checkCount = {
		init : function() {
			var objThis = this;

			$('.chkItem .prodBox').each(function() {
				//각 prodBox에 체크된 값의 가격 합계 구하기
				var sum = 0;
				var priceArray = new Array();
				var $checkbox = $(this).find('.checkbox');
				var $counter = $(this).find('.sumBox .range-revamp-price__integer');
				var $prodNum = $(this).find('.prodNum');
				var checkedLen = $(this).find('.checked').not('.all').length;
				$prodNum.text(checkedLen);

				$checkbox.each(function(){
					if($(this).hasClass('checked')){
						var price = parseInt($(this).next('.info').find('.range-revamp-price__integer').text().replace( ',' , '' ));
            $(this).find('input').prop('checked',true);
						if(isNaN(price)==true){ //숫자 아닌 값 제외
							return;
						}
						priceArray.push(price);
					}
				});

				if (!priceArray.length){ // 빈 배열일 경우
					// price reset
					$counter.html('0');
					$counter.attr('data-sum', 0);
					return;
				}

				sum = priceArray.reduce((a, b) => a + b);
				//sum = sum.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

				$counter.attr('data-sum', sum);

				objThis.setDigitCount($counter, 10, 600);
			});
		},
		initEvent : function () {
			var objThis = this;

			//check all
			$(document).on({
				  click: function (e) {
					//e.preventDefault();
					var checkbox = $(this).parents('.prodList').find('input:checkbox');

					if($(this).prop('checked')){
						checkbox.prop('checked',true);
						if(!checkbox.hasClass('checked'))
							checkbox.parents('.checkbox').addClass('checked');
						$(this).parents('.prodBox').find('.aTxt').addClass('on');
					}else{
						checkbox.prop('checked',false);
						checkbox.parents('.checkbox').removeClass('checked');
						$(this).parents('.prodBox').find('.aTxt').removeClass('on');
						// price reset
						$(this).parents('.prodBox').find('.sumBox .range-revamp-price__integer').html('0');
						$(this).parents('.prodBox').find('.sumBox .range-revamp-price__integer').attr('data-sum', 0);
					}
				}
			}, '.checkbox.all .check');

			// Counter price
			$(document).on({
				click : function(){
					if($(this).prop('checked')){
						$(this).parents('.checkbox').addClass('checked');
					}else{
						$(this).parents('.checkbox').removeClass('checked');
					}

					var sum = 0;
					var priceArray = new Array();
					var $checkbox = $(this).parents('.prodList').find('.checkbox');
					var allProdLen = $(this).parents('.prodList').find('.checkbox').not('.all').length;
					var checkedLen = $(this).parents('.prodList').find('.checked').not('.all').length;
					var $counter = $(this).parents('.prodBox').find('.sumBox .range-revamp-price__integer');
					var $prodNum = $(this).parents('.prodBox').find('.sumBox .prodNum');


					// 전체체크해제/적용
					if(checkedLen < allProdLen){
						$(this).parents('.prodList').find('.checkbox.all').removeClass('checked');
						$(this).parents('.prodList').find('.checkbox.all').find('input:checkbox').prop('checked',false);
						$(this).parents('.prodBox').find('.aTxt').removeClass('on');
						checkedLen = $(this).parents('.prodList').find('.checked').not('.all').length;
					}
					if(checkedLen >= allProdLen){
						$(this).parents('.prodList').find('.checkbox.all').addClass('checked');
						$(this).parents('.prodList').find('.checkbox.all').find('input:checkbox').prop('checked',true);
						$(this).parents('.prodBox').find('.aTxt').addClass('on');
						checkedLen = $(this).parents('.prodList').find('.checked').not('.all').length;
					}

					// 선택 상품 갯수 표시
					$prodNum.text(checkedLen);

					$checkbox.each(function(){
						if($(this).hasClass('checked')){
							var price = parseInt($(this).next('.info').find('.range-revamp-price__integer').text().replace( ',' , '' ));

							if(isNaN(price)==true){ //숫자 아닌 값 제외
								return;
							}
							priceArray.push(price);
						}
					});

					if (!priceArray.length){ // 빈 배열일 경우
						// price reset
						$counter.html('0');
						$counter.attr('data-sum', 0);
						return;
					}

					sum = priceArray.reduce((a, b) => a + b);
					//sum = sum.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

					$counter.attr('data-sum', sum);

					objThis.setDigitCount($counter, 10, 600);
				}
			},'.check');

			// Anchor
			$(document).on({
				click: function (e) {
					e.preventDefault();
					$('html,body').animate({
						scrollTop: $(this.hash).offset().top
					}, 500);

				}
			}, '.anchor a');
		},
		setDigitCount : function (selector, numStep, duration) {
			var target = Number($(selector).attr('data-sum'));
			var numNow = 0;
			var numNowComma = '';
			var timerId = 0;
			var step = Math.round(target / numStep);
			var timerSpeed = duration / numStep;

			$(selector).text(0);
			timerId = setInterval(function(){
				numNow += step;
				$(selector).text(numNow);
				if(numNow > target){
					numNow = target;
					numNowComma = numNow.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
					$(selector).text(numNowComma);

					clearInterval(timerId);
				}else{
					numNowComma = numNow.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");

					$(selector).text(numNowComma);
				}
			}, timerSpeed);
		},
	}

	checkCount.init();
	checkCount.initEvent();
});