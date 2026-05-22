import XCTest
import SwiftTreeSitter
import TreeSitterDebchangelog

final class TreeSitterDebchangelogTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_debchangelog())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Debian Changelog grammar")
    }
}
