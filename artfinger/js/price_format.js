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
            mutations.forEach(function (mutation) {
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
                            }
                            // strong 태그가 추가된 경우
                            if (node.tagName === 'STRONG' && (node.id === 'span_product_price_text' || node.id.indexOf('product_price_text') !== -1)) {
                                shouldUpdate = true;
                                setTimeout(convertStrongToSpan, 50);
                            }
                        }
                    });
                }
                if (mutation.type === 'characterData' && mutation.target.textContent && mutation.target.textContent.indexOf('₩') !== -1) {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate) {
                setTimeout(function () {
                    updatePriceDisplay();
                    convertStrongToSpan();
                }, 50);
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }

    // 초기 실행 시 strong 태그를 span으로 변경 (취소선 유지)
    setTimeout(convertStrongToSpan, 200);
    setTimeout(convertStrongToSpan, 500);
    setTimeout(convertStrongToSpan, 1000);
})();
