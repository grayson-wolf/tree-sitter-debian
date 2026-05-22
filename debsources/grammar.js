/**
 * @file debian/sources file
 * @author Grayson Wolf <grayson.wolf@canonical.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "debsources",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
