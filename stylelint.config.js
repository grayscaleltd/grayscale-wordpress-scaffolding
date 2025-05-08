import {propertyGroups} from 'stylelint-config-clean-order';

export default {
  'extends': [
    'stylelint-config-sass-guidelines',
    'stylelint-config-standard-scss',
  ],
  'rules': {
    'at-rule-empty-line-before': null,
    'custom-property-pattern': null,
    'max-nesting-depth': 4,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'selector-max-compound-selectors': 4,
    'selector-no-qualifying-type': [
      true,
      {
        'ignore': ['attribute'],
        'severity': 'warning',
      },
    ],
    'scss/comment-no-empty': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    '@stylistic/selector-list-comma-newline-after': null,
  },
  'overrides': [
    {
      'files': [
        'src/blocks/**/*.scss',
        'src/scss/*.scss',
        'src/scss/admin/*.scss',
        'src/scss/core/*.scss',
        'src/scss/wordpress/_article.scss',
        'src/scss/wordpress/_colors.scss',
        'src/scss/wordpress/_comment.scss',
        'src/scss/wordpress/_fonts.scss',
        'src/scss/wordpress/_gform.scss',
      ],
      'extends': [
        'stylelint-config-clean-order',
      ],
      'rules': {
        'order/properties-order': [
          propertyGroups.map((properties) => ({
            noEmptyLineBetween: true,
            emptyLineBefore: 'never',
            properties,
          })),
          {
            severity: 'warning',
            unspecified: 'bottomAlphabetical',
          },
        ],
      },
    },
    {
      'files': ['src/scss/wordpress/*.scss'],
      'rules': {
        'alpha-value-notation': null,
        'comment-empty-line-before': null,
        'comment-whitespace-inside': null,
        'declaration-block-no-redundant-longhand-properties': [
          true,
          {
            'ignoreShorthands': ['inset', 'margin', 'margin-inline'],
          },
        ],
        'declaration-empty-line-before': null,
        'declaration-property-value-disallowed-list': null,
        'max-nesting-depth': null,
        'rule-empty-line-before': null,
        'selector-max-id': null,
        'selector-no-qualifying-type': null,
        'selector-not-notation': null,
        'scss/dollar-variable-pattern': null,
      },
    },
  ],
};
