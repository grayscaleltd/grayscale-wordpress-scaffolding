		<?php if (has_nav_menu('footer') || is_active_sidebar('footer')) : ?>

			<footer class="footer">
				<div class="wrapper">

					<?php
					if (has_nav_menu('footer')) {
						wp_nav_menu(
							array(
								'menu_class'     => 'menu',
								'menu_id'        => 'menu-footer',
								'container'      => false,
								'walker'         => new ClientWalkers\ClientWalkersNav(),
								'theme_location' => 'footer',
							)
						);
					}
					?>

					<?php dynamic_sidebar('footer'); ?>

				</div>
			</footer>

		<?php endif; ?>

		<?php if (has_nav_menu('offcanvas') || is_active_sidebar('offcanvas')) : ?>

			<div class="off-canvas">

				<?php
				if (has_nav_menu('offcanvas')) {
					wp_nav_menu(
						array(
							'menu_class'     => 'menu',
							'menu_id'        => 'menu-offcanvas',
							'container'      => false,
							'walker'         => new ClientWalkers\ClientWalkersNav(),
							'theme_location' => 'offcanvas',
						)
					);
				}
				?>

				<?php dynamic_sidebar('offcanvas'); ?>

			</div>

		<?php endif; ?>

	</div>

	<?php wp_footer(); ?>

</body>
</html>
