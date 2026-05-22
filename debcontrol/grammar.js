/**
 * @file debian/control file
 * @author Grayson Wolf <grayson.wolf@canonical.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

import { controlFileRules } from "../common/grammar.js";

export default grammar({
  name: "debcontrol",

  extras: _ => [],

  rules: {
    ...controlFileRules,

    stanza: $ => repeat1(choice($.field, $.comment)),

    comment: _ => /#[^\n]*\n/,
  },
});
