/**
 * @file debian/control file
 * @author Grayson Wolf <grayson.wolf@canonical.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "debcontrol",

  extras: _ => [],

  rules: {
    source_file: $ => seq(
      repeat($.blank_line),
      $.stanza,
      repeat(seq(repeat1($.blank_line), $.stanza)),
      repeat($.blank_line),
    ),

    stanza: $ => repeat1(choice($.field, $.comment)),

    field: $ => seq(
      $.field_name,
      ':',
      optional($.field_value),
      /\n/,
      repeat($.continuation_line),
    ),

    field_name: _ => /[!-9;-~][!-9;-~]*/,

    field_value: _ => /[^\n]+/,

    continuation_line: _ => /[ \t][^\n]*\n/,

    comment: _ => /#[^\n]*\n/,

    blank_line: _ => /\n/,
  },
});
