wp.domReady(function() {
  const whitelistedCoreBlocks = [
    'core/block',
    'core/button',
    'core/buttons',
    'core/column',
    'core/columns',
    'core/embed',
    'core/freeform',
    'core/gallery',
    'core/group',
    'core/heading',
    'core/image',
    'core/list',
    'core/media-text',
    'core/missing',
    'core/paragraph',
    'core/quote',
  ];

  const whitelistedCoreStyles = [
  ];

  const whitelistedCoreVariations = [
    ['core/columns', 'one-column-full'],
    ['core/columns', 'two-columns-equal'],
    ['core/columns', 'two-columns-one-third-two-thirds'],
    ['core/columns', 'two-columns-two-thirds-one-third'],
    ['core/columns', 'three-columns-equal'],
    ['core/columns', 'three-columns-wider-center'],
    ['core/group', 'group'],
    ['core/group', 'group-row'],
    ['core/group', 'group-stack'],
  ];

  // Display statuses of Core Blocks, Styles, and Variations
  console.group('Gutenberg Core Blocks, Styles, and Variations');
  wp.blocks.getBlockTypes().forEach((blockType) => {
    const isCoreBlock = blockType.name.includes('core');
    const isWhitelistedBlock = whitelistedCoreBlocks.includes(blockType.name);

    if (isCoreBlock && !isWhitelistedBlock) {
      console.log(`%c✘ ${blockType.name}`, 'color: orangered');
    } else if (
      (isCoreBlock && 'styles' in blockType) ||
      (isCoreBlock && 'variations' in blockType)
    ) {
      console.group(`%c✔ ${blockType.name}`, 'color: lime');

      blockType.styles = blockType.styles.filter((style) => {
        return !style.isDefault;
      });

      blockType.styles.forEach((blockStyle) => {
        const isWhitelistedStyle =
          whitelistedCoreStyles.some((whitelistedStyle) => {
            return whitelistedStyle[0] === blockType.name &&
                whitelistedStyle[1] === blockStyle.name;
          });

        if (!isWhitelistedStyle) {
          console.log(
              `%c✘ ${blockType.name}, style: ${blockStyle.name}`,
              'color: orangered'
          );
        } else {
          console.log(
              `%c✔ ${blockType.name}, style: ${blockStyle.name}`,
              'color: lime'
          );
        }
      });

      blockType.variations.forEach((blockVariation) => {
        const isWhitelistedVariation =
          whitelistedCoreVariations.some((whitelistedVariation) => {
            return whitelistedVariation[0] === blockType.name &&
                whitelistedVariation[1] === blockVariation.name;
          });

        if (!isWhitelistedVariation) {
          console.log(
              `%c✘ ${blockType.name}, variation: ${blockVariation.name}`,
              'color: orangered'
          );
        } else {
          console.log(
              `%c✔ ${blockType.name}, variation: ${blockVariation.name}`,
              'color: lime'
          );
        }
      });

      console.groupEnd();
    } else if (isCoreBlock) {
      console.log(`%c✔ ${blockType.name}`, 'color: lime');
    }
  });
  console.groupEnd();

  // Disable unwanted Core Blocks, Styles, and Variations
  wp.blocks.getBlockTypes().forEach((blockType) => {
    const isCoreBlock = blockType.name.includes('core');
    const isWhitelistedBlock = whitelistedCoreBlocks.includes(blockType.name);

    if (isCoreBlock && !isWhitelistedBlock) {
      // unregister Core Blocks that are not whitelisted
      wp.blocks.unregisterBlockType(blockType.name);
    } else if (
      (isCoreBlock && 'styles' in blockType) ||
      (isCoreBlock && 'variations' in blockType)
    ) {
      // for the remaining Core Blocks, process only the non-default Styles
      blockType.styles = blockType.styles.filter((style) => {
        return !style.isDefault;
      });

      // unregister Styles that are not whitelisted
      blockType.styles.forEach((blockStyle) => {
        const isWhitelistedStyle =
          whitelistedCoreStyles.some((whitelistedStyle) => {
            return whitelistedStyle[0] === blockType.name &&
                whitelistedStyle[1] === blockStyle.name;
          });

        if (!isWhitelistedStyle) {
          wp.blocks.unregisterBlockStyle(blockType.name, blockStyle.name);
        }
      });

      // unregister Variations that are not whitelisted
      blockType.variations.forEach((blockVariation) => {
        const isWhitelistedVariation =
          whitelistedCoreVariations.some((whitelistedVariation) => {
            return whitelistedVariation[0] === blockType.name &&
                whitelistedVariation[1] === blockVariation.name;
          });

        if (!isWhitelistedVariation) {
          wp.blocks.unregisterBlockVariation(
              blockType.name,
              blockVariation.name
          );
        }
      });
    }
  } );
});
