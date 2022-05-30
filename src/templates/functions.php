<?php

require 'functions-core.php';
require 'functions-gutenberg.php';
require 'functions-widgets.php';

/* ACCESS CONTROL */
  add_filter( 'rest_endpoints', function( $endpoints ) {
    if ( ! is_user_logged_in() ) {
      if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
      }

      if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
      }
    }

    return $endpoints;
  } );

/* CONTENT */
  if ( ! isset( $content_width ) ) {
    $content_width = 1200;
  }

/* ENQUEUE */
  add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
      'client-theme',
      get_template_directory_uri() . '/style.css',
      null,
      ( wp_get_environment_type() === 'production' ) ? wp_get_theme()->get( 'Version' ) : time()
    );

    wp_enqueue_style(
      'client-theme-print',
      get_template_directory_uri() . '/print.css',
      null,
      ( wp_get_environment_type() === 'production' ) ? wp_get_theme()->get( 'Version' ) : time(),
      'print'
    );

    wp_enqueue_script(
      'client-theme',
      get_template_directory_uri() . '/application.js',
      array( 'jquery' ),
      ( wp_get_environment_type() === 'production' ) ? wp_get_theme()->get( 'Version' ) : time(),
      true
    );
  } );

/* GRAVITY FORMS */
  add_filter( 'gform_disable_form_theme_css', '__return_true' );

/* PRINT QR CODE */
  add_action( 'wp_head', function() {
    if ( is_singular() && !is_front_page() ) {
      echo '<style>html::after{content:url("https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=' . get_the_permalink() . '&choe=UTF-8&chld=L|0");position:absolute;top:0;right:0;z-index:-1;padding:0 0 1rem 1rem;background:#fff;line-height:0;opacity:0}@media print{html::after{z-index:999;opacity:1}}</style>';
    }
  }, 20 );

/* REVISIONS */
  add_filter( 'wp_revisions_to_keep', function( $num, $post ) {
    return 10;
  }, 10, 2 );

/* SECURITY HEADERS */
  add_filter( 'wp_headers', function( $headers ) {
    $headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
    $headers['X-Content-Type-Options'] = 'nosniff';
  } );
