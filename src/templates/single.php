<?php get_header(); ?>

  <main id="main">

    <?php if ( have_posts() ) : the_post(); ?>

      <div class="content-block">
        <div class="wrapper">

          <article <?php post_class(); ?>>

            <header>

              <?php the_title( '<h1>', '</h1>' ); ?>

              <p class="article-meta">
                <small>
                  <?php
                    $date = '<time datetime="' . get_the_date( 'Y-m-d' ) . '">' . get_the_date() . '</time>';
                    // translators: %1$s represents the author name, %2$s represents the date
                    printf( esc_html__( 'Posted by %1$s on %2$s', 'grayscale' ), get_the_author(), esc_html( $date ) );
                  ?>
                </small>
              </p>

            </header>

            <?php the_content(); ?>

            <?php wp_link_pages(); ?>

            <footer>

              <p><?php the_category( ', ' ); ?></p>

              <p><?php the_tags(); ?></p>

              <?php edit_post_link( __( 'Edit', 'grayscale' ), '<ul class="wp-article-links"><li>', '</li></ul>' ); ?>

              <?php
                if ( comments_open() || get_comments_number() ) {
                  comments_template();
                }
              ?>

            </footer>

          </article>

          <?php if ( get_adjacent_post() ) : ?>

            <nav>

              <?php previous_post_link(); ?>

              <?php next_post_link(); ?>

            </nav>

          <?php endif; ?>

        </div>
      </div>

    <?php endif; ?>

  </main>

  <?php get_sidebar(); ?>

<?php get_footer(); ?>
