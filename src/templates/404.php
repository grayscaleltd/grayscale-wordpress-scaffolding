<?php get_header(); ?>

  <main id="main">

	<div class="content-block">
		<div class="wrapper">

			<h1><?php esc_html_e('Page Not Found', 'grayscale'); ?></h1>

			<p><?php esc_html_e('The page you are looking for does not exist. Try something else?', 'grayscale'); ?></p>

			<?php get_search_form(); ?>

			<p>
				<a href="<?php echo esc_url(home_url()); ?>"><?php esc_html_e('&larr; Return Home', 'grayscale'); ?></a>
			</p>

		</div>
	</div>

  </main>

  <?php get_sidebar(); ?>

<?php get_footer(); ?>
