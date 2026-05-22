/**
 * Shared rules for Debian control file format grammars.
 *
 * Both debian/control and debian/copyright use the same underlying
 * syntax (RFC822-style stanzas with fields and continuation lines).
 * @license MIT
 */

export const controlFileRules = {
  source_file: $ => seq(
    repeat($.blank_line),
    $.stanza,
    repeat(seq(repeat1($.blank_line), $.stanza)),
    repeat($.blank_line),
  ),

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

  blank_line: _ => /\n/,
};
