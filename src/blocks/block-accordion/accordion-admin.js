/**
 * External dependencies
 */
import classnames from 'classnames';
import slug from 'slug';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
	InnerBlocks,
	RichText,
	useBlockProps,
} = wp.blockEditor;
const {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/accordion', {
	apiVersion: 3,
	title: __( 'Accordion', 'grayscale' ),
	description: __(
		'Show information in a condensed way that can be expanded or collapsed.',
		'grayscale',
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
	edit: function Edit( props ) {
		const {
			attributes: {
				multiExpand,
				allowAllClosed,
			},
			setAttributes,
		} = props;
		const blockProps = useBlockProps( {
			className: 'accordion',
			'data-accordion': true,
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Settings', 'grayscale' ) }>
						<PanelRow>
							<ToggleControl
								label={ __( 'Multi-expand', 'grayscale' ) }
								checked={ multiExpand }
								onChange={ () => setAttributes( {
									multiExpand: ! multiExpand,
								} ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Allow all closed', 'grayscale' ) }
								checked={ allowAllClosed }
								onChange={ () => setAttributes( {
									allowAllClosed: ! allowAllClosed,
								} ) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<InnerBlocks allowedBlocks={ [ 'client/accordion-item' ] } />
				</div>
			</>
		);
	},
	save: ( props ) => {
		const {
			multiExpand,
			allowAllClosed,
		} = props.attributes;
		const blockProps = useBlockProps.save( {
			className: 'accordion',
			'data-accordion': true,
			'data-multi-expand': multiExpand ? 'true' : 'false',
			'data-allow-all-closed': allowAllClosed ? 'true' : 'false',
			'data-deep-link': 'true',
			'data-deep-link-smudge': 'true',
			'data-update-history': 'true',
		} );
		return (
			<ul { ...blockProps }>
				<InnerBlocks.Content />
			</ul>
		);
	},
} );

registerBlockType( 'client/accordion-item', {
	apiVersion: 3,
	title: __( 'Accordion Item', 'grayscale' ),
	description: __(
		'Content within the Accordion.',
		'grayscale',
	),
	category: 'common',
	icon: 'text',
	keywords: [],
	styles: [],
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.accordion-title',
		},
		isOpen: {
			type: 'boolean',
			default: false,
		},
		anchor: {
			type: 'string',
		},
	},
	variations: [],
	supports: {
		anchor: false,
		align: [],
		multiple: true,
	},
	parent: [ 'client/accordion' ],
	edit: function Edit( props ) {
		const {
			attributes: {
				title, isOpen, anchor,
			},
			setAttributes,
		} = props;
		const blockProps = useBlockProps( {
			className: classnames( 'accordion-item', 'is-active' ),
			'data-accordion-item': true,
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Item Settings', 'grayscale' ) }>
						<PanelRow>
							<ToggleControl
								label={ __( 'Open on load', 'grayscale' ) }
								checked={ isOpen }
								onChange={ () => setAttributes( {
									isOpen: ! isOpen,
								} ) }
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __( 'HTML Anchor', 'grayscale' ) }
								value={ anchor }
								onChange={ ( value ) => setAttributes( {
									anchor: value,
								} ) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<RichText
						className="accordion-title"
						value={ title }
						onChange={ ( value ) => setAttributes( {
							title: value,
						} ) }
						tagName="a"
						placeholder={ __( 'Accordion Title', 'grayscale' ) }
						keepPlaceholderOnFocus="true"
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
				</div>
			</>
		);
	},
	save: ( props ) => {
		const {
			title, isOpen, anchor,
		} = props.attributes;

		if ( ! title ) {
			return;
		}

		const blockProps = useBlockProps.save( {
			className: classnames(
				'accordion-item',
				{ 'is-active': isOpen },
			),
			'data-accordion-item': true,
		} );

		return (
			<li { ...blockProps }>
				<a
					href={ '#' + slug( anchor || title ) }
					className="accordion-title"
				>
					<RichText.Content value={ title } />
				</a>
				<div
					id={ slug( anchor || title ) }
					className="accordion-content"
					data-tab-content
				>
					<InnerBlocks.Content />
				</div>
			</li>
		);
	},
} );
