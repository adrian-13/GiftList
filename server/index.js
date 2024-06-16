const express = require("express");
const verifyProof = require("../utils/verifyProof");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { root: MERKLE_ROOT } = require("../utils/example");

const port = 1225;

const app = express();
app.use(express.json());

app.post("/gift", (req, res) => {
  const { name, proof } = req.body;

  const leaf = keccak256(Buffer.from(name));

  const isInTheList = verifyProof(
    proof,
    leaf,
    "d320bfb1e8ece8fcc1ac8993bce779b0653b59467f47aac2623d535ce686d2a9"
  );

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  console.log(`Merkle Root: ${MERKLE_ROOT}`);
});
