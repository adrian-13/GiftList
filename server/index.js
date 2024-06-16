const express = require("express");
const verifyProof = require("../utils/verifyProof");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { root: MERKLE_ROOT } = require("../utils/example");
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList.json");

const port = 1225;
const app = express();

app.use(express.json());
app.use(express.static("client")); // ensure this line is included to serve static files

app.post("/proof", (req, res) => {
  const { name } = req.body;

  console.log(`Received request to check name: ${name}`);

  const leaves = niceList.map((name) => keccak256(Buffer.from(name)));
  const tree = new MerkleTree(leaves);
  const index = niceList.indexOf(name);

  if (index === -1) {
    console.log("Name not found in the list.");
    return res.json({ gift: false });
  }

  const proof = tree.getProof(index);
  const leaf = keccak256(Buffer.from(name));

  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);

  console.log(`Proof verification result for ${name}: ${isInTheList}`);

  if (isInTheList) {
    res.json({ gift: true });
  } else {
    res.json({ gift: false });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  console.log(`Merkle Root: ${MERKLE_ROOT}`);
});
