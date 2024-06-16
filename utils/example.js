const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList.json");
const verifyProof = require("../utils/verifyProof");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { bytesToHex } = require("ethereum-cryptography/utils");

// create the merkle tree for the whole nice list
const leaves = niceList.map((name) => keccak256(Buffer.from(name)));
const merkleTree = new MerkleTree(leaves);

// get the root
const root = merkleTree.getRoot();

console.log(`Merkle Root: ${root}`);

// find the proof that a specific name is in the list
const name = "Sidney Kertzmann";
const index = niceList.findIndex((n) => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
const leaf = keccak256(Buffer.from(name));
console.log(verifyProof(proof, leaf, root)); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?

module.exports = { root, proof };
