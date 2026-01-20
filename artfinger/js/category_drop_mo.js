
jQuery(function ($) {

    // Side Menu
    var menu_v_m = $('div.menu_v_m');
    var sItem = menu_v_m.find('>ul>li');
    var ssItem = menu_v_m.find('>ul>li>ul>li');
    var lastEvent = null;

    sItem.find('>ul').css('display', 'none');
    menu_v_m.find('>ul>li>ul>li[class=active]').parents('li').attr('class', 'active');
    menu_v_m.find('>ul>li[class=active]').find('>ul').css('display', 'block');

    function menu_vToggle(event) {
        var t = $(this);

        if (this == lastEvent) return false;
        lastEvent = this;
        setTimeout(function () { lastEvent = null }, 400);

        if (t.next('ul').is(':hidden')) {
            sItem.find('>ul').slideUp(300);
            t.next('ul').slideDown(300);
        } else if (!t.next('ul').length) {
            sItem.find('>ul').slideUp(300);
        } else {
            t.next('ul').slideUp(300);
        }

        if (t.parent('li').hasClass('active')) {
            t.parent('li').removeClass('active');
        } else {
            sItem.removeClass('active');
            t.parent('li').addClass('active');
        }
    }
    sItem.find('>span').click(menu_vToggle).focus(menu_vToggle);

    function subMenuActive() {
        ssItem.removeClass('active');
        $(this).parent(ssItem).addClass('active');
    };
    ssItem.find('>span').click(subMenuActive).focus(subMenuActive);


});