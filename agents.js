let displayRandomAgentGlobal;

window.onload = function() {
  const api_url = "https://valorant-api.com/v1/agents";

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 200) {
      return data.data;
    } else {
      console.error("Error fetching data. Response status: " + data.status);
      return [];
    }
  }

  const nameElement = document.getElementById("Name");
  const descriptionElement = document.getElementById("description");
  const imageElement = document.getElementById("Image");

  async function displayRandomAgent() {
    const agents = await getData(api_url + "?language=en-US&isPlayableCharacter=true");
    if (agents.length > 0) {
      const randomIndex = Math.floor(Math.random() * agents.length);
      const randomAgent = agents[randomIndex];

      console.log("Name: " + randomAgent.displayName);
      console.log("Description: " + randomAgent.description);
      console.log("Image URL: " + randomAgent.displayIcon);

      if (nameElement) {
        nameElement.innerHTML = randomAgent.displayName;
      }
      if (descriptionElement) {
        descriptionElement.innerHTML = randomAgent.description;
      }
      if (imageElement) {
        imageElement.src = randomAgent.displayIcon;
      }
    } else {
      console.log("No agents data found.");
    }
  }

  displayRandomAgentGlobal = displayRandomAgent;
};
