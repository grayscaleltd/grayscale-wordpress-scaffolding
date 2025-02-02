jQuery( function( $ ) {
  if ( $( '.wp-block-client-slick' ).length ) {
    $( '.wp-block-client-slick' ).each( ( i, el ) => {
      const $el = $( el );

      // For a list of avaialble parameters,
      // check https://kenwheeler.github.io/slick/#settings
      $el.slick( {
        arrows: $el.data( 'navigation' ) ? true : false,
        autoplay: $el.data( 'autoplay' ) ? true : false,
        fade: $el.data( 'effect' ) === 'fade' ? true : false,
        dots: $el.data( 'pagination' ) ? true : false,
      } );
    } );
  }
} );
