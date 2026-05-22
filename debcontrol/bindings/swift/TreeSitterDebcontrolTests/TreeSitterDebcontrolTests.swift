import XCTest
import SwiftTreeSitter
import TreeSitterDebcontrol

final class TreeSitterDebcontrolTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_debcontrol())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Debian Control grammar")
    }
}
