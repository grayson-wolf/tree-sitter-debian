/**
 * @file debian/changelog file
 * @author Grayson Wolf <grayson.wolf@canonical.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// Debian supported versions (current + upcoming)
const DEBIAN_SUPPORTED = [
  'oldstable', 'stable', 'testing', 'unstable', 'experimental', 'sid', 'rc-buggy',
  'bookworm', 'trixie', 'forky', 'duke',
];

// Ubuntu supported versions
const UBUNTU_SUPPORTED = [
  'jammy', 'noble', 'questing', 'resolute', 'stonking', 'tenacious'
  'devel',
];

// Historic Debian versions
const DEBIAN_UNSUPPORTED = [
  'buzz', 'rex', 'bo', 'hamm', 'slink', 'potato',
  'woody', 'sarge', 'etch', 'lenny', 'squeeze', 'wheezy',
  'jessie', 'stretch', 'buster', 'bullseye',
];

// Historic Ubuntu versions
const UBUNTU_UNSUPPORTED = [
  'warty', 'hoary', 'breezy', 'dapper', 'edgy', 'feisty',
  'gutsy', 'hardy', 'intrepid', 'jaunty', 'karmic', 'lucid',
  'maverick', 'natty', 'oneiric', 'precise', 'quantal', 'raring', 'saucy',
  'trusty', 'utopic', 'vivid', 'wily', 'xenial', 'yakkety', 'zesty',
  'artful', 'bionic', 'cosmic', 'disco', 'eoan', 'focal', 'groovy',
  'hirsute', 'impish', 'kinetic', 'lunar', 'mantic', 'oracular',
  'plucky',
];

const SUPPORTED = [...DEBIAN_SUPPORTED, ...UBUNTU_SUPPORTED];
const UNSUPPORTED = [...DEBIAN_UNSUPPORTED, ...UBUNTU_UNSUPPORTED];

// Ubuntu pockets: -updates, -security, -proposed, -backports
function distributionPattern(versions) {
  const alt = versions.join('|');
  return new RegExp(`(${alt})(-updates|-security|-proposed|-backports)?`);
}

export default grammar({
  name: "debchangelog",

  extras: _ => [],

  rules: {
    source_file: $ => seq(
      repeat(/\n/),
      repeat(choice($.entry, $.comment)),
    ),

    entry: $ => seq(
      $.header_line,
      repeat(choice($.change_line, $.blank_line)),
      $.footer_line,
      optional(/\n/),
    ),

    header_line: $ => seq(
      $.source_name,
      ' (',
      $.version,
      ') ',
      $.distributions,
      '; ',
      $.metadata,
      /\n/,
    ),

    source_name: _ => /[a-z0-9][a-z0-9.+\-]+/,

    version: _ => /[^\n)]+/,

    distributions: $ => seq(
      $._distribution,
      repeat(seq(' ', $._distribution)),
    ),

    _distribution: $ => choice(
      $.supported_distribution,
      $.unsupported_distribution,
      $.other_distribution,
    ),

    supported_distribution: _ => distributionPattern(SUPPORTED),

    unsupported_distribution: _ => distributionPattern(UNSUPPORTED),

    other_distribution: _ => /UNRELEASED|[a-zA-Z][-a-zA-Z0-9]*/,

    metadata: $ => seq(
      $.key_value_pair,
      repeat(seq(', ', $.key_value_pair)),
    ),

    key_value_pair: $ => seq(
      $.metadata_key,
      '=',
      $.metadata_value,
    ),

    metadata_key: _ => /[a-zA-Z][-a-zA-Z0-9]*/,

    metadata_value: _ => /[^,\n]+/,

    change_line: $ => seq(
      /  /,
      optional($._change_body),
      /\n/,
    ),

    _change_body: $ => repeat1(choice(
      $.closes,
      $.launchpad_bug,
      $._change_text,
    )),

    closes: _ => token(prec(1, /[Cc]loses:\s*(?:bug)?#?\s*\d+(?:,\s*(?:bug)?#?\s*\d+)*/)),

    launchpad_bug: _ => token(prec(1, /LP:\s*#\d+(?:,\s*#\d+)*/)),

    _change_text: _ => /[^\n(CcLl]+|[(CcLl]/,

    footer_line: $ => seq(
      ' -- ',
      $.maintainer,
      '  ',
      $.date,
      /\n/,
    ),

    maintainer: _ => /[^<]+<[^>]+>/,

    date: _ => /[^\n]+/,

    comment: _ => /#[^\n]*\n/,

    blank_line: _ => /\n/,
  },
});
