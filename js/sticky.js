window.addEventListener('load', function() {
    var target = document.querySelector('.js-sticky-target');
    var wrapper = document.querySelector('.js-sticky-wrapper');
    var STICKY_OFFSET_PX = 10;

    var wrapperOffsetTop;
    var wrapperOffsetHeight;
    var targetOffsetHeight;
    var targetInitialWidth;
    var targetInitialCssText = target.style.cssText || '';
    
    function onScroll() {
        var scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop >= wrapperOffsetTop - STICKY_OFFSET_PX) {
            if (scrollTop + targetOffsetHeight + STICKY_OFFSET_PX > wrapperOffsetTop + wrapperOffsetHeight) {
                target.style.cssText = targetInitialCssText 
                    + 'position: absolute; bottom: 0; width: ' + targetInitialWidth + 'px;';
            } else {
                target.style.cssText = targetInitialCssText 
                    + 'position: fixed; top: ' + STICKY_OFFSET_PX + 'px; width: ' + targetInitialWidth + 'px;';
            }
        } else {
            target.style.cssText = targetInitialCssText;
        }
    }

    function startStickyBehaviour() {
        document.removeEventListener('scroll', onScroll);

        target.style.cssText = targetInitialCssText;

        if (!window.matchMedia('(min-width: 992px)').matches || window.innerHeight < target.offsetHeight + STICKY_OFFSET_PX) {
            wrapper.style.height = 'initial';

            return;
        }

        var contentEl = document.querySelector('.js-content');
        var contentHeight = contentEl.offsetHeight;

        wrapper.style.height = contentHeight + 'px';

        wrapperOffsetTop = wrapper.offsetTop;
        wrapperOffsetHeight = wrapper.offsetHeight;
        targetOffsetHeight = target.offsetHeight;
        targetInitialWidth = target.offsetWidth;

        onScroll();
        
        document.addEventListener('scroll', onScroll);
    }

    window.addEventListener('resize', startStickyBehaviour);

    startStickyBehaviour();
});