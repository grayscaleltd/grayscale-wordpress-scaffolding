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
  ToggleControl,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/slider', {
  title: __( 'Slider', 'grayscale' ),
  description: __(
    'Slideshow of items.',
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
    multiple: true,
  },
  parent: null,
  edit: ( props ) => {
    const {
      attributes: {
        autoplay,
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
          </PanelBody>
        </InspectorControls>
        <div className={ classnames( className ) }>
          <InnerBlocks allowedBlocks={ [ 'client/slider-item' ] } />
        </div>
      </>
    );
  },
  save: ( props ) => {
    const {
      autoplay,
      navigation,
      pagination,
    } = props.attributes;
    return (
      <div
        className={ classnames( 'swiper' ) }
        data-autoplay={ autoplay ? 'true' : 'false' }
        data-navigation={ navigation ? 'true' : 'false' }
        data-pagination={ pagination ? 'true' : 'false' }
      >
        <div className="swiper-wrapper">
          <InnerBlocks.Content />
        </div>
        {
          pagination ? (
            <div className="swiper-pagination"></div>
          ) : null
        }
        {
          navigation ? (
            <>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </>
          ) : null
        }
      </div>
    );
  },
} );

registerBlockType( 'client/slider-item', {
  title: __( 'Slider Item', 'grayscale' ),
  description: __(
    'Slide within the Slider.',
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
  parent: [ 'client/slider' ],
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
      <div className={ classnames( 'swiper-slide' ) }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
