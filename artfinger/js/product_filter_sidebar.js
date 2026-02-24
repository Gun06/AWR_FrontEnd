/**
 * 상품 목록 Sort by 슬라이드 패널
 * - "Sort by" 클릭 시 오른쪽에서 패널 슬라이드 인
 * - Close 또는 딤머 클릭 시 닫힘
 */
(function () {
    function getWrap() {
        var sidebar = document.getElementById('prdFilterSidebar');
        return sidebar && sidebar.parentElement;
    }

    function openSort() {
        var wrap = getWrap();
        if (wrap) wrap.classList.add('is_sort_open');
    }

    function closeSort() {
        var wrap = getWrap();
        if (wrap) wrap.classList.remove('is_sort_open');
    }

    function initSortSidebar() {
        var select = document.getElementById('selArray');
        var list = document.getElementById('sortSidebarOptions');
        if (!select || !list) return;

        var options = select.options;
        var currentHref = window.location.href;
        var currentSearch = (window.location.search || '').replace(/^\?/, '');

        // 사이드바에 노출할 정렬 옵션 (원본 select 옵션 "순서" 기준)
        // Cafe24 기본 product_Orderby 출력 순서를 전제로 함:
        //  0: Sort by (placeholder)
        //  1: New arrivals
        //  2: Name
        //  3: Low price   → 실제 동작은 높은 가격 → 낮은 가격이라고 가정 (High to Low)
        //  4: High price  → 실제 동작은 낮은 가격 → 높은 가격이라고 가정 (Low to High)
        var displayConfigs = [
            { index: 1, label: 'New Arrivals' },
            { index: 4, label: 'Low to High' },
            { index: 3, label: 'High to Low' }
        ];

        list.innerHTML = '';

        displayConfigs.forEach(function (config) {
            var idx = config.index;
            if (typeof idx !== 'number') return;
            if (idx < 0 || idx >= options.length) return;

            var opt = options[idx];
            if (!opt) return;

            var val = (opt.value || '').toString().trim();
            if (!val) return;

            var a = document.createElement('a');
            a.href = val;
            a.textContent = config.label;

            var optNorm = val.split('?')[1] || '';
            var isSelected = (currentSearch && currentSearch === optNorm) ||
                (currentHref === val) ||
                (currentHref.indexOf(val) !== -1 && val.length > 10);
            if (isSelected) {
                a.setAttribute('aria-current', 'page');
                a.className = 'selected';
            }

            var li = document.createElement('li');
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    function initOpenClose() {
        var trigger = document.getElementById('prdSortTrigger');
        var sidebar = document.getElementById('prdFilterSidebar');
        var dimmer = document.getElementById('prdFilterSidebarDimmer');
        if (!sidebar) return;

        var closeBtn = sidebar.querySelector('.prd_filter_sidebar_close');
        if (trigger) trigger.addEventListener('click', openSort);
        if (closeBtn) closeBtn.addEventListener('click', closeSort);
        if (dimmer) dimmer.addEventListener('click', closeSort);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initSortSidebar();
            initOpenClose();
        });
    } else {
        initSortSidebar();
        initOpenClose();
    }
})();
