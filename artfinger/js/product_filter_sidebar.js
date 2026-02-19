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

        list.innerHTML = '';
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var val = (opt.value || '').toString().trim();
            var text = (opt.text || '').toString().trim();
            if (!val) continue;

            var a = document.createElement('a');
            a.href = val;
            a.textContent = text;
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
        }
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
