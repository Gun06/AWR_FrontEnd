/**
 * 장바구니 개수와 상단 Bag 개수 동기화
 * - 장바구니 담기 레이어(iframe) 로드 시 postMessage로 개수 수신
 * - 동일 문서 내 장바구니 레이어 표시 시 MutationObserver로 개수 추출
 */
(function () {
    function updateBasketCountInHeader(count) {
        if (typeof count !== 'number' || count < 0) return;
        var countStr = String(count);

        /* 헤더 Bag: .bas_count (memberstate) */
        document.querySelectorAll('.bas_count').forEach(function (el) {
            el.textContent = countStr;
        });

        /* Layout_orderBasketcount 모듈: span이 있으면 span만, 없으면 a 텍스트 전체 교체 */
        document.querySelectorAll('[module="Layout_orderBasketcount"]').forEach(function (mod) {
            var span = mod.querySelector('span, .count');
            var a = mod.querySelector('a');
            if (span) {
                span.textContent = countStr;
            } else if (a) {
                var text = a.textContent || '';
                if (/\(\d+\)/.test(text)) {
                    a.textContent = text.replace(/\(\d+\)/, '(' + countStr + ')');
                }
            }
        });
    }

    window.updateBasketCountInHeader = updateBasketCountInHeader;

    /* iframe에서 postMessage 수신 */
    window.addEventListener('message', function (e) {
        if (e.data && e.data.type === 'basketCountUpdate' && typeof e.data.count === 'number') {
            updateBasketCountInHeader(e.data.count);
        }
    });

    /* 동일 문서 내 장바구니 레이어 표시 감지 (AJAX 로드 등) */
    function syncFromLayerInDocument() {
        var layer = document.querySelector('.ec-base-layer.typeModal.bsket_detail, .xans-order-layerbasket');
        if (!layer || !layer.offsetParent) return;
        var h1 = layer.querySelector('.orba_top h1') || layer.querySelector('h1');
        if (h1) {
            var m = (h1.textContent || h1.innerText || '').match(/장바구니\s*\((\d+)\)/);
            if (m) updateBasketCountInHeader(parseInt(m[1], 10));
        }
    }

    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function () {
            syncFromLayerInDocument();
        });
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', syncFromLayerInDocument);
        } else {
            syncFromLayerInDocument();
        }
    }
})();
