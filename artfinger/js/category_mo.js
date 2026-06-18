
$(document).ready(function () {
    var shopAllUrl = '/product/list.html?cate_no=45';
    $('.d1-wrap-mo > li.d1[data-param*="cate_no=24"] > a').attr('href', shopAllUrl);

    var $d1_wrap = $('.d1-wrap-mo');
    var $ul;
    var hasClass;
    $.ajax({
        url: '/exec/front/Product/SubCategory',
        dataType: 'json',
        success: function (aData) {
            if (aData == null || aData == 'undefined') {
                return;
            }
            $.each(aData, function (index, key) {
                if (key.parent_cate_no == 1) {
                    return;
                }
                var $dd = $d1_wrap.find('li[data-param$="' + key.parent_cate_no + '"]');

                if ($dd.hasClass('d1')) {
                    hasClass = 'd1';
                } else if ($dd.hasClass('d2')) {
                    hasClass = 'd2';
                } else if ($dd.hasClass('d3')) {
                    hasClass = 'd3';
                } else {
                    hasClass = null;
                }

                switch (hasClass) {
                    case 'd1':
                        if ($dd.hasClass('be') === false) {
                            $dd.addClass('be');
                            $dd.append('<ul class="d2-wrap"></ul>');
                            $ul = $dd.find('>.d2-wrap');
                        }
                        $ul.append('<li  data-param="' + key.param + '"   class="d2" ><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a><span class="mid_dro"></span></li>');
                        break;

                    case 'd2':

                        if ($dd.hasClass('be') === false) {
                            $dd.addClass('be');
                            $dd.append('<ul class="d3-wrap"></ul>');
                            $ul = $dd.find('>.d3-wrap');
                        }
                        $ul.append('<li data-param="' + key.param + '"   class="d3"><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a><span class="mid_dro"></span></li>');
                        break;
                }
            });

            // 드롭다운 화살표 클릭 이벤트
            $('.d1-wrap-mo li span.mid_dro').bind('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log($(this).parent().hasClass('be'))
                if ($(this).parent().find('ul').length > 0) {
                    $(this).parent().find('>ul').slideToggle(300);
                    $(this).toggleClass('toacte');
                    $(this).parent().siblings().find('>ul').slideUp(300);
                }
            });

            // 세부 메뉴 링크 클릭 이벤트 (정상 동작 보장)
            $('.d1-wrap-mo li.d2 > a, .d1-wrap-mo li.d3 > a').off('click.categoryMenu').on('click.categoryMenu', function (e) {
                // nonLink 클래스가 있으면 링크 동작 방지
                if ($(this).hasClass('nonLink')) {
                    e.preventDefault();
                    return false;
                }
                // 정상 링크는 그대로 동작하도록 허용
                var href = $(this).attr('href');
                if (href && href !== '#' && href !== 'javascript:void(0)') {
                    // 링크가 정상이면 페이지 이동 허용
                    return true;
                }
            });


            $(".cate_biger li").each(function (index) {
                var ct_cate = $('.title h2.hid_ti2').text();
                var list_cate = $(this).attr("rel");
                var list_wra = $(this).parent(".d2-wrap");
                if (ct_cate == list_cate) {
                    $(this).closest(".d1").addClass('act');
                    $(list_wra).css("display", "block");
                };
            });

            setCategory2();
        }
    });
});

function setCategory2() {
    // 현재 페이지의 카테고리 제목 가져오기
    var look_cate_ti = $('.title h2.hid_ti2').text() || $('.title h2 span').text() || '';

    $("#aside .artfinger_slide_wrap .group_nav .xans-layout-category .menu_v_mo ul.d1-wrap-mo > li > ul.d2-wrap > .d2").each(function (index) {
        var look_cate2 = $(this).closest('.d2-wrap').siblings('a').text();
        if (look_cate_ti == look_cate2) {
            $(this).children('a').addClass('nonLink');
            $(this).children('span').addClass('widLink');
        };

        $('.nonLink').click(function (a) {
            a.preventDefault();
        });
    });
}
/*
$(document).ready(function() {
  var $d1_wrap = $('.d1-wrap');
  var $ul;
  var hasClass;
  $.ajax({
    url: '/exec/front/Product/SubCategory',
    dataType: 'json',
    success: function(aData) {
      if (aData == null || aData == 'undefined') {
        return;
      }
      $.each(aData, function(index, key) {
        if (key.parent_cate_no == 1) {
          return;
        }
        var $dd = $d1_wrap.find('li[data-param$="' + key.parent_cate_no + '"]');
 
        if ($dd.hasClass('d1')) {
          hasClass = 'd1';
        } else {
          hasClass = null;
        }
        switch (hasClass) {
          case 'd1':
            if ($dd.hasClass('be') === false) {
              $dd.addClass('be');
              $dd.append('<ul class="d2-wrap"></ul>');
              $ul = $dd.find('>.d2-wrap');
            }
            $ul.append('<li  rel="' + key.name + '"  class="d2" ><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');
            break;
        }
      });
        
 
        $( ".cate_biger li" ).each(function( index ) {
            var ct_cate = $('.title h2.hid_ti2').text();
            var list_cate = $(this).attr("rel");
            var list_wra = $(this).parent(".d2-wrap");
            if ( ct_cate == list_cate )  {
                $(this).closest(".d1").addClass('act');
                $(list_wra).css("display","block");
            };
        });      
        
        $( ".menuCategory li a" ).each(function( index ) {
            var ct_cate2 = $('.d2-wrap > li.d2').attr("rel");
            var list_cate2 = $(this).attr("rel");
            var list_wra2 = $(".menuCategory");
            if ( ct_cate2 == list_cate2 )  {
                $(list_wra2).css("opacity","0");
            };
        });    
        
    }
  });
});
*/