$(function () {
  var activityIndicatorOn = function() {
        $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
      },
      activityIndicatorOff = function() {
        $( '#imagelightbox-loading' ).remove();
      },
      overlayOn = function() {
        $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
      },
      overlayOff = function() {
        $( '#imagelightbox-overlay' ).remove();
      },
      navigationOn = function( instance, selector ) {
        var images = $( selector );
        if( images.length ) {
          var nav = $( '<div id="imagelightbox-nav"></div>' );
          for( var i = 0; i < images.length; i++ )
            nav.append( '<button type="button"></button>' );

          nav.appendTo( 'body' );
          nav.on( 'click touchend', function(){ return false; });

          var navItems = nav.find( 'button' );
          navItems.on( 'click touchend', function() {
            var $this = $( this );
            if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
              instance.switchImageLightbox( $this.index() );

            navItems.removeClass( 'active' );
            navItems.eq( $this.index() ).addClass( 'active' );

            return false;
          })
          .on( 'touchend', function(){ return false; });
        }
      },
      navigationUpdate = function( selector ) {
        var items = $( '#imagelightbox-nav button' );
        items.removeClass( 'active' );
        items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
      },
      navigationOff = function() {
        $( '#imagelightbox-nav' ).remove();
      };

  var selector = 'a[data-lightbox]';
  var instance = $( selector ).imageLightbox({
    onStart:   function() { overlayOn(); navigationOn( instance, selector ); },
    onEnd:     function() { overlayOff(); navigationOff(); activityIndicatorOff(); },
    onLoadStart: function() { activityIndicatorOn(); },
    onLoadEnd:   function() { navigationUpdate( selector ); activityIndicatorOff(); }
  });

  anchors.add('article h3, article h4');

  window.addEventListener('load', function() {
    var target = document.querySelector('.js-sticky-target');
    var wrapper = document.querySelector('.js-sticky-wrapper');
    var STICKY_OFFSET_PX = 10;

    var targetInitialWidth;
    var targetInitialCssText = target.style.cssText || '';

    function onScroll() {
      var scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;

      var wrapperOffsetTop = wrapper.offsetTop;
      var wrapperOffsetHeight = wrapper.offsetHeight;
      var targetOffsetHeight = target.offsetHeight;

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
        return;
      }

      targetInitialWidth = target.offsetWidth;

      onScroll();

      document.addEventListener('scroll', onScroll);
    }

    window.addEventListener('resize', startStickyBehaviour);

    startStickyBehaviour();
  });
});