<?php get_header(); ?>

  <div class="content-block">
    <div class="wrapper">

      <main id="main">

        <?php the_archive_title( '<h1>', '</h1>' ); ?>

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

          <p><?php _e( 'Sorry, we cannot find what you are looking for.', 'grayscale' ); ?></p>

        <?php endif; ?>

      </main>

      <?php get_sidebar(); ?>

    </div>
  </div>

<?php get_footer(); ?>
