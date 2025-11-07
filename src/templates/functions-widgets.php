<?php

add_action(
	'widgets_init',
	function () {
		register_sidebar(
			array(
				'name'          => __('Sidebar', 'grayscale'),
				'id'            => 'sidebar',
				'before_widget' => '<div class="sidebar-widget">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="sidebar-widget-title">',
				'after_title'   => '</h2>',
			)
		);

		register_sidebar(
			array(
				'name'          => __('Footer', 'grayscale'),
				'id'            => 'footer',
				'before_widget' => '<div class="footer-widget">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="footer-widget-title">',
				'after_title'   => '</h2>',
			)
		);

		register_sidebar(
			array(
				'name'          => __('Off-canvas', 'grayscale'),
				'id'            => 'offcanvas',
				'before_widget' => '<div class="off-canvas-widget">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="off-canvas-widget-title">',
				'after_title'   => '</h2>',
			)
		);
	}
);
