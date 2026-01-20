


function info_delete() {
    $('span').each(function () {
        if ($(this).text() == 'custom icon') {
            $(this).parent().parent().addClass('hide');
        }
    });
}

$(document).ready(function () {
    document.querySelectorAll('.custom_icon').forEach(el => {
        if (el.innerText === '') {
            el.style.display = 'none';
        }
    })
});




