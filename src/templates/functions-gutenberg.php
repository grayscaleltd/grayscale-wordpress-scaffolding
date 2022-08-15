<?php

/* ENQUEUE */
  add_action( 'wp_enqueue_scripts', function() {
    if ( !is_admin() ) {
      wp_dequeue_style( 'wp-block-library' );
    }
  }, 99 );

  add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
      'blocks-core',
      get_template_directory_uri() . '/admin/blocks-core.js',
      array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
      time()
    );
  } );

/* FEATURES */
  add_action( 'after_setup_theme', function() {
    add_editor_style( 'editor.css' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'disable-custom-colors' );
    add_theme_support( 'disable-custom-font-sizes' );
    add_theme_support( 'disable-custom-gradients' );
    add_theme_support( 'editor-color-palette', array() );
    add_theme_support( 'editor-font-sizes', array() );
    add_theme_support( 'editor-gradient-presets', array() );
    remove_theme_support( 'core-block-patterns' );
  } );

  add_filter( 'block_editor_settings_all', function ( $editor_settings ) {
    $editor_settings['__experimentalFeatures']['color']['customDuotone'] = false;
    $editor_settings['__experimentalFeatures']['color']['duotone'] = [];
    $editor_settings['__experimentalFeatures']['typography']['dropCap'] = false;
    $editor_settings['__experimentalFeatures']['typography']['fontStyle'] = false;
    $editor_settings['__experimentalFeatures']['typography']['fontWeight'] = false;
    $editor_settings['__experimentalFeatures']['typography']['letterSpacing'] = false;
    $editor_settings['__experimentalFeatures']['typography']['textDecoration'] = false;
    $editor_settings['__experimentalFeatures']['blocks']['core/button']['border']['radius'] = false;
    $editor_settings['canLockBlocks'] = current_user_can( 'activate_plugins' );
    $editor_settings['codeEditingEnabled'] = current_user_can( 'activate_plugins' );
    return $editor_settings;
  } );

  // ==========================================================================
  // WordPress forces duotone on us so we need to force our way out of it. The
  // 1st action removes the SVG masks output at the beginning of <body>. The 2nd
  // action removes global-styles-inline-css as the duotone classes are inlined.
  // https://github.com/WordPress/gutenberg/issues/38299
  //
  // However, this will also remove other useful CSS variables, so we need to
  // manuallly compensate that with _colors.scss and _font-sizes.scss
  // ==========================================================================
  remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
  remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' );
