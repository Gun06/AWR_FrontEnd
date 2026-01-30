$(document).ready(function () {
    // 상품리스트 전체선택
    $('#product_select_all').bind('click', function () {
        var _status = $(this).data('status');

        $('[id^="basket_chk_id_"]').each(function () {
            var bChecked = $(this).is(":checked");

            if (_status == 'off') {
                if (bChecked === false) $(this).attr('checked', true);
            } else {
                $(this).attr('checked', false);
            }
        });

        $(this).data('status', _status == 'off' ? 'on' : 'off');
        fixedLayerPriceSet();
    });

    // 고정영역에 상품정보 세팅
    var fixedLayerPriceSet = function () {
        var iSumPrice = 0;
        var iCheckPrdCnt = 0;
        $('[id^="basket_chk_id_"]').each(function () {
            if ($(this).attr('checked') == true) {
                var sCheckId = $(this).attr('id');
                var aTemp = sCheckId.split('_');
                var iCheckId = aTemp[3];
                var iQuantity = $('#quantity_id_' + iCheckId).val();
                var iProductPrice = aBasketProductData[iCheckId].product_sum_price * iQuantity;
                iSumPrice = iSumPrice + iProductPrice;
                iCheckPrdCnt = iCheckPrdCnt + 1;
            }
        });
        if (iCheckPrdCnt > 0) {
            var sTotalPrice = SHOP_PRICE_FORMAT.toShopPrice(iSumPrice);
            $('#checked_order_count').html('<strong>' + sprintf(__('%s'), iCheckPrdCnt) + '</strong>' + '개 상품선택').css('padding-bottom', '5px');
            $('#checked_order_price').html('결제예정금액 <strong><em>' + sTotalPrice + '</em></strong>').css('padding-bottom', '5px');

            var sPriceRef = SHOP_PRICE_FORMAT.shopPriceToSubPrice(iSumPrice);
            if (sPriceRef != '') $('#checked_order_price').find('strong').append(sPriceRef);
        } else {
            fixLayerPriceRest();
        }
    };

    // 고정영역 상품합계초기화
    var fixLayerPriceRest = function () {
        $('#checked_order_count, #checked_order_price').html('').css('padding-bottom', '0');
    };

    fixLayerPriceRest();

    // 장바구니 체크박스 체크시 상품총합계, 체크한 숫자 구하기
    $('[id^="basket_chk_id_"]').click(function (e) {
        fixedLayerPriceSet();
    });

    // 관심상품 등록 기능: 관리자 설정에 따라 장바구니 내 관심상품 링크 표시/숨김
    // 헤더의 관심상품 링크가 숨겨져 있으면 장바구니 링크도 숨김
    function toggleBasketInterestLink() {
        var $headerInterestLink = $('a[href="/myshop/wish_list.html"]');
        var isHeaderHidden = false;

        if ($headerInterestLink.length > 0) {
            var $parentLi = $headerInterestLink.closest('li');
            // displaynone 클래스가 있거나, 실제로 숨겨져 있는지 확인
            isHeaderHidden = $parentLi.hasClass('displaynone') ||
                $parentLi.css('display') === 'none' ||
                !$parentLi.is(':visible');
        } else {
            // 헤더에 관심상품 링크가 아예 없으면 사용안함으로 간주
            isHeaderHidden = true;
        }

        if (isHeaderHidden) {
            $('.js-basket-interest-prd-link').addClass('displaynone');
        } else {
            $('.js-basket-interest-prd-link').removeClass('displaynone');
        }
    }

    // 즉시 실행 및 약간의 지연 후 재실행 (헤더 렌더링 대기)
    toggleBasketInterestLink();
    setTimeout(toggleBasketInterestLink, 100);
});

// 장바구니 선택상품 삭제
function selBasketDel(id) {
    $('[id^="' + BASKET_CHK_ID_PREFIX + '"]').attr('checked', false);
    $('[id="' + id + '"]').attr('checked', true);
    Basket.deleteBasket();
}