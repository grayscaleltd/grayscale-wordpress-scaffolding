/* global Swiper */

jQuery( function( $ ) {
  if ( $( '.wp-block-client-swiper' ).length ) {
    const $el = $( '.wp-block-client-swiper' );

    // For a list of avaialble parameters,
    // check https://swiperjs.com/swiper-api#parameters
    new Swiper( $el.get( 0 ), {
      autoplay: $el.data( 'autoplay' ) ? {
        pauseOnMouseEnter: true,
      } : false,
      effect: $el.data( 'effect' ),
      keyboard: {
        enabled: true,
      },
      loop: true,
      navigation: $el.data( 'navigation' ) ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      } : false,
      pagination: $el.data( 'pagination' ) ? {
        el: '.swiper-pagination',
        clickable: true,
      } : false,
    } );
  }
} );
