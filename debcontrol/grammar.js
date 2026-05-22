/**
 * @file debian/control file
 * @author Grayson Wolf <grayson.wolf@canonical.control>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "debcontrol",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
