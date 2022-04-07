$(function () {
  /*
  var campaigns = {
    productset: {
      artNum: [
        // 상품 Article Number, 노출하고자 하는 상품 번호 각각 카테고리별로 배열로 삽입
        ['20487496'],
        ['60383326'],
        ['20513221'],
        ['70450259'],
        ['30522178'],
        //['80383293'],
        //['90383886'],
        //['00462802'],
        //['40457865'],
        //['70450259'],
        //['90343211'],
      ],
      proData: null,
      arrayIdx: null,
      articleVal: null,
      cate: null,
      proAjax: function () {
        $.each(campaigns.productset.artNum, function (idx) {
          campaigns.productset.arrayIdx = idx;
          //console.log(campaigns.productset.arrayIdx)
          $('.prodWrap').eq(campaigns.productset.arrayIdx);
          $.each(
            campaigns.productset.artNum[campaigns.productset.arrayIdx],
            function (subIdx, val) {
              campaigns.productset.articleVal = val;
              campaigns.productset.cate =
                campaigns.productset.articleVal.substring(
                  campaigns.productset.articleVal.length,
                  campaigns.productset.articleVal.length - 3,
                );
              $.ajax({
                url:
                  'https://www.ikea.com/jp/en/products/' +
                  campaigns.productset.cate +
                  '/' +
                  campaigns.productset.articleVal +
                  '-compact-fragment.html',
                dataType: 'html',
                async: false,
                success: function (data) {
                  if (data == null || data.indexOf('product-missing') >= 0) {
                    campaigns.productset.proData = null;
                    console.log(
                      campaigns.productset.arrayIdx +
                        '번째 배열 내 상품없음 : ' +
                        campaigns.productset.articleVal,
                    );
                  } else {
                    campaigns.productset.proData = data;
                  }
                },
                complete: function () {
                  if (
                    campaigns.productset.proData != 'error' &&
                    campaigns.productset.proData != null
                  ) {
                    var proHtml = campaigns.productset.proData;
                    $('.prodWrap')
                      .eq(campaigns.productset.arrayIdx)
                      .append(proHtml);
                  }
                },
                error: function () {
                  console.log(
                    campaigns.productset.arrayIdx +
                      '번째 배열 내 Error 상품없음 : ' +
                      campaigns.productset.articleVal,
                  );
                  campaigns.productset.proData = 'error';
                },
              });
            },
          );
        });
      },
      init: function () {
        campaigns.productset.proAjax();
      },
    },
    init: function () {
      campaigns.productset.init();
    },
  };
  campaigns.init();
	*/

  // callee
  var CampaignsRender = (function () {
    var CampaignsRender = function (
      artNum,
      appendTarget,
      slideTarget,
      nationPath,
    ) {
      this.artNum = artNum;
      this.appendTarget = appendTarget;
      this.slideTarget = slideTarget;
      this.nationPath = nationPath;
      this.proData = null;
      this.arrayIdx = null;
      this.articleVal = null;
      this.cate = null;
      this.slideIns = null;
    };
    CampaignsRender.prototype.init = function () {
      this.proAjax();
      return this;
    };
    CampaignsRender.prototype.proAjax = function () {
      var _this = this;
      $.each(_this.artNum, function (idx) {
        _this.arrayIdx = idx;
        //console.log(_this.arrayIdx)
        $(_this.appendTarget).eq(_this.arrayIdx);
        $.each(_this.artNum[_this.arrayIdx], function (subIdx, val) {
          _this.articleVal = val;
          _this.cate = _this.articleVal.substring(
            _this.articleVal.length,
            _this.articleVal.length - 3,
          );
          $.ajax({
            url:
              'https://www.ikea.com/' +
              _this.nationPath +
              '/products/' +
              _this.cate +
              '/' +
              _this.articleVal +
              '-compact-fragment.html',
            dataType: 'html',
            async: false,
            success: function (data) {
              if (data == null || data.indexOf('product-missing') >= 0) {
                _this.proData = null;
                console.log(
                  _this.arrayIdx +
                    '번째 배열 내 상품없음 : ' +
                    _this.articleVal,
                );
              } else {
                _this.proData = data;
              }
            },
            complete: function () {
              if (_this.proData != 'error' && _this.proData != null) {
                var proHtml = _this.proData;
                $(_this.appendTarget).eq(_this.arrayIdx).append(proHtml);
                _this.setSlide();
              }
            },
            error: function () {
              console.log(
                _this.arrayIdx +
                  '번째 배열 내 Error 상품없음 : ' +
                  _this.articleVal,
              );
              _this.proData = 'error';
            },
          });
        });
      });
    };
    CampaignsRender.prototype.setSlide = function () {
      this.slideIns = new Swiper(this.slideTarget, {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
          el: this.slideTarget + ' .swiper-pagination',
          type: 'progressbar',
          clickable: true,
        },
        navigation: {
          nextEl: this.slideTarget + ' .swiper-button-next',
          prevEl: this.slideTarget + ' .swiper-button-prev',
        },
      });
    };
    return CampaignsRender;
  })();

  // caller
  var slide1 = new CampaignsRender(
    [
      ['20487496'],
      ['60383326'],
      ['20513221'],
      ['70450259'],
      ['30522178'],
      ['90343211'],
    ],
    '.prodWrap_1',
    '.slide04_1',
    'jp/en',
  ).init();

  var slide2 = new CampaignsRender(
    [
      ['80383293'],
      ['60383326'],
      ['00462802'],
      ['40457865'],
      ['70450259'],
      ['90343211'],
      ['30522178'],
    ],
    '.prodWrap_2',
    '.slide04_2',
    'jp/en',
  ).init();
  // console.log(slide1, slide2);
});
