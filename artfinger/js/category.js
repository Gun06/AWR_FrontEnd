


$(document).ready(function () {
    var $d1_wrap = $('.d1-wrap_m');
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





            $(".cate_biger li").each(function (index) {
                var ct_cate = $('.title h2.hid_ti2').text();
                var list_cate = $(this).attr("rel");
                var list_wra = $(this).parent(".d2-wrap");
                if (ct_cate == list_cate) {
                    $(".cate_biger").addClass('active');
                    $(list_wra).css("display", "block");
                };
            });

        }
    });
});