(function(){
	var storeValue = null;
	var priceValue = null;
	var deliveryValue = null;
	var onlineOutlet = {
		articleSet: null,
		newArticleSet: new Array(),
		newOfferPrice: new Array(),
		newPerc: new Array(),
		divLength: null,
		allCount: null,
		showingCount: null,
		addCount : null,
		addIdx : null,
		init : function () {
			priceValue = 'rank';
			deliveryValue = 'viewAll';
			
			//console.log(storeValue);
			//console.log(priceValue);
			//console.log(deliveryValue);
		},
		initEvent : function () {
			// Select box - Hover
			$('.custom-option:first-of-type').hover(function () {
				$(this).parents('.custom-options').addClass('option-hover');
			}, function () {
				$(this).parents('.custom-options').removeClass('option-hover');
			});
			
			// Select box - 열림/닫힘
			$("#onlineOutlet .custom-select-trigger").on("click", function() {
				$('html').one('click',function() {
					$(".custom-select").removeClass("opened");
				});

				$(this).parents(".custom-select").toggleClass("opened");
				event.stopPropagation();
			});

			// Select box - 선택 시
			$(document).on({
				click: function (e) {
					var $parents = $(this).parents('.custom-select');
					var $trigger = $parents.find('.custom-select-trigger');
					var text = $(this).html();
					var value = $(this).attr('data-value');

					$(this).addClass('selected').siblings().removeClass('selected');
					
					// Store select
					if($parents.hasClass('store-sources')){
						$trigger.html(text);
						storeValue = value;

						// Reset price, delivery
						priceValue = 'rank';
						deliveryValue = 'viewAll';
						
						$('#priceSelect .custom-option').removeClass('selected');
						$('#priceSelect .custom-select-trigger').html('Price');

						$('#deliverySelect .custom-option').removeClass('selected');
						$('#deliverySelect .custom-select-trigger').html('Delivery type');
					}
					// Price select
					if($parents.hasClass('price-sources')){
						$trigger.html(text);
						priceValue = value;
					}
					// Delivery select
					if($parents.hasClass('delivery-sources')){
						$trigger.html(text);
						deliveryValue = value;
					}
					
					//reset
					$('.productLoad').empty();
					onlineOutlet.divLength = 0;
					onlineOutlet.prodAjax();
					onlineOutlet.loadMore();
				}
			}, '.custom-option');
			
			//Load more
			$(document).on({
				click: function () {
					onlineOutlet.addCount = 16;
					
					// 버튼 클릭시 스크롤 고정
					var btnStop = $(document).scrollTop();
					$('html, body').stop().animate({
						scrollTop: btnStop
					});

					onlineOutlet.prodAjax();
					onlineOutlet.loadMore();
				}
			}, '.productList .moreBtn a');

			//To top
			$(document).on({
				click: function () {
					$('html, body').animate({
						scrollTop: 0
					}, 400);
					return false;
				}
			}, '.toTop a');
		},
		prodInfo : { // Sorting (상품 기본 세팅)
			rank : { // Default
				articleNum : ['50355692','60274742','30495170','80468433','80470822','50470833','10495642','60417915','00411134','00352894','90192839','s69248367','60427636','20370156','40297853','20297854','90297855','60297852','70297856','80280695','s99320385','30352901','00503591','30422334','20469483','60407817','20407819','80483749','90426659','30427973','10426658','80329442','50448465','80448459','70470827','80470817','00456561','80471572','90455699'],
				offerPrice : ['24,990','5,999','399','1,499','499','499','799','1,000','1,500','14,990','7,000','35,800','2,999','699','1,499','1,999','2,249','2,499','2,999','8,999','2,499','19,990','1,999','800','399','149','149','199','599','599','399','399','599','799','1,299','1,299','499','3,999','499'],
				perc : ['29','25','20','25','50','50','20','33','40','25','30','14','40','30','50','50','50','50','50','31','29','20','33','38','33','17','17','33','40','40','33','20','25','38','35','35','37','20','37']
			},
			lowPrice : { // 낮은 가격 순
				articleNum : ['60407817','20407819','80483749','30495170','20469483','10426658','80329442','80470822','50470833','00456561','90455699','90426659','30427973','50448465','20370156','10495642','80448459','30422334','60417915','70470827','80470817','80468433','40297853','00411134','20297854','00503591','90297855','60297852','s99320385','60427636','70297856','80471572','60274742','90192839','80280695','00352894','30352901','50355692','s69248367'],
				offerPrice : ['149','149','199','399','399','399','399','499','499','499','499','599','599','599','699','799','799','800','1,000','1,299','1,299','1,499','1,499','1,500','1,999','1,999','2,249','2,499','2,499','2,999','2,999','3,999','5,999','7,000','8,999','14,990','19,990','24,990','35,800'],
				perc : ['17','17','33','20','33','33','20','50','50','37','37','40','40','25','30','20','38','38','33','35','35','25','50','40','50','33','50','50','29','40','50','20','25','30','31','25','20','29','14']
			},
			highPrice : { // 높은 가격 순
				articleNum : ['s69248367','50355692','30352901','00352894','80280695','90192839','60274742','80471572','60427636','70297856','60297852','s99320385','90297855','20297854','00503591','00411134','80468433','40297853','70470827','80470817','60417915','30422334','10495642','80448459','20370156','90426659','30427973','50448465','80470822','50470833','00456561','90455699','30495170','20469483','10426658','80329442','80483749','60407817','20407819'],
				offerPrice : ['35,800','24,990','19,990','14,990','8,999','7,000','5,999','3,999','2,999','2,999','2,499','2,499','2,249','1,999','1,999','1,500','1,499','1,499','1,299','1,299','1,000','800','799','799','699','599','599','599','499','499','499','499','399','399','399','399','199','149','149'],
				perc : ['14','29','20','25','31','30','25','20','40','50','50','29','50','50','33','40','25','50','35','35','33','38','20','38','30','40','40','25','50','50','37','37','20','33','33','20','33','17','17']
			},
		},
		storeExcld : { // 해당 스토어에서 제외되어야할 상품 넘버
			viewAll : {
				excldNum : ['s69248367','30480654']
			},
			sendai : {
				excldNum : 
				['s69248367','30480654','50470833','00411134','20469483','60407817']
			},
			shinmisato : {
				excldNum : 
				['s69248367','30480654','80470822','50470833','80280695','20469483','70470827','80470817']
			},
			tachikawa : {
				excldNum : 
				['s69248367','30480654','10426658','80471572']
			},
			tokyoBay : {
				excldNum : 
				['s69248367','30480654','00503591','60407817','70470827','80470817']
			},
			kohoku : {
				excldNum : 
				['s69248367','30480654','80468433','00352894','30352901','20469483','80470817']
			},
			nagakute : {
				excldNum : 
				['s69248367','30480654','00411134','90192839','80471572']
			},
			tsuruhama : {
				excldNum : 
				['s69248367','30480654','80468433','80470822','50470833','60427636','80470817']
			},
			kobe : {
				excldNum : 
				['s69248367','30480654','80470822','50470833','90192839','20469483','70470827','80470817']
			},
			fukuokaShingu : {
				excldNum : 
				['s69248367','30480654','30352901','70470827','80470817','80471572']
			},
		},
		delieveryExcld : { // 해당 배송 타입에서 제외되어야 할 상품 넘버
			viewAll : {
				excldNum : []
			},
			parcel : {// Parcel 선택 시 제외되어야 할 상품 넘버
				excldNum: ['s69248367','50355692','00352894','60427636','30352901','00503591']
			},
			delivery : {// Delivery 선택 시 제외되어야 할 상품 넘버
				excldNum : 
				['60274742','30495170','80468433','80470822','50470833','10495642','60417915','00411134','90192839','20370156','40297853','20297854','90297855','60297852','70297856','80280695','s99320385','30422334','20469483','60407817','20407819','80483749','90426659','30427973','10426658','80329442','50448465','80448459','70470827','80470817','00456561','80471572','90455699','30480654']
			},
		},
		filter: function() {
			var artNum = onlineOutlet.prodInfo[priceValue].articleNum.slice();
			var offer = onlineOutlet.prodInfo[priceValue].offerPrice.slice();
			var per = onlineOutlet.prodInfo[priceValue].perc.slice();
			var artLeng = artNum.length;
			
			// 스토어별 제외 상품 필터
			var storeEx = onlineOutlet.storeExcld[storeValue].excldNum;
			var storeExcldLeng = storeEx.length;
			//console.log("스토어 제외상품 갯수 : " + storeExcldLeng);
			console.log(storeExcldLeng);
			
			for (var i = 0; i<storeExcldLeng; i++) {
				for (var j = 0; j<artLeng; j++) {
					if (storeEx[i] == artNum[j]) {
						//해당 요소 삭제
						artNum.splice(j,1);
						offer.splice(j,1);
						per.splice(j,1);
					}
				}
			}
			
			// 배송 타입별 제외 상품 필터
			var deliveryEx = onlineOutlet.delieveryExcld[deliveryValue].excldNum;
			var deliveryExLeng = deliveryEx.length;
			//console.log("배송 제외상품 갯수 : " + deliveryExLeng);

			for (var i = 0; i<deliveryExLeng; i++) {
				for (var j = 0; j<artLeng; j++) {
					if (deliveryEx[i] == artNum[j]) {
						//해당 요소 삭제
						artNum.splice(j,1);
						offer.splice(j,1);
						per.splice(j,1);
					}
				}
			}

			onlineOutlet.newArticleSet = artNum;
			onlineOutlet.newOfferPrice = offer;
			onlineOutlet.newPerc = per;
		},
		prodAjax: function () {
			var ajaxBull = true;

			var saleTemplete = '<span class="salePrice"><span class="value"><span class="unit">¥</span>';
				saleTemplete += '<span class="price">0</span>';
				saleTemplete += '<em class="perc">0</em></span></span>';

			onlineOutlet.divLength = $('.productLoad > div').length + onlineOutlet.addIdx;
			onlineOutlet.addCount = 16;

			// ajax 전에 배열 수정
			onlineOutlet.filter();
			//console.log(onlineOutlet.divLength, onlineOutlet.divLength + onlineOutlet.addCount);
			//console.log('promise?', Promise.all);

			/*
			for (var i = onlineOutlet.divLength; i < (onlineOutlet.divLength + onlineOutlet.addCount); i++) {
				if (i < onlineOutlet.newArticleSet.length) {
					var item_num = onlineOutlet.newArticleSet[i];
					var prod_number = item_num.substring(item_num.length, item_num.length - 3);
					$.ajax({
						url: 'https://www.ikea.com/jp/en/products/'+ prod_number+'/'+ item_num +'-compact-fragment.html',
						dataType: 'html',
						async: false,
						success: function (data) {
							ajaxBull = true;
							propHTML = data;
						},
						error: function () {
							ajaxBull = false;

							onlineOutlet.newOfferPrice[i] = "";
							onlineOutlet.newPerc[i] = "";

							if (onlineOutlet.newOfferPrice[i] == "") {
								onlineOutlet.addCount++;
								onlineOutlet.addIdx++;
							}
							
							if (item_num != "") {
								console.log(item_num + ': PIP does not exist.');
							} else {
								console.log('빈값입니다.');
							}
						},
						complete: function () {
							if(!ajaxBull) return;
			 				// 빈값제거
							new_offerPrice = onlineOutlet.newOfferPrice.filter(function(item) {
								return item !== null && item !== undefined && item !== '';
							});
							new_perc = onlineOutlet.newPerc.filter(function(item) {
								return item !== null && item !== undefined && item !== '';
							});
							
							$('.productLoad').append(propHTML);

							// Sale price
							$('.range-revamp-compact-price-package__price-wrapper').empty();
							
							$('.range-revamp-compact-price-package__price-wrapper').each(function () {
								if ($(this).find('.salePrice').length <= 0) {
									$(this).prepend(saleTemplete);
								}
							});
							$.each(new_offerPrice, function (idx, val) {
								$('.range-revamp-product-compact').eq(idx).find('.salePrice .price').text(val);
							});
							$.each(new_perc, function (idx, val) {
								$('.range-revamp-product-compact').eq(idx).find('.salePrice .perc').text(val);
							});
						},
					});
				}
			}
			$('.vs-loader').removeClass('on').fadeIn(0).fadeOut(1100);
			*/

			/* promise 기반 */
			var promiseArr = [];
			for (var i = onlineOutlet.divLength; i < (onlineOutlet.divLength + onlineOutlet.addCount); i++) {
				if (i < onlineOutlet.newArticleSet.length) {
					var item_num = onlineOutlet.newArticleSet[i];
					var prod_number = item_num.substring(item_num.length, item_num.length - 3);
					var idx = onlineOutlet.divLength>=16 ? i-onlineOutlet.divLength : i;
					//console.log(idx);
					promiseArr[idx] = new Promise(function(resolve, reject){
						$.ajax({
							url: 'https://www.ikea.com/jp/en/products/'+ prod_number+'/'+ item_num +'-compact-fragment.html',
							dataType: 'html',
							async: true,
							success: function (data) {
								resolve(data);
							},
							error: function (request, status, error) {
								console.log('code = '+ request.status + ' message = ' + request.responseText + ' error = ' + error);

								if (item_num != "") {
									console.log(item_num + ': PIP does not exist.');
								} else {
									console.log('빈값입니다.');
								}
								reject(error);
							},
						});
					});
					
				}
			}
			console.log(promiseArr);
			Promise.all(promiseArr).then(function(values) {
				//console.log(values);
				var vlauesSum = values.reduce(function(accumulator, currentValue, currentIndex, array) {
					return accumulator + currentValue;
				}, '');
				
				var new_offerPrice = onlineOutlet.newOfferPrice.filter(function(item) {
					return item !== null && item !== undefined && item !== '';
				});
				var new_perc = onlineOutlet.newPerc.filter(function(item) {
					return item !== null && item !== undefined && item !== '';
				});

				$('.productLoad').append(vlauesSum);

				// Sale price
				$('.range-revamp-compact-price-package__price-wrapper').empty();
											
				$('.range-revamp-compact-price-package__price-wrapper').each(function () {
					if ($(this).find('.salePrice').length <= 0) {
						$(this).prepend(saleTemplete);
					}
				});
				console.log(new_offerPrice, new_perc);
				$.each(new_offerPrice, function (idx, val) {
					$('.range-revamp-product-compact').eq(idx).find('.salePrice .price').text(val);
				});
				$.each(new_perc, function (idx, val) {
					$('.range-revamp-product-compact').eq(idx).find('.salePrice .perc').text(val);
				});

				onlineOutlet.loadMore();

				$('.vs-loader').removeClass('on').fadeIn(0).fadeOut(1100);
				
			})
			.catch(function(err) {
				console.log('err!!!!!', err);
			});


		},
		loadMore: function () {
			onlineOutlet.allCount = onlineOutlet.newArticleSet.length - onlineOutlet.addIdx;
			onlineOutlet.showingCount = $('.productLoad > div:visible').length;
			//console.log("해당 스토어 총 상품 갯수 : " + onlineOutlet.allCount);
			
			$('.showingCount').text(onlineOutlet.showingCount);
			$('.allCount').text(onlineOutlet.allCount);

			if (onlineOutlet.allCount > 16) {
				$('.productList').find('.moreBox').show();
			} else if (onlineOutlet.allCount <= 16 || onlineOutlet.allCount == onlineOutlet.showingCount) {
				$('.productList').find('.moreBox').hide();
			}
			if (onlineOutlet.allCount == onlineOutlet.showingCount) {
				$('.productList').find('.moreBox').hide();
			}
		},
		selectBox : function () {
			$('#onlineOutlet .custom-select').each(function () {
				var classes = $(this).attr('class'),
					id = $(this).attr('id'),
					name = $(this).attr('name');

				var template = '<div class="' + classes + '">';
					template += '<span class="custom-select-trigger">' + $(this).attr('placeholder') + '</span>';
					template += '<div class="custom-options">';

				$(this).find('option').each(function () {
					template += '<span class="custom-option' + '" data-value="' + $(this).attr('value') + '">' + $(this).html() + '</span>';
				});
				
				template += '</div></div>';

				$(this).wrap('<div class="custom-select-wrapper"></div>');
				$(this).hide();
				$(this).after(template);
			});
		}
	}
	
	var geoLocationMain ={
		locationBull : false,
		distanceVal : null,
		distanceIdx : null,
		storeVal : null,
		storeCodeVal : null,
		distanceArray : new Array,
		Mlication : null,
		Slication : {
			0 : { // Sendai
				latitude : 38.2255126,
				longitude : 140.8861657
			},
			1 : { // Shinmisato
				latitude : 35.8562012,
				longitude : 139.8704769
			},
			2 : { // Tachikawa
				latitude : 35.7067128,
				longitude : 139.411832
			},
			3 : { // Tokyo Bay
				latitude : 35.681734,
				longitude : 139.9919662
			},
			4 : { // Kohoku
				latitude : 35.5225821,
				longitude : 139.5900788
			},
			5 : { // Nagakute
				latitude : 35.1760935,
				longitude : 137.0755788
			},
			6 : { // Tsuruhama
				latitude : 34.636868,
				longitude : 135.4498357
			},
			7 : { // Kobe
				latitude : 34.6641527,
				longitude : 135.2186035
			},
			8 : { // Fukuoka Shingu
				latitude : 33.7097119,
				longitude : 130.450423
			}
		},
		getMyLocation : function(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(geoLocationMain.displayLocation, geoLocationMain.displayError);
			}
		},
		displayLocation : function(position){ // 현재 위도,경로 받아오는 함수
			geoLocationMain.locationBull = true;
			if(! geoLocationMain.locationBull) return;
			geoLocationMain.Mlication = position.coords
			$.each(geoLocationMain.Slication, function(idx){
				geoLocationMain.distanceArray[idx] = geoLocationMain.computeDistance(geoLocationMain.Mlication, geoLocationMain.Slication[idx]);
				if(idx == 0){
					geoLocationMain.distanceVal = geoLocationMain.distanceArray[idx];
				}
			});

			$.each(geoLocationMain.distanceArray, function(idx,val){
				if(Math.floor(val) < Math.floor(geoLocationMain.distanceVal)){
					geoLocationMain.distanceVal = val;
					geoLocationMain.distanceIdx = Number(idx);
				};
			});
			switch(geoLocationMain.distanceIdx){
				case null :
					geoLocationMain.storeVal = 'IKEA仙台';
					geoLocationMain.storeCodeVal = 'sendai';
					break;
				case 1 :
					geoLocationMain.storeVal = 'IKEA新三郷';
					geoLocationMain.storeCodeVal = 'shinmisato';
					break;
				case 2 :
					geoLocationMain.storeVal = 'IKEA立川';
					geoLocationMain.storeCodeVal = 'tachikawa';
					break;
				case 3 :
					geoLocationMain.storeVal = 'IKEA Tokyo-Bay';
					geoLocationMain.storeCodeVal = 'tokyoBay';
					break;
				case 4 :
					geoLocationMain.storeVal = 'IKEA港北';
					geoLocationMain.storeCodeVal = 'kohoku';
					break;
				case 5 :
					geoLocationMain.storeVal = 'IKEA長久手';
					geoLocationMain.storeCodeVal = 'nagakute';
					break;
				case 6 :
					geoLocationMain.storeVal = 'IKEA鶴浜';
					geoLocationMain.storeCodeVal = 'tsuruhama';
					break;
				case 7 :
					geoLocationMain.storeVal = 'IKEA神戸';
					geoLocationMain.storeCodeVal = 'kobe';
					break;
				case 8 :
					geoLocationMain.storeVal = 'IKEA福岡新宮';
					geoLocationMain.storeCodeVal = 'fukuokaShingu';
					break;
			};
			
			//console.log(geoLocationMain.storeCodeVal);
			
			onlineOutlet.selectBox();

			//Select box 변경
			if($('#storeSelect .custom-options .selected').length < 1 ) {
				var $newSelected = $('#storeSelect .custom-option[data-value=' + geoLocationMain.storeCodeVal + ']');
				var text = $newSelected.html();
				
				$newSelected.addClass('selected').siblings().removeClass('selected');
				$('#storeSelect .custom-select-trigger').text(text);

				storeValue = geoLocationMain.storeCodeVal;
			}
			onlineOutlet.init();
			onlineOutlet.prodAjax();
			onlineOutlet.loadMore();
			
			onlineOutlet.initEvent();
		},
		displayError : function(error){
			/*
			var errorTypes ={
				0: "알려지지 않은 에러",
				1: "사용자가 권한 거부",
				2: "위치를 찾을 수 없음",
				3: "요청 응답 시간 초과"
			};
			var errorMessage = errorTypes[error.code];
			if(error.code == 0 || error.code == 2){
				errorMessage = errorMessage + " " + error.message;
			}  */
			geoLocationMain.locationBull = false;

			geoLocationMain.storeVal = 'IKEA Tokyo-Bay';
			geoLocationMain.storeCodeVal = 'tokyoBay';

			console.log('GeoLocation Error');

			onlineOutlet.selectBox();

			//Select box 변경
			if($('#storeSelect .custom-options .selected').length < 1) {
				var $originSelected = $('#storeSelect option[value=' + geoLocationMain.storeCodeVal + ']');
				var text = $originSelected.text();
				
				$originSelected.addClass('selected').siblings().removeClass('selected');
				$('#storeSelect .custom-select-trigger').text(text);

				storeValue = geoLocationMain.storeCodeVal;
			}
			onlineOutlet.init();
			onlineOutlet.prodAjax();
			onlineOutlet.loadMore();
			onlineOutlet.initEvent();
		},
		computeDistance : function(startCoords, destCoords){ // 현재 위도,경로를 기준으로 지정된 장소와의 거리측정 함수
			var startLatRads = geoLocationMain.degreesToRadians(startCoords.latitude);
			var startLongRads = geoLocationMain.degreesToRadians(startCoords.longitude);
			var destLatRads = geoLocationMain.degreesToRadians(destCoords.latitude);
			var destLongRads = geoLocationMain.degreesToRadians(destCoords.longitude);
			var Radius = 6371; //지구의 반경(km)
			var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
							Math.cos(startLatRads) * Math.cos(destLatRads) *
							Math.cos(startLongRads - destLongRads)) * Radius;
			return distance;
		},
		degreesToRadians : function(degrees){
			radians = (degrees * Math.PI)/180;
			return radians;
		},
		init : function(){
			geoLocationMain.getMyLocation();
		}
	};
	
	geoLocationMain.init();
})();