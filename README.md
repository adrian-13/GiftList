# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:
- Client
- Server
- Utils

## About the Project
This project demonstrates the use of Merkle Trees for efficient and secure data verification. We are building an application where a client needs to prove to the server that a particular name is on a predefined "nice list" to receive a gift. Instead of storing the entire list on the server, we use a Merkle Tree to store a single root hash, making the verification process both efficient and secure. Additionally, we have added a simple user interface to make it easier for users to check if they are on the "nice list".

## How It Works
### 1. Client Side (Prover):
- Loads the niceList.json.
- Creates a Merkle Tree from the list.
- Generates a proof for a specific name.
- Sends the name and proof to the server.

### 2.Server Side (Verifier):
- Receives the name and proof from the client.
- Verifies the proof using the Merkle root.
- Responds with a message indicating whether the name is on the list or not.

### 3. Merkle Tree and Proof Verification:
- The Merkle Tree is created using the keccak256 hash of each name.
- The proof is a set of hashes required to prove a name is part of the Merkle root.
- Verification involves hashing the name and the proof to reconstruct the root.
- This approach ensures that only names on the niceList can receive a gift, and the server doesn't need to store the entire list, just the Merkle root.

## User Interface

We have added a simple user interface to make it easier for users to check if they are on the "nice list". Users can enter their name into a form on the web page and click "Check" to see if they are on the list and eligible for a gift.

### How to Access the User Interface:

### 1. Run the Server:
- Ensure you are in the top-level directory and run:  
`node server/index.js`

### 2. Open the Web Interface:
- Open your browser and navigate to:  
`http://localhost:1225`

### 3. Check Your Name:
- Enter your name into the form and click "Check" to see if you are on the list.

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.
