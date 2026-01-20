


$(document).ready(function () {
    var $d1_wrap = $('.d1-wrap');
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
                        /*  $ul.append('<li                             rel="' + key.name + '"  class="d2" ><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');  23.07.20-중분류의 마우스오버기능 사용전  */
                        $ul.append('<li data-param="' + key.param + '"  rel="' + key.name + '"  class="d2" ><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');
                        break;

                    case 'd2':
                        if ($dd.hasClass('be') === false) {
                            $dd.addClass('be');
                            $dd.append('<ul class="d3-wrap"></ul>');
                            $ul = $dd.find('>.d3-wrap');
                        }
                        $ul.append('<li data-param="' + key.param + '" class="d3"><a href="/' + this.design_page_url + this.param + '">' + key.name + '</a></li>');
                        break;
                }
            });

            $(".cate_biger li").each(function (index) {
                var ct_cate = $('.title h2.hid_ti2').text();
                var list_cate = $(this).attr("rel");
                var list_wra = $(this).parent(".d2-wrap");
                if (ct_cate == list_cate) {
                    $(list_wra).css("display", "block");
                };
            });


            $(".cate_biger a").each(function (index) {
                var ct_cate2 = $('.title h2.hid_ti3').text();
                var list_cate2 = $(this).text();
                if (ct_cate2 == list_cate2) {
                    $(this).closest(".d1").addClass('current_ca');
                };
            });

            $(".cate_biger a").each(function (index) {
                var ct_cate2 = $('.title h2.hid_ti3').text();
                var list_cate2 = $(this).text();
                if (ct_cate2 == list_cate2) {
                    $(this).closest(".d1").addClass('current_ca');
                };
            });






        }
    });
});