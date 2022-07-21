<?php get_header(); ?>

  <div class="content-block">
    <div class="wrapper">

      <main id="main">

        <?php if ( $tmp = get_search_query() ) : ?>
          <h1><?php printf( __( 'Search Results for “%s”', 'grayscale' ), $tmp ); ?></h1>
        <?php else : ?>
          <h1><?php _e( 'You might be interested in&hellip;', 'grayscale' ); ?></h1>
        <?php endif; ?>

        <?php if ( have_posts() ) : ?>

          <?php while ( have_posts() ) : the_post(); ?>

            <article <?php post_class(); ?>>

              <p><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>

              <p class="article-meta">
                <small>
                  <?php
                    $date = '<time datetime="' . get_the_date( 'Y-m-d' ) . '">' . get_the_date() . '</time>';
                    printf( __( 'Posted by %s on %s', 'grayscale' ), esc_html( get_the_author() ), $date );
                  ?>
                </small>
              </p>

              <?php the_excerpt(); ?>

              <ul class="wp-article-links">
                <li><a href="<?php the_permalink(); ?>"><?php _e( 'Continue Reading &rarr;', 'grayscale' ); ?></a></li>
                <?php if ( comments_open() || get_comments_number() ) : ?>
                  <li><a href="<?php comments_link(); ?>"><?php comments_number( 'No Comments', '1 Comment', '% Comments' ); ?></a></li>
                <?php endif; ?>
                <?php edit_post_link( __( 'Edit', 'grayscale' ), '<li>', '</li>' ); ?>
              </ul>

            </article>

          <?php endwhile; ?>

          <?php
            the_posts_pagination( array(
              'prev_text' => __( '&larr;', 'grayscale' ),
              'next_text' => __( '&rarr;', 'grayscale' ),
            ) );
          ?>

        <?php else : ?>

          <p><?php _e( 'Sorry, we cannot find what you are looking for. Try something else?', 'grayscale' ); ?></p>

          <?php get_search_form(); ?>

        <?php endif; ?>

      </main>

      <?php get_sidebar(); ?>

    </div>
  </div>

<?php get_footer(); ?>
