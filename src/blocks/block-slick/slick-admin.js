/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  InspectorControls,
  InnerBlocks,
} = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/slick', {
  title: __( 'Slick Slider', 'grayscale' ),
  description: __(
    'Slideshow of items using Slick.',
    'grayscale'
  ),
  category: 'widgets',
  icon: 'image-flip-horizontal',
  keywords: [ __( 'carousel' ) ],
  styles: [],
  attributes: {
    autoplay: {
      type: 'boolean',
      default: false,
    },
    effect: {
      type: 'string',
      deafult: 'slide',
    },
    navigation: {
      type: 'boolean',
      default: true,
    },
    pagination: {
      type: 'boolean',
      default: false,
    },
  },
  variations: [],
  supports: {
    anchor: true,
    align: [],
    dimensions: {
      minHeight: true,
    },
    multiple: true,
  },
  parent: null,
  edit: ( props ) => {
    const {
      attributes: {
        autoplay,
        effect,
        navigation,
        pagination,
      },
      className,
      setAttributes,
    } = props;

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Slider Settings', 'grayscale' ) }>
            <PanelRow>
              <ToggleControl
                label={ __( 'Autoplay', 'grayscale' ) }
                checked={ autoplay }
                onChange={ () => setAttributes( {
                  autoplay: ! autoplay,
                } ) }
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label={ __( 'Navigation', 'grayscale' ) }
                checked={ navigation }
                onChange={ () => setAttributes( {
                  navigation: ! navigation,
                } ) }
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label={ __( 'Pagination', 'grayscale' ) }
                checked={ pagination }
                onChange={ () => setAttributes( {
                  pagination: ! pagination,
                } ) }
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label={ __( 'Effect', 'grayscale' ) }
                value={ effect }
                options={
                  [
                    { label: __( 'Slide', 'grayscale' ), value: 'slide' },
                    { label: __( 'Fade', 'grayscale' ), value: 'fade' },
                  ]
                }
                onChange={ ( value ) => setAttributes( {
                  effect: value,
                } ) }
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div className={ classnames( className ) }>
          <InnerBlocks allowedBlocks={ [ 'client/slick-item' ] } />
        </div>
      </>
    );
  },
  save: ( props ) => {
    const {
      autoplay,
      effect,
      navigation,
      pagination,
    } = props.attributes;
    return (
      <div
        data-autoplay={ autoplay ? 'true' : 'false' }
        data-effect={ effect }
        data-navigation={ navigation ? 'true' : 'false' }
        data-pagination={ pagination ? 'true' : 'false' }
      >
        <InnerBlocks.Content />
      </div>
    );
  },
} );

registerBlockType( 'client/slick-item', {
  title: __( 'Slick Slider Item', 'grayscale' ),
  description: __(
    'Slide within the Slick Slider.',
    'grayscale'
  ),
  category: 'widgets',
  icon: 'tablet',
  keywords: [],
  styles: [],
  attributes: {},
  variations: [],
  supports: {
    anchor: true,
    align: [],
    multiple: true,
  },
  parent: [ 'client/slick' ],
  edit: ( props ) => {
    const {
      className,
    } = props;

    return (
      <div className={ classnames( className ) }>
        <InnerBlocks />
      </div>
    );
  },
  save: () => {
    return (
      <div className={ classnames( 'slick-slide' ) }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
