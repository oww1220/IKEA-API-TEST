$(function () {
  var campaigns = {
    productset: {
      artNum: [
        // 상품 Article Number, 노출하고자 하는 상품 번호 각각 카테고리별로 배열로 삽입
        ['10459899'],
        ['20487496'],
        ['20457244'],
        ['00429228'],
        //['40457832'],
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
});
