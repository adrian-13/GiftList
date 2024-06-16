const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const { keccak256 } = require("ethereum-cryptography/keccak");

const serverUrl = "http://localhost:1225";

async function main() {
  const name = "Sidney Kertzmann";

  const leaves = niceList.map((name) => keccak256(Buffer.from(name)));
  const tree = new MerkleTree(leaves);

  const index = niceList.indexOf(name);
  if (index === -1) {
    console.log("Name is not on the list.");
    return;
  }

  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
