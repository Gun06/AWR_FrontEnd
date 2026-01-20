
$(document).ready(function () {
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

            $('.d1-wrap-mo li span.mid_dro').bind('click', function (e) {
                console.log($(this).parent().hasClass('be'))
                if ($(this).parent().find('ul').length > 0) {
                    e.preventDefault();
                    $(this).parent().find('>ul').slideToggle(300);
                    $(this).toggleClass('toacte');
                    $(this).parent().siblings().find('>ul').slideUp(300);
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