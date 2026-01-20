/* base js -> delete js*/
$(document).ready(function () {
    // 토글
    $('div.eToggle .title').click(function () {
        var toggle = $(this).parent('.eToggle');
        if (toggle.hasClass('disable') == false) {
            $(this).parent('.eToggle').toggleClass('selected')
        }
    });

    $('dl.eToggle dt').click(function () {
        $(this).toggleClass('selected');
        $(this).next('dd').toggleClass('selected');
    });



    // 모바일에서 공급사 테이블 th 강제조절
    $('.xans-mall-supplyinfo, .supplyInfo').find('table > colgroup').find('col').eq(0).width(98);
    $('.xans-mall-supplyinfo, .supplyInfo').find('th, td').css({ padding: '13px 10px 12px' });




});

// 공통레이어팝업 오픈
var globalLayerOpenFunc = function (_this) {
    this.id = $(_this).data('id');
    this.param = $(_this).data('param');
    this.basketType = $('#basket_type').val();
    this.url = $(_this).data('url');
    this.layerId = 'ec_temp_mobile_layer';
    this.layerIframeId = 'ec_temp_mobile_iframe_layer';

    var _this = this;

    function paramSetUrl() {
        if (this.param) {
            // if isset param
        } else {
            this.url = this.basketType ? this.url + '?basket_type=' + this.basketType : this.url;
        }
    };

    if (this.url) {
        window.ecScrollTop = $(window).scrollTop();
        $.ajax({
            url: this.url,
            success: function (data) {
                if (data.indexOf('404 페이지 없음') == -1) {
                    // 있다면 삭제
                    try { $(_this).remove(); } catch (e) { }

                    var $layer = $('<div>', {
                        html: $("<iframe>", { src: _this.url, id: _this.layerIframeId, scrolling: 'auto', css: { width: '100%', height: '100%', overflowY: 'auto', border: 0 } }),
                        id: _this.layerId,
                        css: { position: 'absolute', top: 0, left: 0, width: '100%', height: $(window).height(), 'z-index': 9999 }
                    });

                    $('body').append($layer);
                    $('html, body').css({ 'overflowY': 'hidden', height: '100%', width: '100%' });
                    $('#' + this.layerId).show();
                }
            }
        });
    }
};

// 공통레이어팝업 닫기
var globalLayerCloseFunc = function () {
    this.layerId = 'ec_temp_mobile_layer';

    if (window.parent === window)
        self.clse();
    else {
        parent.$('html, body').css({ 'overflowY': 'auto', height: 'auto', width: '100%' });
        parent.$('html, body').scrollTop(parent.window.ecScrollTop);
        parent.$('#' + this.layerId).remove();
    }
};


/* 도움말 */
$('body').delegate('.ec-base-tooltip-area .eTip', 'click', function (e) {
    var findArea = $($(this).parents('.ec-base-tooltip-area'));
    var findTarget = $($(this).siblings('.ec-base-tooltip'));
    var findTooltip = $('.ec-base-tooltip');
    $('.ec-base-tooltip-area').removeClass('show');
    $(this).parents('.ec-base-tooltip-area:first').addClass('show');
    findTooltip.hide();
    findTarget.show();
    e.preventDefault();
});

$('body').delegate('.ec-base-tooltip-area .eClose', 'click', function (e) {
    var findTarget = $(this).parents('.ec-base-tooltip:first');
    $('.ec-base-tooltip-area').removeClass('show');
    findTarget.hide();
    e.preventDefault();
});

$('.ec-base-tooltip-area').find('input').focusout(function () {
    var findTarget = $(this).parents('.ec-base-tooltip-area').find('.ec-base-tooltip');
    $('.ec-base-tooltip-area').removeClass('show');
    findTarget.hide();
});

/**
 * 팝업창에 리사이즈 관련
 */

function setResizePopup() {

    if (!$('#popup').length) return;

    var iWrapWidth = $('#popup').width();
    var iWrapHeight = $('#popup').height();

    var iWindowWidth = $(window).width();
    var iWindowHeight = $(window).height();

    window.resizeBy(iWrapWidth - iWindowWidth, iWrapHeight - iWindowHeight);
}
setResizePopup();

// 팝업 페이지 로드가 완료된 후에 리사이징 함수를 다시 호출
$(window).load(function () {
    setResizePopup();
});



//PC에서만 노출
$(document).ready(function () {
    if (EC_MOBILE_DEVICE === false) {
        $(".editbotPC").removeClass("displaynone");
    } else {
        $(".editbotPC").addClass("displaynone");
    }
});


