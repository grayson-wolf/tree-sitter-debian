/**
 * @file DEB822-style sources file (*.sources)
 * @author Grayson Wolf <grayson.wolf@canonical.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

import { controlFileRules } from "../common/grammar.js";

export default grammar({
  name: "debsources",

  extras: _ => [],

  rules: {
    ...controlFileRules,

    stanza: $ => repeat1(choice($.field, $.comment)),

    comment: _ => /#[^\n]*\n/,
  },
});
