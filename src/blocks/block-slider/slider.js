/* global Swiper */

jQuery( document ).ready( function( $ ) {
  if ( $( '.wp-block-client-slider' ).length ) {
    $( '.wp-block-client-slider' ).each( ( i, el ) => {
      // For a list of avaialble parameters,
      // check https://swiperjs.com/swiper-api#parameters
      const options = {
        autoplay: $( el ).data( 'autoplay' ) ? {
          pauseOnMouseEnter: true,
        } : false,
        effect: 'fade',
        loop: true,
        navigation: $( el ).data( 'navigation' ) ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        } : false,
        pagination: $( el ).data( 'pagination' ) ? {
          el: '.swiper-pagination',
          clickable: true,
        } : false,
      };

      new Swiper( el, options );
    } );
  }
} );
