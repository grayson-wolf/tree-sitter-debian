import XCTest
import SwiftTreeSitter
import TreeSitterDebsources

final class TreeSitterDebsourcesTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_debsources())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Debian Sources grammar")
    }
}
