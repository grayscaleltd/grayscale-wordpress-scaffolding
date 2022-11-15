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
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
  MediaUpload,
  MediaUploadCheck,
  RichText,
} = wp.blockEditor;
const {
  Button,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/testimonial', {
  title: __( 'Testimonial', 'grayscale' ),
  description: __(
    'Show the good words you received.',
    'grayscale'
  ),
  category: 'widgets',
  icon: 'format-chat',
  keywords: [],
  styles: [],
  attributes: {
    testimonialContent: {
      type: 'array',
      source: 'children',
      selector: '.block-content',
    },
    testimonialEndorser: {
      type: 'array',
      source: 'children',
      selector: 'cite',
    },
    testimonialImgID: {
      type: 'number',
    },
    testimonialImgURL: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: '.block-image img',
    },
    testimonialImgAlt: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: '.block-image img',
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
        testimonialContent,
        testimonialEndorser,
        testimonialImgID, testimonialImgURL, testimonialImgAlt,
      },
      className,
      setAttributes,
    } = props;

    const setImage = ( img ) => setAttributes( {
      testimonialImgID: img.id,
      testimonialImgURL: img.url,
      testimonialImgAlt: img.alt,
    } );

    const removeImage = () => setAttributes( {
      testimonialImgID: null,
      testimonialImgURL: null,
      testimonialImgAlt: null,
    } );

    const ALLOWED_MEDIA_TYPES = [ 'image' ];
    const ACCEPT_MEDIA_TYPES = 'image/*';

    return (
      <div className={ classnames( className ) }>
        <BlockControls>
          {
            ! testimonialImgID ? (
              null
            ) : (
              <MediaReplaceFlow
                mediaId={ testimonialImgID }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                accept={ ACCEPT_MEDIA_TYPES }
                onSelect={ setImage }
              />
            )
          }
        </BlockControls>
        <RichText
          tagName="div"
          className="block-content"
          placeholder={ __( 'Testimonial Content', 'grayscale' ) }
          value={ testimonialContent }
          multiline="p"
          onChange={ ( content ) => setAttributes( {
            testimonialContent: content,
          } ) }
        />
        <div className="block-title">
          <p>
            <RichText
              value={ testimonialEndorser }
              onChange={ ( endorser ) => setAttributes( {
                testimonialEndorser: endorser,
              } ) }
              tagName="cite"
              placeholder={ __( 'Testimonial Endorser', 'grayscale' ) }
              keepPlaceholderOnFocus="true"
              multiline="false"
            />
          </p>
        </div>
        <MediaUploadCheck>
          {
            ! testimonialImgID ? (
              <figure className="block-image">
                <MediaPlaceholder
                  accept={ ACCEPT_MEDIA_TYPES }
                  allowedTypes={ ALLOWED_MEDIA_TYPES }
                  icon="format-image"
                  labels={ {
                    title: __( 'Image', 'grayscale' ),
                    instructions: __(
                      'Upload or select an image.',
                      'grayscale'
                    ),
                  } }
                  onSelect={ setImage }
                >
                </MediaPlaceholder>
              </figure>
            ) : (
              <MediaUpload
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                value={ testimonialImgID }
                onSelect={ setImage }
                render={ () => (
                  <figure
                    className="block-image"
                    style={ { position: 'relative' } }
                  >
                    <img
                      src={ testimonialImgURL }
                      alt={ testimonialImgAlt }
                    />
                    <Button
                      isSecondary="true"
                      onClick={ removeImage }
                      style={ { position: 'absolute', top: 8, right: 8 } }
                    >
                      { __( 'Remove', 'grayscale' ) }
                    </Button>
                  </figure>
                ) }
              />
            )
          }
        </MediaUploadCheck>
      </div>
    );
  },
  save: ( props ) => {
    const {
      testimonialContent,
      testimonialEndorser,
      testimonialImgID, testimonialImgURL, testimonialImgAlt,
    } = props.attributes;

    return (
      <div>
        <div className="block-content">
          <RichText.Content value={ testimonialContent } />
        </div>
        <div className="block-title">
          <p>
            <RichText.Content tagName="cite" value={ testimonialEndorser } />
          </p>
        </div>
        {
          ! testimonialImgID ? (
            null
          ) : (
            <figure className="block-image">
              <img
                src={ testimonialImgURL }
                alt={ testimonialImgAlt }
                className={ `wp-image-${ testimonialImgID }` }
              />
            </figure>
          )
        }
      </div>
    );
  },
} );
