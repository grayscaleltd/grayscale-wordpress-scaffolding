<?php get_header(); ?>

  <main id="main">

	<?php if (have_posts()) : ?>

		<?php the_post(); ?>

		<div class="content-block">
			<div class="wrapper">

			<?php the_title('<h1>', '</h1>'); ?>

			<?php the_content(); ?>

			<?php edit_post_link(__('Edit', 'grayscale'), '<ul class="wp-article-links"><li>', '</li></ul>'); ?>

			</div>
		</div>

	<?php endif; ?>

  </main>

  <?php get_sidebar(); ?>

<?php get_footer(); ?>
