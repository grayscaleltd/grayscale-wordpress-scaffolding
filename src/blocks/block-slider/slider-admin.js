/**
 * External dependencies
 */
import classnames from 'classnames';
import { pick } from 'lodash-es';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  MediaPlaceholder,
  MediaUpload,
  MediaUploadCheck,
} = wp.blockEditor;
const {
  Button,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/slider', {
  title: __( 'Image Slider', 'grayscale' ),
  description: __(
    'Slideshow of images.',
    'grayscale'
  ),
  category: 'widgets',
  icon: 'image-flip-horizontal',
  keywords: [ __( 'carousel' ) ],
  styles: [],
  attributes: {
    sliderImages: {
      type: 'array',
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
        sliderImages,
      },
      className,
      setAttributes,
    } = props;

    const setImages = ( img ) => setAttributes( {
      sliderImages: img.map(
        ( image ) => {
          return pick( image, [
            'id',
            'url',
            'alt',
            'caption',
          ] );
        }
      ),
    } );

    const ALLOWED_MEDIA_TYPES = [ 'image' ];
    const ACCEPT_MEDIA_TYPES = 'image/*';

    return (
      <div className={ classnames( className ) }>
        <MediaUploadCheck>
          {
            ! sliderImages ? (
              <MediaPlaceholder
                accept={ ACCEPT_MEDIA_TYPES }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                icon="format-gallery"
                labels={ {
                  title: __( 'Image Slider', 'grayscale' ),
                  instructions: __( 'Upload or select images.', 'grayscale' ),
                } }
                multiple="true"
                onSelect={ setImages }
              >
              </MediaPlaceholder>
            ) : (
              <div className="components-placeholder">
                <MediaUpload
                  allowedTypes={ ALLOWED_MEDIA_TYPES }
                  multiple="true"
                  value={ sliderImages.map( ( image ) => image.id ) }
                  onSelect={ setImages }
                  gallery="true"
                  render={
                    ( { open } ) => (
                      <Button isSecondary="true" onClick={ open }>
                        { __( 'Edit Slider', 'grayscale' ) }
                      </Button>
                    )
                  }
                />
              </div>
            )
          }
        </MediaUploadCheck>
      </div>
    );
  },
  save: ( props ) => {
    const {
      sliderImages,
    } = props.attributes;

    return (
      <div>
        {
          ! sliderImages ? (
            null
          ) : (
            sliderImages.map( ( img ) => {
              return (
                <figure key={ 'random' + img.id } className="block-image">
                  <img
                    src={ img.url }
                    alt={ img.alt }
                    className={ `wp-image-${ img.id }` }
                  />
                  {
                    ( img.caption ) ? (
                      <figcaption>{ img.caption }</figcaption>
                    ) : null
                  }
                </figure>
              );
            } )
          )
        }
      </div>
    );
  },
} );
