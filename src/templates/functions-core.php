<?php

/* ADMIN LOGIN SCREEN */
	add_action(
		'login_enqueue_scripts',
		function () {
				wp_enqueue_style(
					'client-login',
					get_template_directory_uri() . '/admin/wp-login.css',
					null,
					(wp_get_environment_type() === 'production') ? wp_get_theme()->get('Version') : time()
				);
		}
	);
	add_action(
		'admin_enqueue_scripts',
		function () {
				wp_enqueue_style(
					'client-login',
					get_template_directory_uri() . '/admin/wp-login.css',
					null,
					(wp_get_environment_type() === 'production') ? wp_get_theme()->get('Version') : time()
				);
		}
	);

	add_filter(
		'login_headerurl',
		function () {
			return 'https://grayscale.com.hk';
		}
	);

	add_filter(
		'login_headertext',
		function () {
			return 'Grayscale web design and web development Hong Kong';
		}
	);

/* COMMENTS */
	add_action(
		'wp_print_scripts',
		function () {
			if (!is_admin() && is_singular() && comments_open() && get_option('thread_comments')) {
				wp_enqueue_script('comment-reply');
			}
		}
	);

/* ENABLE/DISABLE FEATURES */
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');

	add_action(
		'init',
		function () {
			add_post_type_support('page', 'excerpt');
		}
	);

/* MENUS */
	add_action(
		'init',
		function () {
			register_nav_menus(
				array(
					'main'      => __('Main Menu', 'grayscale'),
					'footer'    => __('Footer Menu', 'grayscale'),
					'offcanvas' => __('Off-canvas Menu', 'grayscale'),
				)
			);
		}
	);

/* THEME SUPPORT (https://developer.wordpress.org/reference/functions/add_theme_support/) */
	add_action(
		'after_setup_theme',
		function () {
			add_theme_support('automatic-feed-links');
			add_theme_support('custom-logo');
			add_theme_support('editor-styles');
			add_theme_support(
				'html5',
				array(
					'caption',
					'comment-form',
					'comment-list',
					'gallery',
					'navigation-widgets',
					'script',
					'search-form',
					'style',
				)
			);
			add_theme_support('post-thumbnails');
			add_theme_support('responsive-embeds');
			add_theme_support('title-tag');
			load_theme_textdomain('grayscale');
		}
	);

/* UPDATE OPTIONS (https://codex.wordpress.org/Option_Reference) */
	add_action(
		'after_switch_theme',
		function () {
			update_option('default_comment_status', 'closed');
			update_option('default_ping_status', 'closed');
			update_option('default_pingback_flag', 0);
			update_option('comment_registration', 1);
			update_option('gmt_offset', 8);
			update_option('start_of_week', 0);
			update_option('timezone_string', 'Asia/Hong_Kong');
			update_option('thumbnail_size_w', 300);
			update_option('thumbnail_size_h', 300);
			update_option('medium_size_w', 600);
			update_option('medium_size_h', 600);
			update_option('uploads_use_yearmonth_folders', 0);
			update_option('permalink_structure', '\/%postname%\/');
			update_option('gzipcompression', 1);
			update_option('show_on_front', 'page');
			update_option('use_smilies', 0);
		}
	);
