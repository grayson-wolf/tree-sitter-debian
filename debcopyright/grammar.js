/**
 * @file debian/copyright file
 * @author Grayson Wolf <grayson.wolf@canonical.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

import { controlFileRules } from "../common/grammar.js";

export default grammar({
  name: "debcopyright",

  extras: _ => [],

  rules: {
    ...controlFileRules,

    stanza: $ => repeat1($.field),
  },
});
