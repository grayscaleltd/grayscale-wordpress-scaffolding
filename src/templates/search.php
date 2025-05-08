<?php get_header(); ?>

  <main id="main">

	<div class="content-block">
		<div class="wrapper">

			<h1>
				<?php
					(get_search_query()) ?
						// translators: %s: the search query.
						printf(esc_html__('Search Results for “%s”', 'grayscale'), get_search_query()) :
						esc_html_e('You might be interested in&hellip;', 'grayscale');
				?>
			</h1>

			<?php if (have_posts()) : ?>

				<?php while (have_posts()) : ?>

					<?php the_post(); ?>

					<article <?php post_class(); ?>>

						<p><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>

						<p class="article-meta">
							<?php
								$date = '<time datetime="' . get_the_date('Y-m-d') . '">' . get_the_date() . '</time>';
								printf(
									// translators: %1$s: author name, %2$s: post published date.
									esc_html__('Posted by %1$s on %2$s', 'grayscale'),
									get_the_author(),
									wp_kses($date, array('time' => array('datetime' => array())))
								);
							?>
						</p>

						<?php the_excerpt(); ?>

						<ul class="wp-article-links">
							<li>
								<a href="<?php the_permalink(); ?>">
									<?php esc_html_e('Continue Reading &rarr;', 'grayscale'); ?>
								</a>
							</li>
							<?php if (comments_open() || get_comments_number()) : ?>
								<li>
									<a href="<?php comments_link(); ?>">
										<?php comments_number('No Comments', '1 Comment', '% Comments'); ?>
									</a>
								</li>
							<?php endif; ?>
							<?php edit_post_link(__('Edit', 'grayscale'), '<li>', '</li>'); ?>
						</ul>

					</article>

				<?php endwhile; ?>

				<?php
					the_posts_pagination(
						array(
							'prev_text' => __('&larr;', 'grayscale'),
							'next_text' => __('&rarr;', 'grayscale'),
						)
					);
				?>

			<?php else : ?>

				<p>
					<?php
						esc_html_e('Sorry, we cannot find what you are looking for. Try something else?', 'grayscale');
					?>
				</p>

				<?php get_search_form(); ?>

			<?php endif; ?>

		</div>
	</div>

  </main>

  <?php get_sidebar(); ?>

<?php get_footer(); ?>
