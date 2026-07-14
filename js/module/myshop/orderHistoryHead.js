// 기간 설정하기
$('.xans-myshop-orderhistoryhead .eDataSet, [module="Myshop_OrderHistoryHead"] .eDataSet').click(function () {
    var $wrap = $(this).closest('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
    var $dataSearch = $wrap.find('#dataSearch');
    if (!$dataSearch.length) $dataSearch = $('#dataSearch');
    $dataSearch.toggle();
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    if (typeof window.__enableOrderDateInputs === 'function') {
        window.__enableOrderDateInputs($dataSearch[0]);
    }
    if (typeof OrderHistory !== 'undefined') OrderHistory.set_period_mode('search');
});

// 겹치는 남색 이미지 조회 버튼 제거 → 날짜칸과 동일 스타일의 텍스트 버튼으로 교체
function replaceSearchImageButton(container) {
    if (!container) return;
    var imgBtn = container.querySelector('input[type="image"]');
    if (!imgBtn) return;
    var newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.className = 'btn-search-custom';
    newBtn.textContent = '조회';
    imgBtn.parentNode.replaceChild(newBtn, imgBtn);
}

// myshop/index.html: Order History는 list.html에서만 정상 렌더 → 목록/필터 동기화
(function runOrderHistoryHeadFix() {
    var ORDER_PATH_REWRITES = [
        { from: /^(?:\.\/)?detail\.html/, to: '/myshop/order/detail.html' },
        { from: /^(?:\.\/)?order_detail_cs\.html/, to: '/myshop/order/order_detail_cs.html' },
        { from: /^(?:\.\/)?cancel\.html/, to: '/myshop/order/cancel.html' },
        { from: /^(?:\.\/)?exchange\.html/, to: '/myshop/order/exchange.html' },
        { from: /^(?:\.\/)?return\.html/, to: '/myshop/order/return.html' }
    ];
    var filtersBound = false;

    function pad(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    function formatDate(d) {
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    function datesFromDays(daysAttr) {
        var end = new Date();
        var start = new Date();
        var days = parseInt(daysAttr, 10);
        if (isNaN(days) || days <= 0) {
            return { start: formatDate(start), end: formatDate(end) };
        }
        start.setDate(start.getDate() - days);
        return { start: formatDate(start), end: formatDate(end) };
    }

    function removeDisplayNone(el) {
        if (!el) return;
        el.classList.remove('displaynone');
        el.querySelectorAll('.displaynone').forEach(removeDisplayNone);
    }

    function rewriteOrderLinks(root) {
        if (!root) return;
        root.querySelectorAll('a[href]').forEach(function (a) {
            var href = a.getAttribute('href');
            if (!href || href.indexOf('#none') === 0 || href.indexOf('javascript:') === 0) return;
            for (var i = 0; i < ORDER_PATH_REWRITES.length; i++) {
                if (ORDER_PATH_REWRITES[i].from.test(href)) {
                    a.setAttribute('href', href.replace(ORDER_PATH_REWRITES[i].from, ORDER_PATH_REWRITES[i].to));
                    break;
                }
            }
        });
    }

    function isBrokenOrderList(listEl) {
        if (!listEl) return true;
        var emptyMsg = listEl.querySelector('.empty:not(.displaynone)');
        var orderList = listEl.querySelector('.orderList');
        if (emptyMsg && (!orderList || orderList.classList.contains('displaynone'))) return false;
        var orders = listEl.querySelectorAll('.orderList .order');
        if (!orders.length) return true;
        var first = orders[0];
        var name = (first.querySelector('.prdName') || {}).textContent || '';
        var qty = (first.querySelector('.ec-base-qty strong') || {}).textContent || '';
        var date = (first.querySelector('.date') || {}).textContent || '';
        return !(name.trim() || qty.trim() || date.trim());
    }

    function getOrderListTarget() {
        var orderAcc = document.getElementById('acc-order');
        if (!orderAcc) return null;
        return orderAcc.querySelector('#acc-order-list, .xans-myshop-orderhistorylistitem, [module="Myshop_OrderHistoryListitem"]');
    }

    function getStatusSelect() {
        var orderAcc = document.getElementById('acc-order');
        if (!orderAcc) return null;
        return orderAcc.querySelector('.stateSelect select, select[name="order_status"], #order_status');
    }

    function getDateInputs(root) {
        root = root || document.getElementById('acc-order') || document;
        return {
            start: root.querySelector('#history_start_date, input[name="history_start_date"]'),
            end: root.querySelector('#history_end_date, input[name="history_end_date"]')
        };
    }

    function enableDateInputs(container) {
        if (!container) return;
        var inputs = getDateInputs(container);
        [inputs.start, inputs.end].forEach(function (input) {
            if (!input) return;
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
            input.style.pointerEvents = 'auto';
            input.style.backgroundColor = '#fff';
        });

        if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.datepicker) {
            [inputs.start, inputs.end].forEach(function (input) {
                if (!input) return;
                var $el = jQuery(input);
                if ($el.hasClass('hasDatepicker')) {
                    try { $el.datepicker('destroy'); } catch (err) {}
                    $el.removeClass('hasDatepicker').removeData('datepicker');
                    $el.next('.ui-datepicker-trigger').remove();
                }
                $el.datepicker({
                    dateFormat: 'yy-mm-dd',
                    changeMonth: true,
                    changeYear: true,
                    showOn: 'both',
                    buttonImage: '//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/ico_cal.gif',
                    buttonImageOnly: true,
                    buttonText: '달력'
                });
                $el.removeAttr('readonly');
            });
        } else {
            // datepicker 없으면 네이티브 date 입력으로 수정 가능하게
            [inputs.start, inputs.end].forEach(function (input) {
                if (!input) return;
                try {
                    if (input.type !== 'date') input.type = 'date';
                } catch (err) {}
            });
        }
    }
    window.__enableOrderDateInputs = enableDateInputs;

    function buildListUrl(overrides) {
        var params = new URLSearchParams(window.location.search || '');
        overrides = overrides || {};
        Object.keys(overrides).forEach(function (key) {
            if (key.indexOf('__') === 0) return;
            var val = overrides[key];
            if (val === '' || val == null) params.delete(key);
            else params.set(key, val);
        });
        var qs = params.toString();
        return {
            listUrl: '/myshop/order/list.html' + (qs ? '?' + qs : ''),
            indexUrl: '/myshop/index.html' + (qs ? '?' + qs : '') + '#order',
            params: params
        };
    }

    function syncStatusSelect(params) {
        var select = getStatusSelect();
        if (!select) return;
        var status = params.get('order_status');
        if (status == null) return;
        select.value = status;
    }

    function syncPeriodButtons(overrides) {
        var orderAcc = document.getElementById('acc-order');
        if (!orderAcc) return;
        var buttons = orderAcc.querySelectorAll('.ec-base-button a[days]');
        if (!buttons.length) return;
        var activeDays = overrides && overrides.__days != null ? String(overrides.__days) : null;
        buttons.forEach(function (btn) {
            btn.classList.remove('selected');
            if (activeDays != null && String(btn.getAttribute('days')) === activeDays) {
                btn.classList.add('selected');
            }
        });
        if (activeDays == null) return;
        var searchBtn = orderAcc.querySelector('.ec-base-button a.eDataSet');
        if (searchBtn) searchBtn.classList.remove('selected');
    }

    function injectOrderList(doc, force) {
        var target = getOrderListTarget();
        var srcList = doc.querySelector('.xans-myshop-orderhistorylistitem, [module="Myshop_OrderHistoryListitem"]');
        if (!target || !srcList) return;
        if (!force && (!isBrokenOrderList(target) || isBrokenOrderList(srcList))) {
            rewriteOrderLinks(target);
            return;
        }
        target.innerHTML = srcList.innerHTML;
        rewriteOrderLinks(target);
    }

    function refreshOrderList(overrides, options) {
        options = options || {};
        var built = buildListUrl(overrides);
        return fetch(built.listUrl)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                var doc = (new DOMParser()).parseFromString(html, 'text/html');
                injectOrderList(doc, true);
                syncStatusSelect(built.params);
                if (options.syncPeriod) syncPeriodButtons(overrides);
                try {
                    history.replaceState(null, '', built.indexUrl);
                } catch (e) {}
                return doc;
            })
            .catch(function () {});
    }

    function runCustomPeriodSearch(orderAcc) {
        var dates = getDateInputs(orderAcc);
        var select = getStatusSelect();
        var overrides = {};
        if (dates.start && dates.start.value) overrides.history_start_date = dates.start.value;
        if (dates.end && dates.end.value) overrides.history_end_date = dates.end.value;
        if (select && select.value) overrides.order_status = select.value;
        if (!overrides.history_start_date && !overrides.history_end_date) return;
        refreshOrderList(overrides, { syncPeriod: true }).then(function () {
            orderAcc.querySelectorAll('.ec-base-button a[days]').forEach(function (b) {
                b.classList.remove('selected');
            });
            var searchBtn = orderAcc.querySelector('.ec-base-button a.eDataSet');
            if (searchBtn) searchBtn.classList.add('selected');
        });
    }

    function ensureDataSearchFields(orderHeadEl, srcHead) {
        var dataSearch = orderHeadEl.querySelector('#dataSearch');
        var srcDataSearch = srcHead && srcHead.querySelector('#dataSearch');
        if (!dataSearch) return null;
        var hasDateInput = !!(dataSearch.querySelector('#history_start_date, input[name="history_start_date"]'));
        if (!hasDateInput && srcDataSearch) {
            dataSearch.innerHTML = srcDataSearch.innerHTML;
        }
        var form = orderHeadEl.closest('form');
        if (form) form.action = location.pathname + location.search;
        replaceSearchImageButton(dataSearch);
        enableDateInputs(dataSearch);
        return dataSearch;
    }

    function bindAccOrderFilters() {
        var orderAcc = document.getElementById('acc-order');
        if (!orderAcc || filtersBound) return;
        filtersBound = true;

        // 상태 드롭다운
        orderAcc.addEventListener('change', function (e) {
            var select = e.target && e.target.closest
                ? e.target.closest('.stateSelect select, select[name="order_status"], #order_status')
                : null;
            if (!select || !orderAcc.contains(select)) return;
            e.preventDefault();
            e.stopPropagation();
            refreshOrderList({ order_status: select.value });
        }, true);

        orderAcc.addEventListener('click', function (e) {
            // 기간설정: 날짜 입력란 표시 + 수정 가능하도록 초기화
            var dataSetBtn = e.target && e.target.closest ? e.target.closest('a.eDataSet') : null;
            if (dataSetBtn && orderAcc.contains(dataSetBtn)) {
                e.preventDefault();
                e.stopPropagation();
                var dataSearch = orderAcc.querySelector('#dataSearch');
                if (!dataSearch) return;
                var hidden = window.getComputedStyle(dataSearch).display === 'none';
                dataSearch.style.display = hidden ? 'block' : 'none';
                orderAcc.querySelectorAll('.ec-base-button a[days]').forEach(function (b) {
                    b.classList.remove('selected');
                });
                if (hidden) {
                    dataSetBtn.classList.add('selected');
                    enableDateInputs(dataSearch);
                    // 입력칸이 비어 있으면 list에서 다시 채움
                    if (!dataSearch.querySelector('#history_start_date, input[name="history_start_date"]')) {
                        fetch(buildListUrl().listUrl)
                            .then(function (r) { return r.text(); })
                            .then(function (html) {
                                var doc = (new DOMParser()).parseFromString(html, 'text/html');
                                var srcHead = doc.querySelector('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
                                var head = orderAcc.querySelector('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
                                if (head && srcHead) ensureDataSearchFields(head, srcHead);
                                dataSearch.style.display = 'block';
                            })
                            .catch(function () {});
                    }
                } else {
                    dataSetBtn.classList.remove('selected');
                }
                if (typeof OrderHistory !== 'undefined') OrderHistory.set_period_mode('search');
                return;
            }

            // 조회 버튼
            var searchBtn = e.target && e.target.closest
                ? e.target.closest('#dataSearch .btn-search-custom, #dataSearch button, #dataSearch input[type="submit"]')
                : null;
            if (searchBtn && orderAcc.contains(searchBtn)) {
                e.preventDefault();
                e.stopPropagation();
                runCustomPeriodSearch(orderAcc);
                return;
            }

            // 오늘/1개월/3개월/6개월
            var periodBtn = e.target && e.target.closest
                ? e.target.closest('.ec-base-button a[days]')
                : null;
            if (!periodBtn || !orderAcc.contains(periodBtn)) return;
            e.preventDefault();
            e.stopPropagation();
            var days = periodBtn.getAttribute('days') || '00';
            var range = datesFromDays(days);
            var select = getStatusSelect();
            var overrides = {
                history_start_date: range.start,
                history_end_date: range.end,
                __days: days
            };
            if (select && select.value) overrides.order_status = select.value;
            var dataSearch = orderAcc.querySelector('#dataSearch');
            if (dataSearch) dataSearch.style.display = 'none';
            refreshOrderList(overrides, { syncPeriod: true }).then(function () {
                orderAcc.querySelectorAll('.ec-base-button a[days], .ec-base-button a.eDataSet').forEach(function (b) {
                    b.classList.remove('selected');
                });
                periodBtn.classList.add('selected');
            });
        }, true);

        // 기간설정 폼 제출
        orderAcc.addEventListener('submit', function (e) {
            var form = e.target;
            if (!form || !orderAcc.contains(form)) return;
            var dates = getDateInputs(form);
            if (!dates.start && !dates.end) return;
            e.preventDefault();
            e.stopPropagation();
            runCustomPeriodSearch(orderAcc);
        }, true);
    }

    function fetchAndInject(orderHeadEl) {
        var orderAcc = orderHeadEl.closest('#acc-order');
        var isIndexPage = !!orderAcc;
        var hasModeCs = (window.location.search || '').indexOf('mode=cs') !== -1;
        var built = buildListUrl();
        fetch(built.listUrl)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                var doc = (new DOMParser()).parseFromString(html, 'text/html');
                var srcHead = doc.querySelector('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
                if (srcHead) {
                    if (isIndexPage && !hasModeCs) {
                        var stateSelect = orderHeadEl.querySelector('.stateSelect');
                        var srcSelect = srcHead.querySelector('.stateSelect select');
                        if (stateSelect && srcSelect && !stateSelect.querySelector('select')) {
                            stateSelect.appendChild(srcSelect.cloneNode(true));
                        }
                    }
                    if (isIndexPage) ensureDataSearchFields(orderHeadEl, srcHead);
                }
                if (isIndexPage) {
                    injectOrderList(doc, false);
                    syncStatusSelect(built.params);
                    bindAccOrderFilters();
                }
            })
            .catch(function () {});
    }

    function apply() {
        var orderAcc = document.getElementById('acc-order');
        var orderHeads = document.querySelectorAll('.xans-myshop-orderhistoryhead, [module="Myshop_OrderHistoryHead"]');
        var fetched = false;

        orderHeads.forEach(function (orderHead) {
            var isAcc = !!orderHead.closest('#acc-order');
            var stateSelect = orderHead.querySelector('.stateSelect');
            var dataSearch = orderHead.querySelector('#dataSearch');
            var hasModeCs = (window.location.search || '').indexOf('mode=cs') !== -1;
            if (isAcc) {
                if (hasModeCs) {
                    if (stateSelect) stateSelect.classList.add('displaynone');
                } else {
                    if (stateSelect) {
                        stateSelect.classList.remove('displaynone');
                        removeDisplayNone(stateSelect);
                    }
                }
            }
            if (isAcc && !fetched) {
                fetched = true;
                fetchAndInject(orderHead);
            } else if (dataSearch) {
                replaceSearchImageButton(dataSearch);
                enableDateInputs(dataSearch);
            }
            if (isAcc) rewriteOrderLinks(orderAcc);
        });

        if (orderAcc && !fetched) {
            fetch(buildListUrl().listUrl)
                .then(function (r) { return r.text(); })
                .then(function (html) {
                    injectOrderList((new DOMParser()).parseFromString(html, 'text/html'), false);
                    bindAccOrderFilters();
                })
                .catch(function () {});
        } else if (orderAcc) {
            bindAccOrderFilters();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    } else {
        apply();
    }
})();
