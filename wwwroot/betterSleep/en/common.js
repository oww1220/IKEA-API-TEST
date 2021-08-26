/* add fetch api */
function FetchList(option){
	var FetchList = function(option) {
		this.listMap = option.listMap;
		this.lang = option.lang;
	};
	FetchList.prototype = {
		baseUrl: 'https://www.ikea.com/jp/',
		promiseArray: [],
		listMap: null,
		getUrl: function(uniqueNumber){
			var item_num = String(uniqueNumber);
			var prod_number = item_num.substring(item_num.length, item_num.length - 3);
			return this.baseUrl + option.lang + '/products/'+ prod_number+'/'+ item_num +'-compact-fragment.html';
		},
		getData: function(uniqueNumber) {
			return fetch(
				this.getUrl(uniqueNumber)
			).then(function(response) {
				// Shorthand to check for an HTTP 2xx response status.
				// See https://fetch.spec.whatwg.org/#dom-response-ok
				if (response.ok) {
					return response.text();
				}
				// Raise an exception to reject the promise and trigger the outer .catch() handler.
				// By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
				throw Error(response.statusText);
			})
		},
		getList: function(uniqueKey) {
			var listArray =  this.listMap[uniqueKey];

			if (!listArray) return;
			console.log(listArray);
			this.promiseArray = [];

			for(var i = 0; i < listArray.length; i++) {
				this.promiseArray[i] = this.getData(listArray[i]);
			}

			Promise.all(this.promiseArray).then(function(values) {
				//console.log(values);
				var vlauesSum = values.reduce(function(accumulator, currentValue, currentIndex, array) {
					return accumulator + currentValue;
				}, '');
				
				$(uniqueKey + ' .prodList > div > div').addClass('fetch').empty().append(vlauesSum);
				
			})
			.catch(function(err) {
				console.log('err!!!!!', err);
			});

		},
		reset: function() {

		},

	};

	return new FetchList(option);
}

$(document).ready(function () {

	var options = {
		listMap: {
			'#st_fo_80': ['90272336', '80272308', '60277397', '90290905'],
			'#st_fo_90': ['10272340', '00272312', '30272264', '70290906'],
			'#st_fo_120': ['50272324', '70283802', '80277400', '00290858'],
			'#st_fo_140': ['60272328', '30272301', '60272253', '40290903'],
			'#st_fo_160': ['80272332', '70272304', '70272257', '20290904'],
			'#st_ps_80': ['90244522', '50425831'],
			'#st_ps_90': ['20244525', '70483641', '70425788'],
			'#st_ps_120': ['30244351', '70425825'],
			'#st_ps_140': ['00244512', '30425827'],
			'#st_ps_160': ['90425829', '90244517'],
			'#st_bo_80': ['50352976', '70352956', '60318864'],
			'#st_bo_90': ['10352978', '30352958'],
			'#st_bo_120': ['60352966', '70352942'],
			'#st_bo_140': ['20352968', '30352944'],
			'#st_bo_160': ['40352972', '40352948'],
			'#st_re_80': ['90290905', '80272308', '50425831', '90244522'],
			'#st_re_90': ['70290906', '00272312', '70425788', '20244525'],
			'#st_re_120': ['00290858', '70283802', '70425825', '30244351'],
			'#st_re_140': ['40290903', '30272301', '00244512', '30425827'],
			'#st_re_160': ['20290904', '70272304', '90425829', '90244517'],
			'#si_fo_80': ['90272336', '80272308', '60277397', '90290905'],
			'#si_fo_90': ['10272340', '00272312', '30272264', '70290906'],
			'#si_fo_120': ['50272324', '70283802', '80277400', '00290858'],
			'#si_fo_140': ['60272328', '30272301', '60272253', '40290903'],
			'#si_fo_160': ['80272332', '70272304', '70272257', '20290904'],
			'#si_ps_80': ['90244522', '50425831'],
			'#si_ps_90': ['20244525', '70483641', '70425788'],
			'#si_ps_120': ['30244351', '70425825'],
			'#si_ps_140': ['00244512', '30425827'],
			'#si_ps_160': ['90425829', '90244517'],
			'#si_bo_80': ['50352976', '70352956', '60318864'],
			'#si_bo_90': ['10352978', '30352958'],
			'#si_bo_120': ['60352966', '70352942'],
			'#si_bo_140': ['20352968', '30352944'],
			'#si_bo_160': ['40352972', '40352948'],
			'#si_re_80': ['60277397', '80272308', '50425831', '90244522'],
			'#si_re_90': ['30272264', '00272312', '70425788', '20244525'],
			'#si_re_120': ['80277400', '70283802', '70425825', '30244351'],
			'#si_re_140': ['60272253', '30272301', '00244512', '30425827'],
			'#si_re_160': ['70272257', '70272304', '90425829', '90244517'],
			// km start
			'#ba_ps_80': ['10478256','20494977','10455170','60478485'],
			'#ba_ps_90': ['10452713', '90484970' ,'50455168' ,'00478488'],
			'#ba_ps_120': ['90452709','80484961','30455169','70478475'],
			'#ba_ps_140':['60478254', '80485343' ,'90455171','30478477'],
			'#ba_ps_160':['30478255','60485344','70455172','70478480'],
			'#ba_bo_90': ['40453589'],
			'#ba_bo_140': ['70453583'],
			'#ba_re_80': ['10478256','20494977','10455170','70352956'],
			'#ba_re_90': ['10452713','30352958','90484970','50455168'],
			'#ba_re_120': ['90452709','80484961','30455169','70352942'],
			'#ba_re_140':['60478254','30352944','80485343','90455171'],
			'#ba_re_160': ['30478255','60485344','70455172','40352948'],
			// PILLOW
			'#st_df':['90460276','80460314','50460235'],
			'#st_po':['60424237','80460385','70460588','30460547',],
			'#st_er':['50452693','70450259'],
			'#st_re':['60424237','80460385','70460588','90460276'],
			'#si_df':['90460281','90460295','70460215'],
			'#si_po':['70460569','20460369','50398291','30460528'],
			'#si_er':['70444367','50450953','90450951','70450259'],
			'#si_re':['70460569','70444367','50450953','90450951'],
			'#mu_df':['90460276','90460281','80460314','50460235'],
			'#mu_po':['70460569','60424237','80460385','20460369'],
			'#mu_er':['50452693','70450259'],
			'#mu_re':['50452693','70450259'],
			// Duvets
			'#co_na_150':['20457244'],
			'#co_na_200':['10457249'],
			'#co_sy_150':['40457832','70457859','20486741','40486740'],
			'#co_sy_200':['30457837','40457865'],
			'#co_re_150':['20457244','40457832','70457859','20486741'],
			'#co_re_200':['10457249','30457837','40457865'],
			'#lw_df_150':['60457459','60456841','00467871','20455768'],
			'#lw_df_200':['60457464','50456846','80467872','00455769'],
			'#lw_na_150':['00457122','30459011'],
			'#lw_na_200':['90457127','10459012'],
			'#lw_sy_150':['30457007','10424225','80489925','60458576'],
			'#lw_sy_200':['10457013','60489926','80458575'],
			'#lw_re_150':['30457007','00457122','10424225','60457459'],
			'#lw_re_200':['10457013','90457127','60457464','50456846'],
			'#wa_df_150':['80459037','30458530','40458049','20455768'],
			'#wa_df_200':['40459044' , '20458535' , '40458054' , '00455769'],
			'#wa_na_150':['80458090','00484168','30459011'],
			'#wa_na_200':['70458095','00484173','10459012'],
			'#wa_sy_150':['30457979','80257992','60458576'],
			'#wa_sy_200':['00457985','80458575'],
			'#wa_re_150':['30457979','80458090','80257992','80459037'],
			'#wa_re_200':['00457985','70458095','40459044','20458535'],
			'#ew_df_150':['70459293','20458724','50458336','30309385'],
			'#ew_df_200':['20459295','70458731','30458342','70309388'],
			'#ew_na_150':['00458635','30459011'],
			'#ew_na_200':['00458640','10459012'],
			'#ew_sy_150':['00458428','60458576'],
			'#ew_sy_200':['00458433','80458575'],
			'#ew_re_150':['00458428','00458635','70459293','20458724'],
			'#ew_re_200':['00458433','00458640','20459295','70458731'],
			'#as_df_150':['20455768','00458800'],
			'#as_df_200':['00455769','90458805'],
			'#as_na_150':['30459011'],
			'#as_na_200':['10459012'],
			'#as_sy_150':['60458576'],
			'#as_sy_200':['80458575'],
			'#as_re_150':['20455768','60458576','30459011','00458800'],
			'#as_re_200':['80458575','00455769','10459012','90458805']
		},
		lang: 'en',
	}

	var fetchIns = FetchList(options);

	$(document).on({
		click: function () {
			if(!$(this).find('.bottom').is(':visible')){
				$(this).find('.bottom').slideDown();
			}else{
				$(this).find('.bottom').slideUp();
			}
			
		}
	}, '.topCont .listCont > ul > li');
	
	/*Choice Generator*/
	/*btn disabled*/
	$('.card .btn.ty1').each(function () {
		if ($(this).hasClass('disabled')) {
			$(this).find('button').attr('disabled', true);
		} else {
			$(this).find('button').attr('disabled', false);
		}
	});
	/*selected*/
	$(document).on({
		click: function (e) {
			var selected = $(this).find('.selected');

			if ($(this).parent('li').hasClass('deactive')) {
				return;
			}

			if (!selected.is(':visible')) {
				$(this).parents('li').siblings('li').find('.selected').removeClass('on');
				selected.addClass('on');
				$(this).parents('.card').find('.btn.ty1').removeClass('disabled');
				$(this).parents('.card').find('button').attr('disabled', false);

			} else {
				selected.removeClass('on');
				$(this).parents('.card').find('.btn.ty1').addClass('disabled');
				$(this).parents('.card').find('button').attr('disabled', true);
			}
		}
	}, '.stepCont .selectBox li a');
	/*START*/
	$(document).on({
		click: function () {
			$(this).parents('.cardArea').find('.loading').css('display', 'block').fadeOut(1500);
			$(this).parents('.cardArea').find('.step1').css('display', 'block');
			$(this).parents('.cardArea').find('.selected').removeClass('on');
			$(this).parents('.cardArea').find('.btn.ty1').addClass('disabled');
			$(this).parents('.cardArea').find('button').attr('disabled', true);
			$(this).parents('.cardArea').find('.dis').parents('li').removeClass('deactive');
			$(this).parents('.cardArea').find('.selectBox').find('.dis').css('display', 'none');
			$(this).parents('.cardArea').find('.selectBox').find('.dis2').css('display', 'none');
		}
	}, '.cardArea .btn.start a');
	/*BACK*/
	$(document).on({
		click: function () {
			$(this).parents('.stepCont').css('display', 'none');

			if ($(this).parents('stepCont').hasClass('step1')) {
				$(this).parents('.cardArea').find('.dis').parents('li').removeClass('deactive');
				$(this).parents('.cardArea').find('.selectBox ').find('.dis').css('display', 'none');
			}
		}
	}, '.btn.back a');
	/*Tri it again*/
	$(document).on({
		click: function () {
			$(this).parents('.cardArea').find('.loading').css('display', 'none').removeClass('fadeout');
			$(this).parents('.cardArea').find('.step1').css('display', 'none');
			$(this).parents('.cardArea').find('.step2').css('display', 'none');
			$(this).parents('.cardArea').find('.step3').css('display', 'none');
			$(this).parents('.cardArea').find('.step4').css('display', 'none');
			$(this).parents('.cardArea').find('.selected').removeClass('on');
			$(this).parents('.cardArea').find('.btn.ty1').addClass('disabled');
			$(this).parents('.cardArea').find('button').attr('disabled', true);
			$(this).parents('.cardArea').find('.dis').parents('li').removeClass('deactive');
			$(this).parents('.cardArea').find('.selectBox ').find('.dis').css('display', 'none');
		}
	}, '.btn.last');

	/*STEP1*/
	$(document).on({
		click: function () {
			if ($(this).parent('.btn').hasClass('disabled')) {
				return;
			}
			$(this).parents('.cardArea').find('.step2').css('display', 'block');
		}
	}, '.step1 .btn button');
	/*STEP2*/
	$(document).on({
		click: function () {
			if ($(this).parent('.btn').hasClass('disabled')) {
				return;
			}
			$(this).parents('.cardArea').find('.step3').css('display', 'block');
		}
	}, '.step2 .btn button');
	/*STEP3*/
	$(document).on({
		click: function () {
			if ($(this).parent('.btn').hasClass('disabled')) {
				return;
			}
			$(this).parents('.cardArea').find('.step4').css('display', 'block');
		}
	}, '.step3 .btn button');

	/*Result*/
	$(document).on({
		click: function () {
			/*step1.on*/
			var s1_on = $(this).parents('.cardArea').find('.step1').find('.selected.on');
			var s1_class = s1_on.parents('li').attr('class');
			/*step2.on*/
			var s2_on = $(this).parents('.cardArea').find('.step2').find('.selected.on');
			var s2_class = s2_on.parents('li').attr('class');
			/*step3.on*/
			var s3_on = $(this).parents('.cardArea').find('.step3').find('.selected.on');
			var s3_class = s3_on.parents('li').attr('class');

			if (s3_class == undefined) {
				var id = '#' + s1_class + '_' + s2_class;
				console.log(id)
			} else if (s3_class !== undefined) {
				var id = '#' + s1_class + '_' + s2_class + '_' + s3_class;
				console.log(id)
			}

			if(!$(id).find('.prodList > div > div').hasClass('fetch')) fetchIns.getList(id);
			//fetchIns.getList(id);

			$(this).parents('.cardArea').find('.lastCont').children('.stepList').css('display', 'none');
			$(this).parents('.cardArea').find(id).css('display', 'block');
		}
	}, '.btn.seeResult');

	//Disable
	$(document).on({
		click: function () {
			var s1_class = $(this).parents('.stepList').find('.selected.on').parents('li').attr('class');
			
			if (s1_class == 'ba') {
				$(this).parents('.cardArea').find('.step2').find('li.fo').addClass('deactive');
				$(this).parents('.cardArea').find('.step2').find('.dis2').css('display', 'block');
			} else {
				$(this).parents('.cardArea').find('.step2').find('li.fo').removeClass('deactive');
				$(this).parents('.cardArea').find('.step2').find('.dis2').css('display', 'none');
			}
		}
	}, '.step1 .btn.ty1');

	$(document).on({
		click: function () {
			var s1_class = $(this).parents('.cardArea').find('.step1').find('.selected.on').parents('li').attr('class');
			var s2_class = $(this).parents('.cardArea').find('.step2').find('.selected.on').parents('li').attr('class');

			if (s1_class == 'ba' && s2_class == 'bo') {
				$(this).parents('.cardArea').find('.step3').find('li.80').addClass('deactive');
				$(this).parents('.cardArea').find('.step3').find('li.80 .dis').css('display', 'block');

				$(this).parents('.cardArea').find('.step3').find('li.120').addClass('deactive');
				$(this).parents('.cardArea').find('.step3').find('li.120 .dis').css('display', 'block');

				$(this).parents('.cardArea').find('.step3').find('li.160').addClass('deactive');
				$(this).parents('.cardArea').find('.step3').find('li.160 .dis').css('display', 'block');
			} else {
				$(this).parents('.cardArea').find('.step3').find('li.80').removeClass('deactive');
				$(this).parents('.cardArea').find('.step3').find('li.80 .dis').css('display', 'none');

				$(this).parents('.cardArea').find('.step3').find('li.120').removeClass('deactive');
				$(this).parents('.cardArea').find('.step3').find('li.120 .dis').css('display', 'none');

				$(this).parents('.cardArea').find('.step3').find('li.160').removeClass('deactive');
				$(this).parents('.cardArea').find('.step3').find('li.160 .dis').css('display', 'none');
			}
		}
	}, '.step2 .btn.ty1');

	$(document).on({
		click: function () {
			var s1_class = $(this).parents('.stepList').find('.selected.on').parents('li').attr('class');
			if (s1_class == 'co') {
				$(this).parents('.cardArea').find('.step2').find('li.df').addClass('deactive');
				$(this).parents('.cardArea').find('.step2').find('.dis').css('display', 'block');
			} else {
				$(this).parents('.cardArea').find('.step2').find('li.df').removeClass('deactive');
				$(this).parents('.cardArea').find('.step2').find('.dis').css('display', 'none');
			}
		}
	}, '.step1 .btn.ty1');

	/*TAB*/
	$(document).on({
		click: function (e) {
			e.preventDefault();
			var idx = $(this).index();
			
			$('.tabCont').each(function(){
				$(this).find('li').eq(idx).addClass('on').siblings().removeClass('on');
			});
			
			$('.genArea > div').eq(idx).addClass('on').siblings().removeClass('on');
			$('.infoArea > div').eq(idx).addClass('on').siblings().removeClass('on');
		}
	}, '.tabCont li');

	//  탭메뉴 클릭시 스크롤 이동
	$(document).on({
		click : function(e){
			e.preventDefault();
			var toptab = $('.tabCont.top').offset().top - 100;
			$('html, body').animate({
				scrollTop: toptab
			}, 500);
		}
	},'.tabCont li');

	/*Learn More*/
	$('.btn.more > a').off('click').on('click', function () {
		var hidden = $(this).parents('.infoList').find('.hidden');

		if (!hidden.is(':visible')) {
			var btnStop = $(document).scrollTop();
			$('html, body').stop().animate({
				scrollTop: btnStop
			});
			hidden.slideDown();
			$(this).children('.mTxt').text('Close');
			$(this).children('.ico').addClass('close');
		} else {
			hidden.slideUp();
			$(this).children('.mTxt').text('Learn more');
			$(this).children('.ico').removeClass('close');
		}
	});

	var popup = $('.popupCont .popup');
	var topPopup = $('.topContPopup > .popCont');

	/*Pop up*/
	$(document).on({
		click: function () {
			var txt = $(this).text();
			var id = '#' + txt;

			if (!popup.is(':visible')) {
				$(id).show();
			}
		}
	}, '.iBtn');
	$(document).on({
		click: function () {
			if (popup.is(':visible')) {
				popup.hide();
			}
		}
	}, '.closeBtn');
	$(document).on({
		click: function (e) {
			if ($('.dimmed').is(e.target)) {
				popup.hide();
			}
			if ($('.topContPopup > .dimmed').is(e.target)) {
				$('.topContPopup').hide();
			}
		}
	});
	$(document).on({
		click: function () {
			var idx = $(this).index();
			if (!$('.topContPopup').is(':visible')) {
				$('.topContPopup').show();
				$('.topContPopup .popCont > div').eq(idx).addClass('on').siblings().removeClass('on');
			}
		}
	}, '.topCont .listCont ul li');
	$(document).on({
		click: function () {
			$('.topContPopup').hide();
		}
	}, '.topContPopup .popCont .closeBtn');

	/*Slider*/
	$('.bSlide').slick({
		dots: true,
		arrows: true,
		speed: 300,
		slidesToShow: 1,
	});
	$('.mSlide.ty1').slick({
		infinite: true,
		arrows: true,
		dots: false,
		speed: 300,
		slidesToShow: 1,
	});
	$('.mSlide.ty2').slick({
		infinite: true,
		arrows: true,
		dots: false,
		speed: 300,
		slidesToShow: 1,
	});
});



setTimeout(function () {
	$('.ikeaPage').css('opacity', 1);
	/*
	// 컨텐츠가 full width 일때 height값 적용
	var contHeight = $('.ikeaPage').outerHeight();
	// console.log(contHeight);
	$('.ikeaPage').parent().css('height',contHeight); */
}, 800);

/*
// 리사이즈 될때 height값 적용
$(window).resize(function(){
	var contHeight = $('.ikeaPage').outerHeight();
	// console.log(contHeight);
	$('.ikeaPage').parent().css('height',contHeight)
}); */



