$(function () {
	var url = $(location).attr('href');
	document.getElementById('video-source').controls = false;

	// Tab Event
	$('#sleepComfort .tab > div ul li').click(function () {
		var idx = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('#sleepComfort .contents .list').eq(idx).addClass('on').siblings().removeClass('on');
	});

	var param = url.split('#');
	var paramIdx = $('#sleepComfort .tab ul #' + param[1]).index();

	$('#' + param[1]).addClass('on').siblings().removeClass('on');
	if (paramIdx >= 0) {
		$('#sleepComfort .contents .list').eq(paramIdx).addClass('on').siblings().removeClass('on');
	};

	var cityListVar = 0;
	var cityListSum = $('.cityInfo li').length; //li위치값
	$('.cityInfo li').each(function (e) {
		$(this).css('top', e * 48);
	});

	// 자동롤링
	var cityListSet = setInterval(function () {
		cityListVar++;
		if (cityListVar < cityListSum) {
			$('.cityInfo li').stop().animate({
				'top': '-=48'
			}, 300);
		} else if (cityListVar == cityListSum) {
			$('.cityInfo li').eq(0).css({
				'top': 48
			});
			$('.cityInfo li').stop().animate({
				'top': '-=48'
			}, 300, function () {
				$('.cityInfo li').each(function (e) {
					$(this).css('top', e * 48);
					cityListVar = 0;
				});
			});
		}
	}, 3000);

	

	$(document).on({
		click: function () {
			if ($('#slider-range').val() == 6) {
				$('.rangeCont.ty1, .rangeCont.ty2').css({
					'opacity': '0',
					'z-index': '0'
				}).siblings('.rangeCont.ty3').css({
					'opacity': '1',
					'z-index': '2'
				});
			}
			$('.contBar').show();
		}
	}, '.btnArea a');

	$(document).on({
		click: function () {
			$('.rangeCont.ty2, .rangeCont.ty3').css({
				'opacity': '0',
				'z-index': '0'
			}).siblings('.rangeCont.ty1').css({
				'opacity': '1',
				'z-index': '1'
			});
			$('.contBar').hide();
		}
	}, '.retry a');
});

$('#slider-range').ionRangeSlider({
	type: "single",
	min: 0,
	max: 24,
	from: 6
});

$('#slider-range').on("change", function () {
	var $inp = $(this);
	var dataVal = $inp.prop("value");

	$('.timeTxt ul li').eq(dataVal).addClass('active').siblings().removeClass('active');
	$(document).on({
		click: function () {
			if (dataVal < 14) {
				$('.rangeCont.ty1, .rangeCont.ty2').css({
					'opacity': '0',
					'z-index': '0'
				}).siblings('.rangeCont.ty3').css({
					'opacity': '1',
					'z-index': '2'
				});
			} else {
				$('.rangeCont.ty1, .rangeCont.ty3').css({
					'opacity': '0',
					'z-index': '0'
				}).siblings('.rangeCont.ty2').css({
					'opacity': '1',
					'z-index': '2'
				});
			}
			$('.contBar').show();
		}
	}, '.btnArea a');
});


var sleepComfort = {
	articleSet: null,
	newArticleSet: new Array(),
	divLength: null,
	allCount: null,
	showingCount: null,
	addCount : null,
	addIdx : null,
	initEvent : function () {
		$(document).on({
			click : function(){
				var id = $(this).parent().attr('id');
				// var aa = $(this).parent().outerWidth();
				$(this).parent().addClass('on').siblings().removeClass('on');

				// Reset
				$('.productLoad').empty();
				sleepComfort.prodAjax(id);
			}
		},'.tab li a');
	},
	prodInfo : { // Sorting (상품 기본 세팅)
		comfort : {
			articleNum : ['50452693','70444367','50450953','70450259','30352958','10272340','00272312','20244525','10452713','70483641','50272418','50455168','10298241','00298190','50298140','90343211','70461998','80383293','30383889','30462283','s69198471','90401041','s19296172','s89276991']
		},
		temperature : {
			articleNum : ['40412810','80423091','80461785','80388554','50278590','40486740','20486741','20457244','70457859','40322659','90283448','70450259','90343211','30383889','10383890','60383326','80383293','30462283','00462802','60458576','30459011','20455768','00458800']
		},
		light : {
			articleNum : ['30408615','70406921','40406550','70344462','50356309','s59387556','60373228','70449893','80385640','10404915','00405680','00172789','40341035','70463006','30463013','00465457','20408164','90408212','30290625','70376764','80453894','70369508','40336901','80380478']
		},
		sound : {
			articleNum : ['80427367','40455357','80455360','10455354','60444481','60414021','50444486','40418906','00270153','90425527','80345847','50344991','60470045','10407985','50450038','30277394','00374565','40227879','80401391','80401471','20435209','40357559','30435162','10357594']
		},
		airQuality : {
			articleNum : ['70441991','10441908','50421729','90394154','80294961','90191726','90436738','60175214','80311338','80329041','10337803','10337799','90361808','30361811','80370525','70372657','00442300','10337718','50337716','00337403','20337402']
		},
		roomColourFurnishings : {
			articleNum : ['30392841','70432944','70375420','00460657','10459347','30462462','60423233','10423315','70439455','90439459','30354660','30355730','40421664','80421657','40447678','80439469','30238538','00181557','10188775','10395384','50417223','80417226','70294990','90290359']
		}
	},
	filter: function(id) {
		var artNum = sleepComfort.prodInfo[id].articleNum.slice();

		sleepComfort.newArticleSet = artNum;
	},
	prodAjax: function (id) {
		var ajaxBull = true;

		sleepComfort.divLength = $('.productLoad > div').length + sleepComfort.addIdx;
		sleepComfort.addCount = 24;

		// ajax 전에 배열 수정
		sleepComfort.filter(id);

		/* promise 기반 */
		var promiseArr = [];
		for (var i = sleepComfort.divLength; i < (sleepComfort.divLength + sleepComfort.addCount); i++) {
			if (i < sleepComfort.newArticleSet.length) {
				var item_num = sleepComfort.newArticleSet[i];
				var prod_number = item_num.substring(item_num.length, item_num.length - 3);
				var idx = sleepComfort.divLength>=24 ? i-sleepComfort.divLength : i;
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
								// console.log('빈값입니다.');
							}
							reject(error);
						},
					});
				});
				
			}
		}
		Promise.all(promiseArr).then(function(values) {
			//console.log(values);
			var vlauesSum = values.reduce(function(accumulator, currentValue, currentIndex, array) {
				return accumulator + currentValue;
			}, '');

			$('.productLoad').append(vlauesSum);
			
		})
		.catch(function(err) {
			console.log('err!!!!!', err);
		});
	}
}

var  tabId = $('.tab li.on').attr('id');
sleepComfort.initEvent();
sleepComfort.prodAjax(tabId);