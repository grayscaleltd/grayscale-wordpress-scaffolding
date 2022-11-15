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
  RichText,
} = wp.blockEditor;
const {
  PanelBody,
  TextControl,
  ToggleControl,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/accordion', {
  title: __( 'Accordion', 'grayscale' ),
  description: __(
    'Show information in a condensed way that can be expanded or collapsed.',
    'grayscale'
  ),
  category: 'widgets',
  icon: 'excerpt-view',
  keywords: [],
  styles: [],
  attributes: {
    multiExpand: {
      type: 'boolean',
      default: false,
    },
    allowAllClosed: {
      type: 'boolean',
      default: true,
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
        multiExpand,
        allowAllClosed,
      },
      className,
      clientId,
      setAttributes,
    } = props;

    return [
      <InspectorControls key="inspector">
        <PanelBody title={ __( 'Accordion Settings', 'grayscale' ) }>
          <ToggleControl
            label={ __( 'Multi-expand', 'grayscale' ) }
            checked={ multiExpand }
            onChange={ () => setAttributes( {
              multiExpand: ! multiExpand,
            } ) }
          />
          <ToggleControl
            label={ __( 'Allow all closed', 'grayscale' ) }
            checked={ allowAllClosed }
            onChange={ () => setAttributes( {
              allowAllClosed: ! allowAllClosed,
            } ) }
          />
        </PanelBody>
      </InspectorControls>,
      <div
        key={ clientId }
        className={ classnames( 'accordion', className ) }
        data-accordion
      >
        <InnerBlocks allowedBlocks={ [ 'client/accordion-item' ] } />
      </div>,
    ];
  },
  save: ( props ) => {
    const {
      multiExpand,
      allowAllClosed,
    } = props.attributes;
    return (
      <ul
        className={ classnames( 'accordion' ) }
        data-accordion
        data-multi-expand={ multiExpand ? 'true' : 'false' }
        data-allow-all-closed={ allowAllClosed ? 'true' : 'false' }
        data-deep-link="true"
        data-deep-link-smudge="true"
        data-update-history="true"
      >
        <InnerBlocks.Content />
      </ul>
    );
  },
} );

registerBlockType( 'client/accordion-item', {
  title: __( 'Accordion Item', 'grayscale' ),
  description: __(
    'Content within the Accordion.',
    'grayscale'
  ),
  category: 'common',
  icon: 'text',
  keywords: [],
  styles: [],
  attributes: {
    accordionTitle: {
      type: 'array',
      source: 'children',
      selector: '.accordion-title',
    },
    accordionAnchor: {
      type: 'string',
    },
    isOpen: {
      type: 'boolean',
      default: false,
    },
  },
  variations: [],
  supports: {
    anchor: false,
    align: [],
    multiple: true,
  },
  parent: [ 'client/accordion' ],
  edit: ( props ) => {
    const {
      attributes: {
        accordionTitle, accordionAnchor, isOpen,
      },
      className,
      clientId,
      setAttributes,
    } = props;

    return [
      <InspectorControls key="inspector">
        <PanelBody title={ __( 'Item Settings', 'grayscale' ) }>
          <ToggleControl
            label={ __( 'Open on load', 'grayscale' ) }
            checked={ isOpen }
            onChange={ () => setAttributes( {
              isOpen: ! isOpen,
            } ) }
          />
          <TextControl
            label={ __( 'HTML Anchor', 'grayscale' ) }
            value={ accordionAnchor }
            onChange={ ( id ) => setAttributes( {
              accordionAnchor: id,
            } ) }
          />
        </PanelBody>
      </InspectorControls>,
      <div
        key={ clientId }
        className={ classnames( 'accordion-item', 'is-active', className ) }
        data-accordion-item
      >
        <RichText
          className="accordion-title"
          value={ accordionTitle }
          onChange={ ( title ) => setAttributes( {
            accordionTitle: title,
          } ) }
          tagName="a"
          placeholder={ __( 'Accordion Title', 'grayscale' ) }
          keepPlaceholderOnFocus="true"
          multiline="false"
          allowedFormats="false"
        />
        <div className="accordion-content" data-tab-content>
          <InnerBlocks
            allowedBlocks={ [
              'core/buttons',
              'core/heading',
              'core/image',
              'core/list',
              'core/paragraph',
            ] }
          />
        </div>
      </div>,
    ];
  },
  save: ( props ) => {
    const {
      accordionTitle, accordionAnchor, isOpen,
    } = props.attributes;

    if ( ! accordionTitle ) {
      return;
    }

    return (
      <li
        className={ classnames(
          'accordion-item',
          { 'is-active': isOpen },
        ) }
        data-accordion-item
      >
        <a
          href={ ( accordionAnchor ) ?
            '#' + accordionAnchor :
            '#' + encodeURI( accordionTitle[ 0 ] )
              .replace( /[^%0-9A-Za-z]/g, '-' )
              .replace( /%/g, '' )
              .replace( /-+/g, '-' )
              .toLowerCase()
          }
          className="accordion-title"
        >
          <RichText.Content value={ accordionTitle } />
        </a>
        <div
          id={ ( accordionAnchor ) ?
            accordionAnchor :
            encodeURI( accordionTitle[ 0 ] )
              .replace( /[^%0-9A-Za-z]/g, '-' )
              .replace( /%/g, '' )
              .replace( /-+/g, '-' )
              .toLowerCase()
          }
          className="accordion-content"
          data-tab-content
        >
          <InnerBlocks.Content />
        </div>
      </li>
    );
  },
} );
