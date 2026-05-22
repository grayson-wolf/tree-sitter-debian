package tree_sitter_debcopyright_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_debcopyright "github.com/tree-sitter/tree-sitter-debcopyright/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_debcopyright.Language())
	if language == nil {
		t.Errorf("Error loading Debian Copyright grammar")
	}
}
