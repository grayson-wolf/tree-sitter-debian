import XCTest
import SwiftTreeSitter
import TreeSitterDebcopyright

final class TreeSitterDebcopyrightTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_debcopyright())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Debian Copyright grammar")
    }
}
