package tree_sitter_debchangelog_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_debchangelog "github.com/tree-sitter/tree-sitter-debchangelog/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_debchangelog.Language())
	if language == nil {
		t.Errorf("Error loading Debian Changelog grammar")
	}
}
