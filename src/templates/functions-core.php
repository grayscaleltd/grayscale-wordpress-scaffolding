<?php

/* ADMIN LOGIN */
  // Custom Admin Login Style
  function add_wp_login_styles() {
    echo '<link rel="stylesheet" href="' . get_template_directory_uri() . '/admin/wp-login.css">';
  }
  add_action( 'login_head', 'add_wp_login_styles' );
  add_action( 'admin_head', 'add_wp_login_styles' );

  // Custom Admin Login Logo URL
  add_filter( 'login_headerurl', function() {
    return 'https://grayscale.com.hk';
  } );

  // Custom Admin Login Logo Title
  add_filter( 'login_headertext', function() {
    return 'Grayscale web design and web development Hong Kong';
  } );

/* COMMENTS */
  add_action( 'wp_print_scripts', function() {
    if ( !is_admin() && is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
      wp_enqueue_script( 'comment-reply' );
    }
  } );

/* CUSTOM TRACKING */
  add_action( 'after_setup_theme', function() {
    add_option( 'client_tracking' );
  } );

  add_action( 'wp_footer', function() {
    echo get_option( 'client_tracking' );
  }, 20 );

/* ENABLE/DISABLE FEATURES */
  // Disable Emojis
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );

  // Enable Excerpt on Page
  add_action( 'init', function() {
    add_post_type_support( 'page', 'excerpt' );
  } );

/* MENUS */
  add_action( 'init', function() {
    register_nav_menus( array(
      'main' => __( 'Main Menu', 'grayscale' ),
      'footer' => __( 'Footer Menu', 'grayscale' ),
      'offcanvas' => __( 'Off-canvas Menu', 'grayscale' ),
    ) );
  } );

/* THEME SUPPORT */
  add_action( 'after_setup_theme', function() {
    // Enable Translation
    load_theme_textdomain( 'grayscale' );

    // Check options at https://developer.wordpress.org/reference/functions/add_theme_support/
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'html5', array( 'caption', 'comment-form', 'comment-list', 'gallery', 'navigation-widgets', 'script', 'search-form', 'style' ) );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'title-tag' );
  } );

/* UPDATE THEME DEFAULT OPTIONS */
  // Check options at https://codex.wordpress.org/Option_Reference
  add_action( 'after_switch_theme', function() {
    update_option( 'default_comment_status', 'closed' );
    update_option( 'default_ping_status', 'closed' );
    update_option( 'default_pingback_flag', 0 );
    update_option( 'comment_registration', 1 );
    update_option( 'gmt_offset', 8 );
    update_option( 'start_of_week', 0 );
    update_option( 'timezone_string', 'Asia/Hong_Kong' );
    update_option( 'thumbnail_size_w', 300 );
    update_option( 'thumbnail_size_h', 300 );
    update_option( 'medium_size_w', 600 );
    update_option( 'medium_size_h', 600 );
    update_option( 'uploads_use_yearmonth_folders', 0 );
    update_option( 'permalink_structure', '\/%postname%\/' );
    update_option( 'gzipcompression', 1 );
    update_option( 'show_on_front', 'page' );
    update_option( 'use_smilies', 0 );
  } );

/* WALKERS */
  // Comment (Reference: https://teamtreehouse.com/community/wordpress-user-comments)
  class GS_Comment extends Walker_Comment {
    public $tree_type = 'comment';
    public $db_fields = array ( 'parent' => 'comment_parent', 'id' => 'comment_ID' );

    public function start_el( &$output, $comment, $depth = 0, $args = array(), $id = 0 ) {
      $depth++;
      $GLOBALS['comment_depth'] = $depth;
      $GLOBALS['comment'] = $comment;

      if ( !empty( $args['callback'] ) ) {
        ob_start();
        call_user_func( $args['callback'], $comment, $args, $depth );
        $output .= ob_get_clean();
        return;
      }

      $tag = ( $args['style'] == 'div' ) ? 'div' : 'li';

      if ( ( $comment->comment_type == 'pingback'  || $comment->comment_type == 'trackback' ) && $args['short_ping'] ) {
        $output .= '<' . $tag . ' id="comment-' . get_comment_ID() . '" ' . comment_class( '', $comment, null, false ) . '>';
        $output .= '<div class="comment-body">';
        $output .= __( 'Pingback:', 'grayscale' ) . ' ' . get_comment_author_link( $comment ) . ' ' . edit_comment_link( __( 'Edit', 'grayscale' ), ' | ', '' );
        $output .= '</div>';
      } else {
        $output .= '<' . $tag . ' id="comment-' . get_comment_ID() . '" ' .  comment_class( $this->has_children ? 'parent' : '', $comment, null, false ) . '>';
        $output .= '<div id="div-comment-' . get_comment_ID() . '">';

        $output .= '<header class="comment-meta">';

        $output .= '<div class="vcard">';
        $output .= ( $args['avatar_size'] != 0 ) ? get_avatar( $comment, $args['avatar_size'], null, get_comment_author_link( $comment ) ) : '';
        $output .= '</div>';

        $output .= '<div class="comment-metadata">';
        $output .= '<p>';
        $output .= '<span class="comment-author">' . get_comment_author_link( $comment ) . '</span><br>';
        $output .= '<time datetime="' .  get_comment_time( 'c' ) . '">' . sprintf( __( '%1$s at %2$s', 'grayscale' ), get_comment_date( '', $comment ), get_comment_time() ) . '</time>';
        $output .= ' | <a href="' . esc_url( get_comment_link( $comment, $args ) ) . '">#</a>';
        $output .= ( current_user_can( 'edit_comment', $comment->comment_ID ) ) ? ' | <a href="' . get_edit_comment_link() . '">' . __( 'Edit', 'grayscale' ) . '</a>' : '';
        $output .= ( $comment->comment_approved == '0' ) ? ' | ' . __( 'Your comment is awaiting moderation.', 'grayscale' ) : '';
        $output .= '</p>';
        $output .= '</div>';

        $output .= '</header>';

        $output .= '<div class="comment-content">' . wpautop( get_comment_text() ) . '</div>';

        $output .= get_comment_reply_link( array_merge( $args, array(
          'add_below' => 'div-comment',
          'max_depth' => $args['max_depth'],
          'depth' => $depth,
          'before' => '<div class="reply">',
          'after' => '</div>'
        ) ) );

        $output .= '</div><!-- .comment-body -->';
      }
    }

    public function end_el( &$output, $comment, $depth = 0, $args = array() ) {
      if ( !empty( $args['end-callback'] ) ) {
        ob_start();
        call_user_func( $args['end-callback'], $comment, $args, $depth );
        $output .= ob_get_clean();
        return;
      }

      if ( $args['style'] == 'div' ) {
        $output .= "</div><!-- #comment-## -->\n";
      } else {
        $output .= "</li><!-- #comment-## -->\n";
      }
    }
  }

  // Menu
  class GS_Header_Nav_Menu extends Walker_Nav_Menu {
    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
      $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

      $classes = empty( $item->classes ) ? array() : (array) $item->classes;
      $classes[] = 'menu-item-' . $item->ID;

      $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
      $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

      $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth );
      $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

      $output .= $indent . '<li' . $id . $class_names .'>';

      $title = apply_filters( 'the_title', $item->title, $item->ID );

      if ( strpos( $title, '|' ) !== false ) {
        $title_words = explode ( '|' , $title );
        $title = '';

        foreach ( $title_words as $index => $title_word ) {
          $title .= '<span class="menu-item-word-' . ( $index + 1 ) . '">' . ltrim( $title_word ) . '</span>';
        }
      }

      $atts = array();
      $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
      $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
      $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
      $atts['href']   = ! empty( $item->url )        ? $item->url        : '';
      $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

      $attributes = '';

      foreach ( $atts as $attr => $value ) {
        if ( ! empty( $value ) ) {
          $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
          $attributes .= ' ' . $attr . '="' . $value . '"';
        }
      }

      $item_output = $args->before;
      $item_output .= '<a'. $attributes .'>';
      $item_output .= $args->link_before . $title . $args->link_after;
      $item_output .= '</a>';
      $item_output .= $args->after;
      $item_output .= ( !empty( $item->description ) ) ? '<p class="menu-item-description">' . $item->description . '</p>' : '';

      $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
  }
