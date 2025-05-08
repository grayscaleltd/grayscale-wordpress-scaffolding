<?php

namespace ClientWalkers;

/**
 * Custom navigation walker class for menus.
 */
class ClientWalkersNav extends \Walker_Nav_Menu {
	/**
	 * Starts the element output for a menu item.
	 *
	 * @param string   &$output Used to append additional content.
	 * @param \WP_Post $item    Menu item data object.
	 * @param int      $depth   Depth of menu item. Used for padding.
	 * @param array    $args    An array of arguments. @see wp_nav_menu().
	 * @param int      $id      ID of the current menu item.
	 */
	public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) { // phpcs:ignore Generic.Files.LineLength, PSR1.Methods.CamelCapsMethodName
		$indent = ($depth) ? str_repeat("\t", $depth) : '';

		$classes   = empty($item->classes) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		$class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
		$class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

		$id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth);
		$id = $id ? ' id="' . esc_attr($id) . '"' : '';

		$output .= $indent . '<li' . $id . $class_names . '>';

		$title = apply_filters('the_title', $item->title, $item->ID);

		if (strpos($title, '|') !== false) {
			$title_words = explode('|', $title);
			$title       = '';

			foreach ($title_words as $index => $title_word) {
				$title .= '<span class="menu-item-word-' . ($index + 1) . '">' . ltrim($title_word) . '</span>';
			}
		}

		$atts           = array();
		$atts['title']  = ! empty($item->attr_title) ? $item->attr_title : '';
		$atts['target'] = ! empty($item->target)     ? $item->target     : '';
		$atts['rel']    = ! empty($item->xfn)        ? $item->xfn        : '';
		$atts['href']   = ! empty($item->url)        ? $item->url        : '';
		$atts           = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

		$attributes = '';

		foreach ($atts as $attr => $value) {
			if (!empty($value)) {
				$value       = ('href' === $attr) ? esc_url($value) : esc_attr($value);
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		$item_output  = $args['before'];
		$item_output .= '<a' . $attributes . '>';
		$item_output .= $args['link_before'] . $title . $args['link_after'];
		$item_output .= '</a>';
		$item_output .= $args['after'];
		$item_output .= (!empty($item->description)) ?
				'<p class="menu-item-description">' . $item->description . '</p>' :
				'';

		$output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
	}
}
