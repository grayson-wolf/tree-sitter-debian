package tree_sitter_debcontrol_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_debcontrol "github.com/tree-sitter/tree-sitter-debcontrol/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_debcontrol.Language())
	if language == nil {
		t.Errorf("Error loading Debian Control grammar")
	}
}
