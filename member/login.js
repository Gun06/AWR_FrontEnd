document.addEventListener('DOMContentLoaded', function () {
    var $scope = $(".dnd_module_9742c60d3a2ee81fffada3eade8d931d");
    $scope.find('.headerMenu .btnSearch').unbind('click.btnSearch').bind('click.btnSearch', function () {
        var $header = $(this).closest('#header');
        $header.addClass('open');
        $header.find('#dimmedSlider').one("click", function () {
            $header.removeClass('open');
        });
    });
    $('.xans-layout-searchheader').find('button.btnDelete').unbind('click.btnDelete').bind('click.btnDelete', function () {
        $('.topSearch').find('input#keyword').attr('value', '').focus();
    });
});
(function () {
    function pageLoaded() {
    }
    function dndComponent() {

        var $scope = $(".dnd_module_c785e267507864e0f86dfc2033986f74");
        var calculateNavigationCategoryTimer = null,
            $navigation = $scope.find("#navigation");

        function calculateNavigationCategory() {

            var $navigationCategory = $("#navigation > .inner .category"),
                $categoryChild = $navigationCategory.children(),
                calculate = 0;

            if (!$navigationCategory.length) return;

            $categoryChild.each(function (idx) {
                calculate = calculate + $(this).outerWidth(true) + parseInt($(this).css('marginLeft'), 10);
            });

            if ($navigationCategory.width() < calculate + 50) {

                $("#navigation").addClass('isShort');

            } else {

                $("#navigation").removeClass('isShort');

            }

        }

        if ($navigation.length) {

            $(window).bind('resize.calculateNavigationCategory', function () {
                if (calculateNavigationCategoryTimer) clearTimeout(calculateNavigationCategoryTimer);
                calculateNavigationCategoryTimer = setTimeout(calculateNavigationCategory, 100);
            }).trigger("resize.calculateNavigationCategory");

        }

        $scope.find('.eToggleCateLayer').click(function () {
            $scope.find('> nav').toggleClass('open');
            $('.navDimmed').toggleClass('show');
        });

    }

    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }

})();
document.addEventListener('DOMContentLoaded', function () {
    var $scope = $(".dnd_module_403fc44481ecc8740bce862728fdc832");
    //로그인폼 placeholder 추가 (basic.js의 ePlaceholder 처리 이후 실행)
    function setLoginPlaceholders() {
        // 모든 가능한 셀렉터로 ID 입력 필드 찾기
        var $memberId = $('#member_id');
        if ($memberId.length === 0) {
            $memberId = $('.xans-member-login .id input[type="text"], .xans-member-login .id input[type="email"]');
        }
        if ($memberId.length === 0) {
            $memberId = $('.xans-member-login .id.ePlaceholder input');
        }
        if ($memberId.length === 0) {
            $memberId = $('.xans-member-login .id input');
        }
        if ($memberId.length === 0) {
            $memberId = $('.sign-in-section .id input');
        }

        // 모든 가능한 셀렉터로 Password 입력 필드 찾기
        var $memberPasswd = $('#member_passwd');
        if ($memberPasswd.length === 0) {
            $memberPasswd = $('.xans-member-login .password input[type="password"]');
        }
        if ($memberPasswd.length === 0) {
            $memberPasswd = $('.xans-member-login .password.ePlaceholder input');
        }
        if ($memberPasswd.length === 0) {
            $memberPasswd = $('.xans-member-login .password input');
        }
        if ($memberPasswd.length === 0) {
            $memberPasswd = $('.sign-in-section .password input');
        }

        if ($memberId.length) {
            // placeholder 강제 설정 (모든 방법 사용)
            $memberId.attr('placeholder', 'ID');
            $memberId.prop('placeholder', 'ID');
            if ($memberId[0]) {
                $memberId[0].placeholder = 'ID';
                $memberId[0].setAttribute('placeholder', 'ID');
                // 직접 속성 설정
                try {
                    Object.defineProperty($memberId[0], 'placeholder', {
                        value: 'ID',
                        writable: true,
                        configurable: true
                    });
                } catch (e) { }
            }

            // label 찾기 및 처리
            var $labelId = $memberId.closest('label');
            if ($labelId.length === 0) {
                $labelId = $memberId.parent('label');
            }
            if ($labelId.length) {
                // label의 모든 텍스트 노드 제거
                $labelId.contents().each(function () {
                    if (this.nodeType === 3) {
                        var text = this.textContent || this.nodeValue;
                        if (text && text.trim() !== '' && !$(this).siblings('input').length) {
                            $(this).remove();
                        }
                    }
                });

                // label의 모든 자식 요소 중 input이 아닌 것 숨기기
                $labelId.children().not('input').hide();
                $labelId.find('span').not($memberId).hide();

                // CSS 강제 적용 (박스처럼 보이지 않도록)
                $labelId.css({
                    'font-size': '0',
                    'line-height': '0',
                    'color': 'transparent',
                    'text-indent': '-9999px',
                    'border': '0 none',
                    'border-width': '0',
                    'border-style': 'none',
                    'border-color': 'transparent',
                    'background': 'none',
                    'background-color': 'transparent',
                    'background-image': 'none',
                    'box-shadow': 'none',
                    'outline': 'none',
                    'padding': '0',
                    'margin': '0 0 12px'
                });
            }

            // basic.js가 생성한 span 숨기기
            $memberId.prev('span').hide().remove();
            $memberId.siblings('span').hide().remove();
        }

        if ($memberPasswd.length) {
            // placeholder 강제 설정 (모든 방법 사용)
            $memberPasswd.attr('placeholder', 'Password');
            $memberPasswd.prop('placeholder', 'Password');
            if ($memberPasswd[0]) {
                $memberPasswd[0].placeholder = 'Password';
                $memberPasswd[0].setAttribute('placeholder', 'Password');
                // 직접 속성 설정
                try {
                    Object.defineProperty($memberPasswd[0], 'placeholder', {
                        value: 'Password',
                        writable: true,
                        configurable: true
                    });
                } catch (e) { }
            }

            // label 찾기 및 처리
            var $labelPasswd = $memberPasswd.closest('label');
            if ($labelPasswd.length === 0) {
                $labelPasswd = $memberPasswd.parent('label');
            }
            if ($labelPasswd.length) {
                // label의 모든 텍스트 노드 제거
                $labelPasswd.contents().each(function () {
                    if (this.nodeType === 3) {
                        var text = this.textContent || this.nodeValue;
                        if (text && text.trim() !== '' && !$(this).siblings('input').length) {
                            $(this).remove();
                        }
                    }
                });

                // label의 모든 자식 요소 중 input이 아닌 것 숨기기
                $labelPasswd.children().not('input').hide();
                $labelPasswd.find('span').not($memberPasswd).hide();

                // CSS 강제 적용 (박스처럼 보이지 않도록)
                $labelPasswd.css({
                    'font-size': '0',
                    'line-height': '0',
                    'color': 'transparent',
                    'text-indent': '-9999px',
                    'border': '0 none',
                    'border-width': '0',
                    'border-style': 'none',
                    'border-color': 'transparent',
                    'background': 'none',
                    'background-color': 'transparent',
                    'background-image': 'none',
                    'box-shadow': 'none',
                    'outline': 'none',
                    'padding': '0',
                    'margin': '0 0 12px'
                });
            }

            // basic.js가 생성한 span 숨기기
            $memberPasswd.prev('span').hide().remove();
            $memberPasswd.siblings('span').hide().remove();
        }

        // 디버깅용 콘솔 출력
        if (typeof console !== 'undefined' && console.log) {
            console.log('ID input found:', $memberId.length, $memberId.length ? $memberId[0].placeholder : 'none');
            console.log('Password input found:', $memberPasswd.length, $memberPasswd.length ? $memberPasswd[0].placeholder : 'none');
        }
    }

    if ($('.xans-member-login').length > 0) {
        // window.load 후에도 실행 (모든 스크립트 로드 완료 후)
        $(window).on('load', function () {
            setTimeout(setLoginPlaceholders, 0);
            setTimeout(setLoginPlaceholders, 100);
            setTimeout(setLoginPlaceholders, 300);
        });

        // basic.js가 실행된 후에 실행되도록 지연
        setTimeout(setLoginPlaceholders, 0);
        setTimeout(setLoginPlaceholders, 50);
        setTimeout(setLoginPlaceholders, 100);
        setTimeout(setLoginPlaceholders, 200);
        setTimeout(setLoginPlaceholders, 300);
        setTimeout(setLoginPlaceholders, 500);
        setTimeout(setLoginPlaceholders, 1000);
        setTimeout(setLoginPlaceholders, 2000);
        setTimeout(setLoginPlaceholders, 3000);

        // MutationObserver로 input이 추가될 때 감지
        if (typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(function (mutations) {
                setTimeout(setLoginPlaceholders, 50);
            });

            var $loginSection = $('.xans-member-login .sign-in-section');
            if ($loginSection.length) {
                observer.observe($loginSection[0], {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
            }
        }

        // input 이벤트로도 감지 및 placeholder 재설정
        $(document).on('focus focusin click', '.xans-member-login .id input, .xans-member-login .password input, .sign-in-section .id input, .sign-in-section .password input', function () {
            var $input = $(this);
            var placeholderText = ($input.attr('type') === 'password') ? 'Password' : 'ID';

            $input.attr('placeholder', placeholderText);
            if ($input[0]) {
                $input[0].placeholder = placeholderText;
                $input[0].setAttribute('placeholder', placeholderText);
            }

            // span 숨기기
            $input.prev('span').hide().remove();
            $input.siblings('span').hide().remove();
            $input.closest('label').find('span').not($input).hide().remove();
        });

        // input 값 변경 시에도 placeholder 확인
        $(document).on('input change', '.xans-member-login .id input, .xans-member-login .password input, .sign-in-section .id input, .sign-in-section .password input', function () {
            var $input = $(this);
            if (!$input.val() && !$input.attr('placeholder')) {
                var placeholderText = ($input.attr('type') === 'password') ? 'Password' : 'ID';
                $input.attr('placeholder', placeholderText);
                if ($input[0]) $input[0].placeholder = placeholderText;
            }
        });
    }
    if ($('.xans-myshop-orderhistorynologin').length > 0) {
        setTimeout(function () {
            if ($('#order_name').length && !$('#order_name').attr('placeholder')) {
                $('#order_name').attr('placeholder', '이름');
            }
            if ($('#order_id1').length && !$('#order_id1').attr('placeholder')) {
                $('#order_id1').attr('placeholder', '주문번호');
            }
            if ($('#order_id').length && !$('#order_id').attr('placeholder')) {
                $('#order_id').attr('placeholder', '주문번호');
            }
            if ($('#order_password').length && !$('#order_password').attr('placeholder')) {
                $('#order_password').attr('placeholder', '게스트 비밀번호');
            }
        }, 100);
    }
    //키보드 미리보기
    $('.keyboard button').click(function () {
        if ($(this).hasClass('selected') == true) {
            $('.keyboard .btnKey').removeClass('selected');
            $('.view div').hide();
        }
        else {
            $('.keyboard .btnKey').removeClass('selected');
            $('.view div').hide();
            $(this).addClass('selected');
            var key = $(this).attr('title');
            $(this).parent().next().children('.' + key + '').show();
        }
    });
    // 회원&비회원 토글
    $('.memberTab').each(function () {
        var selected = $(this).find('> ul > li.selected > a');
    });
    $('body').delegate('.memberTab a', 'click', function (e) {
        var _target = $(this).attr('href');
        if (_target == '#member') {
            $('.memberLogin').show();
            $('.orderHistoryNoLogin').hide();
        } else {
            $('.memberLogin').hide();
            $('.orderHistoryNoLogin').show();
        }
        e.preventDefault();
    });

    // Order Status 토글
    var $orderStatusSection = $('.xans-member-login .order-status-section');
    if ($orderStatusSection.length) {
        $orderStatusSection.addClass('is-collapsed');
        $orderStatusSection.find('.order-status-title').on('click', function () {
            $orderStatusSection.toggleClass('is-collapsed');
        });
    }
});