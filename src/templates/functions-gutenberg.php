<?php

/* ENQUEUE */
	add_action(
		'wp_enqueue_scripts',
		function () {
			wp_dequeue_style('classic-theme-styles');
			wp_dequeue_style('wp-block-library');
		},
		99
	);

	add_action(
		'enqueue_block_editor_assets',
		function () {
			wp_enqueue_script(
				'blocks-core',
				get_template_directory_uri() . '/admin/blocks-core.js',
				array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
				time(),
				false
			);
		}
	);

/* FEATURES */
	add_action(
		'after_setup_theme',
		function () {
			add_editor_style('editor.css');
			add_theme_support('align-wide');
			add_theme_support('disable-custom-colors');
			add_theme_support('disable-custom-font-sizes');
			add_theme_support('disable-custom-gradients');
			add_theme_support('editor-color-palette', array());
			add_theme_support('editor-font-sizes', array());
			add_theme_support('editor-gradient-presets', array());
			remove_theme_support('core-block-patterns');
		}
	);

	add_filter(
		'allowed_block_types_all',
		function ($block_editor_context, $editor_context) {
			if ($editor_context->name === 'core/edit-widgets') {
				return array(
					'core/button',
					'core/buttons',
					'core/freeform',
					'core/group',
					'core/heading',
					'core/image',
					'core/legacy-widget',
					'core/list',
					'core/list-item',
					'core/missing',
					'core/paragraph',
					'core/widget-group',
				);
			}

			return $block_editor_context;
		},
		10,
		2
	);

	add_filter(
		'block_editor_settings_all',
		function ($editor_settings) {
			$editor_settings['__experimentalFeatures']['color']['customDuotone']                    = false;
			$editor_settings['__experimentalFeatures']['color']['duotone']                          = array();
			$editor_settings['__experimentalFeatures']['typography']['dropCap']                     = false;
			$editor_settings['__experimentalFeatures']['typography']['fontStyle']                   = false;
			$editor_settings['__experimentalFeatures']['typography']['fontWeight']                  = false;
			$editor_settings['__experimentalFeatures']['typography']['letterSpacing']               = false;
			$editor_settings['__experimentalFeatures']['typography']['textDecoration']              = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/button']['border']['radius'] = false;
			$editor_settings['canLockBlocks']      = current_user_can('activate_plugins');
			$editor_settings['codeEditingEnabled'] = current_user_can('activate_plugins');
			return $editor_settings;
		}
	);

// ==========================================================================
// WordPress comes with a bunch of presets which is not always applicable.
// To reduce load, we remove the action but this will also remove other useful
// CSS variables, so we need to manually compensate that with _colors.scss and
// _fonts.scss
// ==========================================================================
	remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
