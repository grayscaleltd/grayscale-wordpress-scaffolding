<?php

namespace ClientWalkers;

/**
 * Custom comment walker class for rendering comments.
 * https://teamtreehouse.com/community/wordpress-user-comments
 */
class ClientWalkersComment extends \Walker_Comment {
	/**
	 * The type of tree being handled, in this case, comments.
	 *
	 * @var string
	 */
	public $tree_type = 'comment';

	/**
	 * Database fields for the walker.
	 *
	 * @var array
	 */
	public $db_fields = array(
		'parent' => 'comment_parent',
		'id'     => 'comment_ID',
	);

	/**
	 * Starts the element output for a comment.
	 *
	 * @param string     &$output The HTML output.
	 * @param WP_Comment $comment The current comment object.
	 * @param int        $depth   Depth of the current comment.
	 * @param array      $args    An array of arguments.
	 * @param int        $id      ID of the current comment.
	 */
	public function start_el(&$output, $comment, $depth = 0, $args = array(), $id = 0) { // phpcs:ignore Generic.Files.LineLength, PSR1.Methods.CamelCapsMethodName
		++$depth;
		$GLOBALS['comment_depth'] = $depth; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$GLOBALS['comment']       = $comment; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

		if (!empty($args['callback'])) {
			ob_start();
			call_user_func($args['callback'], $comment, $args, $depth);
			$output .= ob_get_clean();
			return;
		}

		$tag = ($args['style'] === 'div') ? 'div' : 'li';

		if (($comment->comment_type === 'pingback' || $comment->comment_type === 'trackback') && $args['short_ping']) {
			// phpcs:disable Generic.Files.LineLength
			$output .= '<' . $tag . ' id="comment-' . get_comment_ID() . '" ' . comment_class('', $comment, null, false) . '>';
			$output .= '<div class="comment-body">';
			$output .= __('Pingback:', 'grayscale') . ' ' . get_comment_author_link($comment) . ' ' . edit_comment_link(__('Edit', 'grayscale'), ' | ', '');
			$output .= '</div>';
		} else {
			$output .= '<' . $tag . ' id="comment-' . get_comment_ID() . '" ' . comment_class($this->has_children ? 'parent' : '', $comment, null, false) . '>';
			// phpcs:enable Generic.Files.LineLength
			$output .= '<div id="div-comment-' . get_comment_ID() . '">';

			$output .= '<header class="comment-meta">';

			$output .= '<div class="vcard">';
			$output .= ($args['avatar_size'] !== 0) ?
					get_avatar($comment, $args['avatar_size'], null, get_comment_author_link($comment)) :
					'';
			$output .= '</div>';

			$output .= '<div class="comment-metadata">';
			$output .= '<p>';
			$output .= '<span class="comment-author">' . get_comment_author_link($comment) . '</span><br>';
			$output .= '<time datetime="' . get_comment_time('c') . '">';
			// translators: %1$s represents the comment date, %2$s represents the comment time.
			$output .= sprintf(__('%1$s at %2$s', 'grayscale'), get_comment_date('', $comment), get_comment_time());
			$output .= '</time>';
			$output .= ' | <a href="' . esc_url(get_comment_link($comment, $args)) . '">#</a>';
			$output .= (current_user_can('edit_comment', $comment->comment_ID)) ?
					' | <a href="' . get_edit_comment_link() . '">' . __('Edit', 'grayscale') . '</a>' :
					'';
			$output .= ($comment->comment_approved === '0') ?
					' | ' . __('Your comment is awaiting moderation.', 'grayscale') :
					'';
			$output .= '</p>';
			$output .= '</div>';

			$output .= '</header>';

			$output .= '<div class="comment-content">' . wpautop(get_comment_text()) . '</div>';

			$output .= get_comment_reply_link(
				array_merge(
					$args,
					array(
						'add_below' => 'div-comment',
						'max_depth' => $args['max_depth'],
						'depth'     => $depth,
						'before'    => '<div class="reply">',
						'after'     => '</div>',
					)
				)
			);

			$output .= '</div><!-- .comment-body -->';
		}
	}

	/**
	 * Ends the element output for a comment.
	 *
	 * @param string     &$output The HTML output.
	 * @param WP_Comment $comment The current comment object.
	 * @param int        $depth   Depth of the current comment.
	 * @param array      $args    An array of arguments.
	 */
	public function end_el(&$output, $comment, $depth = 0, $args = array()) { // phpcs:ignore Generic.Files.LineLength, PSR1.Methods.CamelCapsMethodName
		if (!empty($args['end-callback'])) {
			ob_start();
			call_user_func($args['end-callback'], $comment, $args, $depth);
			$output .= ob_get_clean();
			return;
		}

		if ($args['style'] === 'div') {
			$output .= "</div><!-- #comment-## -->\n";
		} else {
			$output .= "</li><!-- #comment-## -->\n";
		}
	}
}
