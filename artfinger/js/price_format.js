/**
 * 상품 가격 표시 형식 변경
 * 서버에서 렌더링된 ₩ 기호를 KRW로 변경하고 할인 금액 표기 제거
 */
(function () {
    'use strict';

    var processedNodes = new WeakSet();
    var isProcessing = false;

    /**
     * SHOP_PRICE_FORMAT 함수 오버라이드
     */
    function overridePriceFormat() {
        // SHOP_PRICE_FORMAT이 이미 존재하는 경우
        if (typeof SHOP_PRICE_FORMAT !== 'undefined' && SHOP_PRICE_FORMAT.toShopPrice) {
            var originalToShopPrice = SHOP_PRICE_FORMAT.toShopPrice;
            if (originalToShopPrice.toString().indexOf('KRW') === -1) {
                SHOP_PRICE_FORMAT.toShopPrice = function (amount) {
                    var result = originalToShopPrice.call(this, amount);
                    if (typeof result === 'string') {
                        result = result.replace(/₩\s*/g, 'KRW ');
                        result = result.replace(/KRW([\d,])/g, 'KRW $1');
                    }
                    return result;
                };
            }
        }

        // CAFE24.SHOP_PRICE_FORMAT도 처리
        if (typeof CAFE24 !== 'undefined' && CAFE24.SHOP_PRICE_FORMAT && CAFE24.SHOP_PRICE_FORMAT.toShopPrice) {
            var originalCafe24ToShopPrice = CAFE24.SHOP_PRICE_FORMAT.toShopPrice;
            if (originalCafe24ToShopPrice.toString().indexOf('KRW') === -1) {
                CAFE24.SHOP_PRICE_FORMAT.toShopPrice = function (amount) {
                    var result = originalCafe24ToShopPrice.call(this, amount);
                    if (typeof result === 'string') {
                        result = result.replace(/₩\s*/g, 'KRW ');
                        result = result.replace(/KRW([\d,])/g, 'KRW $1');
                    }
                    return result;
                };
            }
        }
    }

    /**
     * 모든 텍스트 노드에서 ₩를 KRW로 변경하고 할인 표기 제거
     */
    function updateAllPriceText() {
        if (isProcessing || !document.body) return;
        isProcessing = true;

        try {
            var walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        if (processedNodes.has(node)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        var parent = node.parentElement;
                        while (parent) {
                            if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'NOSCRIPT') {
                                return NodeFilter.FILTER_REJECT;
                            }
                            parent = parent.parentElement;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                },
                false
            );

            var textNode;
            var updated = false;

            while (textNode = walker.nextNode()) {
                var text = textNode.textContent;
                if (!text || text.indexOf('₩') === -1) {
                    continue;
                }

                var originalText = text;

                // 할인 표기 제거: (₩X,XXX 할인) 패턴
                text = text.replace(/\s*\(₩\s*[\d,]+\s*할인\)/g, '');
                text = text.replace(/\s*\(KRW\s*[\d,]+\s*할인\)/g, '');

                // ₩ 기호를 KRW로 변경
                text = text.replace(/₩\s*/g, 'KRW ');

                // KRW 뒤에 공백이 없으면 추가
                text = text.replace(/KRW([\d,])/g, 'KRW $1');

                // 연속된 공백 정리
                text = text.replace(/\s+/g, ' ').trim();

                if (originalText !== text) {
                    textNode.textContent = text;
                    processedNodes.add(textNode);
                    updated = true;
                }
            }

            // 할인 표기만 포함한 요소 제거
            var allElements = document.querySelectorAll('*');
            allElements.forEach(function (element) {
                if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE' || element.tagName === 'NOSCRIPT') {
                    return;
                }
                var text = (element.textContent || '').trim();
                if (text.match(/^\([₩KRW\s]*[\d,]+\s*할인\)\s*$/) && element.children.length === 0) {
                    element.remove();
                    updated = true;
                }
            });

            return updated;
        } finally {
            isProcessing = false;
        }
    }

    /**
     * 가격 표시 업데이트 실행
     */
    function updatePriceDisplay() {
        overridePriceFormat();
        updateAllPriceText();
        removeStrikethroughFromRegularPrice();
    }

    /**
     * 초기화
     */
    function init() {
        // 여러 시점에서 실행
        setTimeout(updatePriceDisplay, 0);
        setTimeout(updatePriceDisplay, 100);
        setTimeout(updatePriceDisplay, 300);
        setTimeout(updatePriceDisplay, 500);
        setTimeout(updatePriceDisplay, 1000);
    }

    // DOM이 로드된 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // window.load 시 실행
    window.addEventListener('load', function () {
        setTimeout(updatePriceDisplay, 100);
        setTimeout(updatePriceDisplay, 500);
    });

    // jQuery ready 시 실행
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function () {
            setTimeout(updatePriceDisplay, 100);
            setTimeout(updatePriceDisplay, 500);
        });
    }

    // SHOP_PRICE_FORMAT이 나중에 로드되는 경우 대응
    var checkInterval = setInterval(function () {
        overridePriceFormat();
        updateAllPriceText();
    }, 500);

    setTimeout(function () {
        clearInterval(checkInterval);
    }, 15000);

    /**
     * 할인이 아닌 정가에서 취소선 제거
     * price_sale (span#span_product_price_sale 또는 rel="할인판매가")이 있을 때만 취소선 유지
     */
    function removeStrikethroughFromRegularPrice() {
        if (!document.body) return;

        // 전체 문서에서 할인 가격이 있는지 확인 (더 정확하게)
        var hasSalePrice = false;

        /**
         * 할인 가격 요소가 실제로 표시되고 있는지 확인하는 함수
         */
        function isElementVisible(element) {
            if (!element) return false;
            var style = window.getComputedStyle(element);
            return style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                style.opacity !== '0' &&
                element.offsetWidth > 0 &&
                element.offsetHeight > 0;
        }

        /**
         * 텍스트가 실제 가격인지 확인하는 함수
         */
        function isValidPriceText(text) {
            if (!text || text.trim() === '') return false;
            var trimmed = text.trim();
            // KRW나 숫자가 포함되어 있고, 실제 가격 형식인지 확인
            return (trimmed.indexOf('KRW') !== -1 || /\d/.test(trimmed)) &&
                trimmed.length > 0 &&
                trimmed !== '0' &&
                trimmed !== 'KRW 0' &&
                trimmed !== '0원';
        }

        // 1. span#span_product_price_sale이 있는지 확인 (표시되고 있는지, 유효한 가격인지)
        var salePriceSpan = document.getElementById('span_product_price_sale');
        if (salePriceSpan && isElementVisible(salePriceSpan)) {
            var saleText = salePriceSpan.textContent ? salePriceSpan.textContent.trim() : '';
            if (isValidPriceText(saleText)) {
                hasSalePrice = true;
            }
        }

        // 2. rel="할인판매가"가 있는 tr 요소가 있는지 확인 (표시되고 있는지, 유효한 가격인지)
        var salePriceRows = document.querySelectorAll('tr[rel="할인판매가"]');
        if (salePriceRows.length > 0) {
            salePriceRows.forEach(function (row) {
                if (isElementVisible(row)) {
                    var rowText = row.textContent ? row.textContent.trim() : '';
                    if (isValidPriceText(rowText)) {
                        // tr 내부에 실제 가격 텍스트가 있는지 확인
                        var priceElements = row.querySelectorAll('span, strong, td');
                        var hasValidPrice = false;
                        priceElements.forEach(function (el) {
                            var elText = el.textContent ? el.textContent.trim() : '';
                            if (isValidPriceText(elText)) {
                                hasValidPrice = true;
                            }
                        });
                        if (hasValidPrice || isValidPriceText(rowText)) {
                            hasSalePrice = true;
                        }
                    }
                }
            });
        }

        // 3. .prdSalePrice 클래스가 있는지 확인 (표시되고 있는지, 유효한 가격인지)
        var salePriceElements = document.querySelectorAll('.prdSalePrice');
        if (salePriceElements.length > 0) {
            salePriceElements.forEach(function (el) {
                if (isElementVisible(el)) {
                    var elText = el.textContent ? el.textContent.trim() : '';
                    if (isValidPriceText(elText)) {
                        hasSalePrice = true;
                    }
                }
            });
        }

        // 4. 정가와 할인가를 비교하여 실제로 할인이 있는지 확인
        var regularPriceSpan = document.getElementById('span_product_price_text');
        if (regularPriceSpan && salePriceSpan) {
            var regularText = regularPriceSpan.textContent ? regularPriceSpan.textContent.trim() : '';
            var saleText = salePriceSpan.textContent ? salePriceSpan.textContent.trim() : '';

            // 숫자 추출하여 비교
            var regularPrice = parseFloat(regularText.replace(/[^\d]/g, ''));
            var salePrice = parseFloat(saleText.replace(/[^\d]/g, ''));

            if (!isNaN(regularPrice) && !isNaN(salePrice) && regularPrice > 0 && salePrice > 0) {
                // 할인가가 정가보다 작으면 할인
                if (salePrice < regularPrice) {
                    hasSalePrice = true;
                } else {
                    // 할인가가 정가와 같거나 크면 할인 아님
                    hasSalePrice = false;
                }
            }
        }

        // 할인 가격이 있으면 취소선 유지 (확인 및 강제 적용)
        if (hasSalePrice) {
            // span#span_product_price_text에 취소선이 있으면 유지, 없으면 추가
            var priceTextSpan = document.getElementById('span_product_price_text');
            if (priceTextSpan) {
                // 취소선이 없으면 추가
                if (!priceTextSpan.style.textDecoration || priceTextSpan.style.textDecoration.indexOf('line-through') === -1) {
                    priceTextSpan.style.textDecoration = 'line-through';
                }
                // 회색 색상 유지
                if (priceTextSpan.style.color !== 'rgb(188, 188, 188)' && priceTextSpan.style.color !== '#bcbcbc') {
                    priceTextSpan.style.color = '#bcbcbc';
                }
            }

            // tr[rel="판매가"] 내부의 가격에 취소선 유지
            var priceRows = document.querySelectorAll('tr[rel="판매가"]');
            priceRows.forEach(function (row) {
                var priceTextInRow = row.querySelector('#span_product_price_text, [id*="product_price_text"]');
                if (priceTextInRow) {
                    if (!priceTextInRow.style.textDecoration || priceTextInRow.style.textDecoration.indexOf('line-through') === -1) {
                        priceTextInRow.style.textDecoration = 'line-through';
                    }
                    if (priceTextInRow.style.color !== 'rgb(188, 188, 188)' && priceTextInRow.style.color !== '#bcbcbc') {
                        priceTextInRow.style.color = '#bcbcbc';
                    }
                }
            });
        }
        // 할인 가격이 없으면 모든 취소선 제거
        else {
            // span#span_product_price_text에서 취소선 제거
            var priceTextSpan = document.getElementById('span_product_price_text');
            if (priceTextSpan) {
                // 취소선 제거
                priceTextSpan.style.removeProperty('text-decoration');
                priceTextSpan.style.removeProperty('text-decoration-line');
                priceTextSpan.style.removeProperty('text-decoration-style');
                // 회색 색상 제거
                if (priceTextSpan.style.color === 'rgb(188, 188, 188)' || priceTextSpan.style.color === '#bcbcbc') {
                    priceTextSpan.style.color = '#000';
                }
            }

            // 모든 span_product_price_text ID를 가진 요소에서 취소선 제거
            var allPriceTextSpans = document.querySelectorAll('[id*="product_price_text"]');
            allPriceTextSpans.forEach(function (span) {
                var hasLineThrough = span.style.textDecoration && span.style.textDecoration.indexOf('line-through') !== -1;
                var hasLineThroughLine = span.style.textDecorationLine && span.style.textDecorationLine.indexOf('line-through') !== -1;
                var isGray = span.style.color === 'rgb(188, 188, 188)' || span.style.color === '#bcbcbc';

                if (hasLineThrough || hasLineThroughLine || isGray) {
                    // 인라인 스타일에서 취소선 관련 속성 제거
                    span.style.removeProperty('text-decoration');
                    span.style.removeProperty('text-decoration-line');
                    span.style.removeProperty('text-decoration-style');
                    if (isGray) {
                        span.style.color = '#000';
                    }
                }
            });

            // tr[rel="판매가"] 내부의 취소선 제거 (단, 같은 테이블에 할인판매가가 없을 때만)
            var priceRows = document.querySelectorAll('tr[rel="판매가"]');
            priceRows.forEach(function (row) {
                // 같은 테이블 내에 할인판매가가 있는지 확인
                var table = row.closest('table');
                var hasSaleInTable = false;
                if (table) {
                    var saleRowsInTable = table.querySelectorAll('tr[rel="할인판매가"]');
                    if (saleRowsInTable.length > 0) {
                        hasSaleInTable = true;
                    }
                }

                // 할인 가격이 없을 때만 취소선 제거
                if (!hasSaleInTable && !hasSalePrice) {
                    var children = row.querySelectorAll('*');
                    children.forEach(function (child) {
                        var hasLineThrough = child.style.textDecoration && child.style.textDecoration.indexOf('line-through') !== -1;
                        var hasLineThroughLine = child.style.textDecorationLine && child.style.textDecorationLine.indexOf('line-through') !== -1;
                        var isGray = child.style.color === 'rgb(188, 188, 188)' || child.style.color === '#bcbcbc';

                        if (hasLineThrough || hasLineThroughLine || isGray) {
                            child.style.removeProperty('text-decoration');
                            child.style.removeProperty('text-decoration-line');
                            child.style.removeProperty('text-decoration-style');
                            if (isGray) {
                                child.style.color = '#000';
                            }
                        }
                    });
                }
            });

            // .prdPrice 내부의 취소선 제거
            var prdPriceElements = document.querySelectorAll('.prdPrice');
            prdPriceElements.forEach(function (prdPriceEl) {
                var allChildren = prdPriceEl.querySelectorAll('*');
                allChildren.forEach(function (child) {
                    var hasDelClass = child.classList && (
                        child.classList.contains('product_price_del') ||
                        child.classList.contains('price_del') ||
                        child.classList.contains('price_throu') ||
                        child.classList.contains('strike')
                    );

                    if (!hasDelClass) {
                        var hasLineThrough = child.style.textDecoration && child.style.textDecoration.indexOf('line-through') !== -1;
                        var hasLineThroughLine = child.style.textDecorationLine && child.style.textDecorationLine.indexOf('line-through') !== -1;
                        var isGray = child.style.color === 'rgb(188, 188, 188)' || child.style.color === '#bcbcbc';

                        if (hasLineThrough || hasLineThroughLine || isGray) {
                            child.style.removeProperty('text-decoration');
                            child.style.removeProperty('text-decoration-line');
                            child.style.removeProperty('text-decoration-style');
                            if (isGray) {
                                child.style.color = '#000';
                            }
                        }
                    }
                });

                if (prdPriceEl.style.textDecoration && prdPriceEl.style.textDecoration.indexOf('line-through') !== -1) {
                    prdPriceEl.style.removeProperty('text-decoration');
                    prdPriceEl.style.removeProperty('text-decoration-line');
                }
            });
        }
    }

    /**
     * 취소선이 그어진 가격의 strong 태그를 span으로 변경 (취소선 스타일 유지)
     */
    function convertStrongToSpan() {
        // span_product_price_text ID를 가진 strong 태그 찾기
        var strongElements = document.querySelectorAll('strong#span_product_price_text, strong[id*="product_price_text"][style*="line-through"]');
        strongElements.forEach(function (strongEl) {
            if (strongEl.parentNode && strongEl.tagName === 'STRONG') {
                // span 태그 생성
                var spanEl = document.createElement('span');
                spanEl.id = strongEl.id || '';
                spanEl.textContent = strongEl.textContent;
                // 취소선 스타일 유지
                spanEl.style.textDecoration = 'line-through';
                // 기존 스타일 복사
                if (strongEl.style.color) {
                    spanEl.style.color = strongEl.style.color;
                }
                // strong 태그를 span으로 교체
                strongEl.parentNode.replaceChild(spanEl, strongEl);
            }
        });

        // 판매가 영역의 취소선이 그어진 strong 태그도 span으로 변경
        var priceStrongs = document.querySelectorAll('tr[rel="판매가"] strong[style*="line-through"], tr[rel="판매가"] strong[style*="text-decoration"]');
        priceStrongs.forEach(function (strongEl) {
            if (strongEl.parentNode && strongEl.tagName === 'STRONG' && strongEl.textContent.indexOf('KRW') !== -1) {
                var spanEl = document.createElement('span');
                spanEl.textContent = strongEl.textContent;
                spanEl.style.textDecoration = 'line-through';
                if (strongEl.style.color) {
                    spanEl.style.color = strongEl.style.color;
                }
                strongEl.parentNode.replaceChild(spanEl, strongEl);
            }
        });
    }

    // 동적 콘텐츠 대응
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function (mutations) {
            var shouldUpdate = false;
            var shouldCheckStrikethrough = false;

            mutations.forEach(function (mutation) {
                // 노드 추가
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.indexOf('₩') !== -1) {
                            shouldUpdate = true;
                        } else if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.textContent && node.textContent.indexOf('₩') !== -1) {
                                shouldUpdate = true;
                            }
                            // 가격 관련 클래스 확인
                            if (node.classList && (
                                node.classList.contains('prdPrice') ||
                                node.classList.contains('prdSalePrice') ||
                                node.classList.contains('product_price') ||
                                node.classList.contains('prd_price_sale')
                            )) {
                                shouldUpdate = true;
                                shouldCheckStrikethrough = true;
                            }
                            // 가격 관련 ID 확인
                            if (node.id && (
                                node.id === 'span_product_price_text' ||
                                node.id === 'span_product_price_sale' ||
                                node.id.indexOf('product_price_text') !== -1
                            )) {
                                shouldUpdate = true;
                                shouldCheckStrikethrough = true;
                            }
                            // strong 태그가 추가된 경우
                            if (node.tagName === 'STRONG' && (node.id === 'span_product_price_text' || node.id.indexOf('product_price_text') !== -1)) {
                                shouldUpdate = true;
                                setTimeout(convertStrongToSpan, 10);
                            }
                        }
                    });
                }

                // 속성 변경 (스타일 변경 감지)
                if (mutation.type === 'attributes') {
                    var target = mutation.target;
                    if (target.id && target.id.indexOf('product_price') !== -1) {
                        shouldCheckStrikethrough = true;
                    }
                    if (target.classList && (
                        target.classList.contains('prdPrice') ||
                        target.classList.contains('prdSalePrice')
                    )) {
                        shouldCheckStrikethrough = true;
                    }
                    if (mutation.attributeName === 'style') {
                        shouldCheckStrikethrough = true;
                    }
                }

                // 텍스트 변경
                if (mutation.type === 'characterData' && mutation.target.textContent && mutation.target.textContent.indexOf('₩') !== -1) {
                    shouldUpdate = true;
                }
            });

            if (shouldUpdate) {
                setTimeout(function () {
                    updatePriceDisplay();
                    convertStrongToSpan();
                }, 10);
            }

            if (shouldCheckStrikethrough) {
                setTimeout(function () {
                    removeStrikethroughFromRegularPrice();
                }, 10);
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'id']
            });
        }
    }

    // 초기 실행 시 strong 태그를 span으로 변경 (취소선 유지)
    setTimeout(convertStrongToSpan, 0);
    setTimeout(convertStrongToSpan, 50);
    setTimeout(convertStrongToSpan, 100);
    setTimeout(convertStrongToSpan, 200);
    setTimeout(convertStrongToSpan, 500);
    setTimeout(convertStrongToSpan, 1000);

    // 초기 실행 시 할인이 아닌 정가에서 취소선 제거 (더 자주 실행)
    setTimeout(removeStrikethroughFromRegularPrice, 0);
    setTimeout(removeStrikethroughFromRegularPrice, 50);
    setTimeout(removeStrikethroughFromRegularPrice, 100);
    setTimeout(removeStrikethroughFromRegularPrice, 200);
    setTimeout(removeStrikethroughFromRegularPrice, 500);
    setTimeout(removeStrikethroughFromRegularPrice, 1000);
    setTimeout(removeStrikethroughFromRegularPrice, 1500);
    setTimeout(removeStrikethroughFromRegularPrice, 2000);
    setTimeout(removeStrikethroughFromRegularPrice, 3000);

    // 지속적으로 체크 (인라인 스타일이 나중에 적용될 수 있음)
    var checkInterval = setInterval(function () {
        removeStrikethroughFromRegularPrice();
    }, 500);

    setTimeout(function () {
        clearInterval(checkInterval);
    }, 10000);
})();
