<?php
  if ( post_password_required() ) {
    return;
  }
?>

<?php if ( have_comments() ) : ?>

  <div id="comments" class="comments">

    <h2><?php esc_html_e( 'Comments', 'grayscale' ); ?> (<?php esc_html_e( get_comments_number() ); ?>)</h2>

    <ul class="comment-list">

      <?php
        wp_list_comments( array(
          'walker' => new GS_Comment(),
          'avatar_size' => 60,
        ) );
      ?>

    </ul>

    <?php the_comments_pagination(); ?>

  </div>

<?php endif; ?>

<?php if ( comments_open() || pings_open() ) : ?>

  <?php
    comment_form( array(
      'title_reply_before' => '<h2 id="reply-title" class="comment-reply-title">',
      'title_reply_after' => '</h2>',
    ) );
  ?>

<?php else : ?>

  <div id="respond" class="comment-respond">

    <h2 id="reply-title" class="comment-reply-title"><?php esc_html_e( 'Leave a Reply', 'grayscale' ); ?></h2>

    <p><?php esc_html_e( 'Comments are closed.', 'grayscale' ); ?></p>

  </div>

<?php endif; ?>
