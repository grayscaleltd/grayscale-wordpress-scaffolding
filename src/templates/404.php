<?php get_header(); ?>

  <div class="content-block">
    <div class="wrapper">

      <main id="main">

        <h1><?php _e( 'Page Not Found', 'grayscale' ); ?></h1>

        <p><?php _e( 'The page you are looking for does not exist. Try something else?', 'grayscale' ); ?></p>

        <?php get_search_form(); ?>

        <p><a href="<?php echo home_url(); ?>"><?php _e( '&larr; Return Home', 'grayscale' ); ?></a></p>

      </main>

      <?php get_sidebar(); ?>

    </div>
  </div>

<?php get_footer(); ?>
