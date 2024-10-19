// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerifier {
    struct Document {
        string docHash;
        address issuer;
        uint256 timestamp;
    }

    mapping(string => Document) public documents;

    event DocumentAdded(string docHash, address indexed issuer, uint256 timestamp);

    function addDocument(string memory _docHash) public {
        require(bytes(documents[_docHash].docHash).length == 0, "Document already exists");

        documents[_docHash] = Document({
            docHash: _docHash,
            issuer: msg.sender,
            timestamp: block.timestamp
        });

        emit DocumentAdded(_docHash, msg.sender, block.timestamp);
    }

    function verifyDocument(string memory _docHash) public view returns (bool, address, uint256) {
        Document memory doc = documents[_docHash];

        if (bytes(doc.docHash).length == 0) {
            return (false, address(0), 0);
        } else {
            return (true, doc.issuer, doc.timestamp);
        }
    }
}
