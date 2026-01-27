$(function () {

    $(window).ready(function () {
        $(".progress_line").delay(600).fadeOut("slow");
        $(".progress_line2").delay(200).fadeOut("slow");
    });
    $(window).resize(function () {
        $(".progress_line").delay(600).fadeOut("slow");
        $(".progress_line2").delay(200).fadeOut("slow");
    });


    //header search    
    $("#header .search ").click(function () {
        $("#header #searchBarForm").slideToggle(300);
        $(this).toggleClass("open");
    });

    //header multilanguage togle 
    $("button.toggle2").click(function () {
        $(".tool_multi").slideToggle(300);
    });


    setTimeout(function () {
        var swiper = new Swiper('.swiper-container-main', {
            speed: 2000,
            spaceBetween: 0,
            effect: 'fade',
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination-main',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next-main',
                prevEl: '.swiper-button-prev-main',
            },
        });
    }, 200);


    var galleryTop = new Swiper('.gallery-top', {
        slidesPerView: 1,
        spaceBetween: 0,

        navigation: {
            nextEl: '.swiper-button-next-detail',
            prevEl: '.swiper-button-prev-detail',
        },
        pagination: {
            el: ".swiper-pagination-detail",
            type: "fraction",
        }
    });

    var galleryTop2 = new Swiper('.gallery-top2', {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination-detail2",
            type: "fraction",
        },
        navigation: {
            nextEl: '.swiper-button-next-detail2',
            prevEl: '.swiper-button-prev-detail2',
        },
    });

    var swiper = new Swiper('.swiper-container2', {
        slidesPerView: 3,
        spaceBetween: 0,
        // init: false,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1000,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
            300: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            1100: {
                slidesPerView: 2,
                spaceBetween: 0,
            },

        }
    });

    var swiper = new Swiper('.swiper-container4', {
        slidesPerView: 5,
        spaceBetween: 10,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next4',
            prevEl: '.swiper-button-prev4',
        },
        pagination: {
            el: '.swiper-pagination4',
            type: "progressbar",
        },
        /*autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },*/
        speed: 1400,

        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            900: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1100: {
                slidesPerView: 4,
                spaceBetween: 10,
            },

        }
    });


    var swiper = new Swiper('.swiper-container-recommend', {
        slidesPerView: 4,
        spaceBetween: 25,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next-recommend',
            prevEl: '.swiper-button-prev-recommend',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 1400,

        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        breakpoints: {
            300: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            1100: {
                slidesPerView: 3,
                spaceBetween: 2,
            },

        }
    });


    $('.accordion_more > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap');

        $(this).closest('.accordion_more').find('.tab_wrap').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_more').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $('.accordion_purchase > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap_purchase');

        $(this).closest('.accordion_purchase').find('.tab_wrap_purchase').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_purchase').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $('.accordion_more_footer > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap');

        $(this).closest('.accordion_more_footer').find('.tab_wrap').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_more_footer').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });


    $('.accordion_agree > li > a').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap_agree');

        $(this).closest('.accordion_agree').find('.tab_wrap_agree').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_agree').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });


    $('.accordion_notice a.subject').click(function (j) {
        var dropDown = $(this).closest('li').find('.tab_wrap');

        $(this).closest('.accordion_notice').find('.tab_wrap').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion_notice').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });



    $(".prd_price_sale > span").each(function () {
        $(this).closest("li.prd_price_sale").prev(".product_price ").addClass("price_throu")
    });


    $('.sold_icore').each(function () {
        if ($(this).find('img').size() === 1) {
            $(this).html('<div class="sold_me">SOLD OUT</div>');
        };
    });

    $('.xans-product-listnormal').bind("DOMNodeInserted", function () {
        $('.sold_icore').each(function () {
            if ($(this).find('img').size() === 1) {
                $(this).html('<span class="sold_me">SOLD OUT</span>');
            };
        });
    });

    $(".scroll_detailview").click(function (event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top - 0 }, 400);
    });

    //prd option select title
    $('.prdDescription .xans-product-option select[option_style="select"]').each(function () {
        $(this).children('option:first-child').text($(this).attr('option_title'));
        $(this).closest('td').attr("colspan", 2);
        var ofaddopt = $(this).closest('td').prev('th').addClass('rofer');
        $(ofaddopt).remove();
    });

    // 드롭다운을 버튼 형태로 변환
    function convertSelectToButtons() {
        // jQuery가 로드되었는지 확인
        if (typeof $ === 'undefined' || typeof $.fn === 'undefined') {
            console.log('jQuery가 로드되지 않았습니다.');
            return;
        }

        // 더 넓은 범위의 선택자로 시도
        var $selects = $('.prdDescription .xans-product-option select[option_style="select"]');

        // option_style 속성이 없는 경우도 포함
        if ($selects.length === 0) {
            $selects = $('.prdDescription .xans-product-option select');
        }

        // prdBoard.option 내부의 select도 찾기
        if ($selects.length === 0) {
            $selects = $('.prdBoard.option select, .prdDescription select');
        }

        console.log('찾은 select 요소 개수:', $selects.length);

        $selects.each(function () {
            var selectElement = this; // 원본 DOM 요소
            var $select = $(selectElement); // jQuery 객체로 변환

            // jQuery 객체인지 확인
            if (!$select || typeof $select.length === 'undefined') {
                console.log('jQuery 객체 변환 실패');
                return;
            }

            var optionTitle = $select.attr('option_title') || $select.closest('tr').find('th').text() || '옵션';

            // 이미 변환된 경우 스킵
            if ($select.closest('td').find('.option-button-group').length > 0) {
                return;
            }

            // option이 없는 경우 스킵
            if ($select.find('option').length <= 1) {
                return;
            }

            // select 숨기기 (화면에서 보이지 않지만 기능은 유지)
            $select.css({
                'position': 'absolute',
                'opacity': '0',
                'pointer-events': 'none',
                'width': '1px',
                'height': '1px',
                'overflow': 'hidden',
                'clip': 'rect(0,0,0,0)'
            });

            // 버튼 그룹 생성 (jQuery 객체로 명확히 생성)
            var $buttonGroup = $('<div class="option-button-group"></div>');
            var $label = $('<label class="option-label">' + optionTitle + '</label>');
            var $buttonContainer = $('<div class="option-buttons"></div>');

            // 옵션 버튼 생성
            $select.find('option').each(function (index) {
                var option = this; // 원본 DOM 요소
                var $option = $(option); // jQuery 객체로 변환
                var optionValue = $option.val() || option.value;
                var optionText = ($option.text() || option.textContent || '').trim();
                var isFirstOption = index === 0;
                // prop 대신 attr과 직접 속성 접근 사용
                var isDisabled = option.disabled || $option.attr('disabled') === 'disabled' || $option.attr('disabled') === 'true';
                var optionClass = $option.attr('class') || option.className || '';
                var isSoldOut = $option.hasClass('soldout') ||
                    optionClass.indexOf('soldout') !== -1 ||
                    optionText.indexOf('품절') !== -1 ||
                    optionText.indexOf('SOLD') !== -1;

                // 첫 번째 옵션(타이틀/선택 안함)은 건너뛰기
                if (isFirstOption || optionValue === '' || optionText === optionTitle || optionText === '') {
                    return;
                }

                var $button = $('<button type="button" class="option-btn" data-value="' +
                    $('<div>').text(optionValue).html() + '">' +
                    $('<div>').text(optionText).html() + '</button>');

                if (isSoldOut || isDisabled) {
                    $button.addClass('soldout');
                }

                $buttonContainer.append($button);
            });

            $buttonGroup.append($label);
            $buttonGroup.append($buttonContainer);

            // select 다음에 버튼 그룹 삽입
            // select의 부모 요소(td)에 직접 추가
            var $parent = $select.parent();
            if ($parent.length) {
                $parent.append($buttonGroup);
            } else {
                $select.after($buttonGroup);
            }

            // 버튼이 DOM에 추가된 후 이벤트 바인딩
            // DOM에 추가된 요소를 다시 선택하여 jQuery 객체 확보
            setTimeout(function () {
                var $buttonGroupFinal = $select.parent().find('.option-button-group').last();
                if ($buttonGroupFinal.length === 0) {
                    $buttonGroupFinal = $select.siblings('.option-button-group').last();
                }
                if ($buttonGroupFinal.length === 0) {
                    $buttonGroupFinal = $buttonGroup;
                }

                // jQuery 객체인지 확인
                if (typeof $buttonGroupFinal.on !== 'function') {
                    $buttonGroupFinal = $($buttonGroupFinal);
                }

                // 버튼 클릭 이벤트 (이벤트 위임 사용)
                if (typeof $buttonGroupFinal.on === 'function') {
                    $buttonGroupFinal.on('click', '.option-btn:not(.soldout)', function (e) {
                        e.preventDefault();
                        var $clickedBtn = $(this);
                        var selectedValue = $clickedBtn.attr('data-value');

                        // 같은 그룹 내 다른 버튼들의 active 클래스 제거
                        $buttonGroupFinal.find('.option-btn').removeClass('active');

                        // 클릭한 버튼에 active 클래스 추가
                        $clickedBtn.addClass('active');

                        // select 값 변경
                        $select.val(selectedValue);

                        // select의 change 이벤트 트리거 (기존 시스템과 호환)
                        $select.trigger('change');

                        // 커스텀 이벤트도 트리거 (필요한 경우)
                        if (typeof $select.attr('option_select_element') !== 'undefined') {
                            $select.trigger('optionchange');
                        }
                    });

                    // 초기 선택된 값이 있으면 해당 버튼 활성화
                    var selectedValue = $select.val();
                    if (selectedValue && selectedValue !== '') {
                        var $selectedBtn = $buttonGroupFinal.find('.option-btn[data-value="' +
                            $('<div>').text(selectedValue).html() + '"]');
                        if ($selectedBtn.length > 0 && !$selectedBtn.hasClass('soldout')) {
                            $selectedBtn.addClass('active');
                        }
                    }

                    // select 값이 외부에서 변경될 때 버튼 상태 동기화
                    // jQuery 메서드 확인 후 사용
                    if ($select && typeof $select.off === 'function' && typeof $select.on === 'function') {
                        try {
                            $select.off('change.optionButtonSync').on('change.optionButtonSync', function () {
                                var currentValue = $(this).val();
                                $buttonGroupFinal.find('.option-btn').removeClass('active');
                                if (currentValue && currentValue !== '') {
                                    var $targetBtn = $buttonGroupFinal.find('.option-btn[data-value="' +
                                        $('<div>').text(currentValue).html() + '"]');
                                    if ($targetBtn.length > 0 && !$targetBtn.hasClass('soldout')) {
                                        $targetBtn.addClass('active');
                                    }
                                }
                            });
                        } catch (e) {
                            console.log('jQuery 이벤트 바인딩 실패, 네이티브 이벤트 사용:', e);
                            // 네이티브 이벤트로 대체
                            var selectElementNative = $select[0] || selectElement;
                            var buttonGroupElementNative = $buttonGroupFinal[0] || buttonGroupElement;
                            if (selectElementNative && selectElementNative.addEventListener && buttonGroupElementNative) {
                                var syncHandler = function () {
                                    var currentValue = selectElementNative.value;
                                    var buttons = buttonGroupElementNative.querySelectorAll('.option-btn');
                                    for (var i = 0; i < buttons.length; i++) {
                                        buttons[i].classList.remove('active');
                                        if (buttons[i].getAttribute('data-value') === currentValue && !buttons[i].classList.contains('soldout')) {
                                            buttons[i].classList.add('active');
                                        }
                                    }
                                };
                                selectElementNative.addEventListener('change', syncHandler);
                            }
                        }
                    } else {
                        // jQuery가 아닌 경우 네이티브 이벤트 리스너 사용
                        var selectElementNative = $select[0] || selectElement;
                        var buttonGroupElementNative = $buttonGroupFinal[0] || buttonGroupElement;
                        if (selectElementNative && selectElementNative.addEventListener && buttonGroupElementNative) {
                            var syncHandler = function () {
                                var currentValue = selectElementNative.value;
                                var buttons = buttonGroupElementNative.querySelectorAll('.option-btn');
                                for (var i = 0; i < buttons.length; i++) {
                                    buttons[i].classList.remove('active');
                                    if (buttons[i].getAttribute('data-value') === currentValue && !buttons[i].classList.contains('soldout')) {
                                        buttons[i].classList.add('active');
                                    }
                                }
                            };
                            selectElementNative.addEventListener('change', syncHandler);
                        }
                    }
                } else {
                    // jQuery가 아닌 경우 직접 이벤트 리스너 사용
                    var buttonGroupElementNative = $buttonGroupFinal[0] || $buttonGroupFinal;
                    var selectElementNative = $select[0] || selectElement;
                    if (buttonGroupElementNative && buttonGroupElementNative.addEventListener && selectElementNative) {
                        buttonGroupElementNative.addEventListener('click', function (e) {
                            var target = e.target;
                            if (target && target.classList && target.classList.contains('option-btn') && !target.classList.contains('soldout')) {
                                e.preventDefault();
                                var selectedValue = target.getAttribute('data-value');

                                // 같은 그룹 내 다른 버튼들의 active 클래스 제거
                                var buttons = buttonGroupElementNative.querySelectorAll('.option-btn');
                                for (var i = 0; i < buttons.length; i++) {
                                    buttons[i].classList.remove('active');
                                }

                                // 클릭한 버튼에 active 클래스 추가
                                target.classList.add('active');

                                // select 값 변경
                                if (selectElementNative) {
                                    selectElementNative.value = selectedValue;
                                    // change 이벤트 트리거
                                    var changeEvent = new Event('change', { bubbles: true });
                                    selectElementNative.dispatchEvent(changeEvent);
                                }
                            }
                        });
                    }
                }
            }, 10);
        });
    }

    // 페이지 로드 시 변환 실행
    convertSelectToButtons();

    // DOMContentLoaded 후에도 실행 (동적 콘텐츠 대응)
    $(document).ready(function () {
        setTimeout(convertSelectToButtons, 300);
        setTimeout(convertSelectToButtons, 800);
        setTimeout(convertSelectToButtons, 1500);
    });

    // window.load 후에도 실행
    $(window).on('load', function () {
        setTimeout(convertSelectToButtons, 500);
    });

    // 동적으로 추가되는 옵션을 위해 MutationObserver 사용
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function (mutations) {
            var shouldConvert = false;
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length > 0) {
                    $(mutation.addedNodes).each(function () {
                        if ($(this).is('select[option_style="select"]') ||
                            $(this).find('select[option_style="select"]').length > 0) {
                            var $selects = $(this).is('select') ? $(this) : $(this).find('select[option_style="select"]');
                            $selects.each(function () {
                                if ($(this).closest('td').find('.option-button-group').length === 0) {
                                    shouldConvert = true;
                                }
                            });
                        }
                    });
                }
            });
            if (shouldConvert) {
                setTimeout(convertSelectToButtons, 100);
            }
        });

        var targetNode = document.querySelector('.prdDescription');
        if (targetNode) {
            observer.observe(targetNode, {
                childList: true,
                subtree: true
            });
        } else {
            // prdDescription이 없으면 body 전체를 관찰
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // 주기적으로 체크 (동적 로딩 대응)
    setInterval(function () {
        var $existingSelects = $('.prdDescription .xans-product-option select, .prdBoard.option select');
        $existingSelects.each(function () {
            var $select = $(this);
            if ($select.closest('td').find('.option-button-group').length === 0 &&
                $select.find('option').length > 1) {
                convertSelectToButtons();
            }
        });
    }, 1000);



    var modalLayer = $("#modalLayer");
    var modalLink = $(".modalLink");
    var modalCont = $(".modalContent");
    var marginLeft = modalCont.outerWidth() / 2;
    var marginTop = modalCont.outerHeight() / 2;

    modalLink.click(function () {
        modalLayer.fadeIn(500);

        $(this).blur();
        $(".modalContent > a").focus();
        return false;
    });

    $(".modalContent > .close-btn").click(function () {
        modalLayer.fadeOut(500);
        modalLink.focus();
    });




});


