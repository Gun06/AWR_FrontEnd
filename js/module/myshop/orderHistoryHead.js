// 기간 설정하기
$('.xans-myshop-orderhistoryhead .eDataSet, [module="Myshop_OrderHistoryHead"] .eDataSet').click(function () {
    $('#dataSearch').toggle();
    $(this).siblings().removeClass('selected');
    if (typeof OrderHistory !== 'undefined') OrderHistory.set_period_mode('search');
});

// 겹치는 남색 이미지 조회 버튼 제거 → 날짜칸과 동일 스타일의 텍스트 버튼으로 교체
function replaceSearchImageButton(container) {
    if (!container) return;
    var imgBtn = container.querySelector('input[type="image"]');
    if (!imgBtn) return;
    var form = container.closest('form');
    var newBtn = document.createElement('button');
    newBtn.type = 'submit';
    newBtn.className = 'btn-search-custom';
    newBtn.textContent = '조회';
    imgBtn.parentNode.replaceChild(newBtn, imgBtn);
}

// myshop/index.html 및 기타 페이지: 상태 드롭다운·기간설정 필드가 없으면 order list에서 로드
(function runOrderHistoryHeadFix() {
    function removeDisplayNone(el) {
        if (!el) return;
        el.classList.remove('displaynone');
        el.querySelectorAll('.displaynone').forEach(removeDisplayNone);
    }
    function fetchAndInject(orderHeadEl) {
        var orderAcc = orderHeadEl.closest('#acc-order');
        var isIndexPage = !!orderAcc;
        var hasModeCs = (window.location.search || '').indexOf('mode=cs') !== -1;
        var listUrl = '/myshop/order/list.html' + (hasModeCs ? '?mode=cs' : '');
        fetch(listUrl)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                var doc = (new DOMParser()).parseFromString(html, 'text/html');
                var srcHead = doc.querySelector('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
                if (!srcHead) return;
                if (isIndexPage && !hasModeCs) {
                    var stateSelect = orderHeadEl.querySelector('.stateSelect');
                    var srcSelect = srcHead.querySelector('.stateSelect select');
                    if (stateSelect && srcSelect && !stateSelect.querySelector('select')) {
                        stateSelect.appendChild(srcSelect.cloneNode(true));
                    }
                }
                var dataSearch = orderHeadEl.querySelector('#dataSearch');
                var srcDataSearch = srcHead.querySelector('#dataSearch');
                if (dataSearch && srcDataSearch && !dataSearch.querySelector('input')) {
                    dataSearch.innerHTML = srcDataSearch.innerHTML;
                    var form = orderHeadEl.closest('form');
                    if (form && isIndexPage) {
                        form.action = location.pathname + location.search;
                    }
                    replaceSearchImageButton(dataSearch);
                }
            })
            .catch(function () {});
    }
    function apply() {
        var orderHeads = document.querySelectorAll('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
        orderHeads.forEach(function (orderHead) {
            var orderAcc = orderHead.closest('#acc-order');
            var stateSelect = orderHead.querySelector('.stateSelect');
            var dataSearch = orderHead.querySelector('#dataSearch');
            var hasModeCs = (window.location.search || '').indexOf('mode=cs') !== -1;
            if (orderAcc) {
                if (hasModeCs) {
                    if (stateSelect) stateSelect.classList.add('displaynone');
                } else {
                    if (stateSelect) {
                        stateSelect.classList.remove('displaynone');
                        removeDisplayNone(stateSelect);
                    }
                }
            }
            var needSelect = orderAcc && !hasModeCs && stateSelect && !stateSelect.querySelector('select');
            var needDataSearch = dataSearch && !dataSearch.querySelector('input');
            if (needSelect || needDataSearch) fetchAndInject(orderHead);
            if (dataSearch && dataSearch.querySelector('input[type="image"]')) replaceSearchImageButton(dataSearch);
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    } else {
        apply();
    }
})();
