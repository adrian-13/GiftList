document
  .getElementById("gift-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    console.log(`Checking name: ${name}`);

    // Request proof from the server
    try {
      const response = await fetch("/proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      console.log("Server response:", result);

      // Show result
      const resultDiv = document.getElementById("result");
      if (result.gift) {
        resultDiv.textContent = "You got a toy robot!";
      } else {
        resultDiv.textContent = "You are not on the list :(";
      }
    } catch (error) {
      console.error("Error checking name:", error);
    }
  });
