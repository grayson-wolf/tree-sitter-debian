package tree_sitter_debsources_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_debsources "github.com/tree-sitter/tree-sitter-debsources/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_debsources.Language())
	if language == nil {
		t.Errorf("Error loading Debian Sources grammar")
	}
}
