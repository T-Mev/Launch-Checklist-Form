// Write your JavaScript code here!

document.addEventListener("DOMContentLoaded", function(event){

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event){
      event.preventDefault();

      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      let fuelReady = "";
      let cargoReady = "";
      let pilotReady = "";
      let copilotReady = "";

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         alert("Invalid entry:\nAll fields required!");
      }else if (!isNaN(pilotName.value)){
         alert("Invalid entry:\nEnter valid information for Pilot Name!");
      }else if (!isNaN(copilotName.value)){
         alert("Invalid entry:\nEnter valid information for Co-Pilot Name!");
      }else if (isNaN(fuelLevel.value)){
         alert("Invalid entry:\nEnter valid information for Fuel Level!");
      }else if (isNaN(cargoMass.value)){
         alert("Invalid entry:\nEnter valid information for Cargo Mass!");
      }

      if (isNaN(pilotName.value) && isNaN(copilotName.value) && !isNaN(fuelLevel.value) && !isNaN(cargoMass.value)){
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
         copilotStatus.innerHTML = `Co-Pilot ${copilotName.value} is ready for launch.`;
         pilotReady = "ready";
         copilotReady = "ready";
      }

      if (fuelLevel.value !== "" && fuelLevel.value < 10000){
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "red";
         launchStatus.innerHTML = `Shuttle not ready for launch.`;
         fuelStatus.innerHTML = `Not enough fuel for the journey!`;
      } else {
         fuelStatus.innerHTML = `Fuel level is high enough for launch.`;
         fuelReady = "ready";
      }

      if (cargoMass.value > 10000){
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "red";
         cargoStatus.innerHTML = `There is too much mass for the shuttle to take off!`;
         launchStatus.innerHTML = `Shuttle not ready for launch.`;
      } else {
         cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
         cargoReady = "ready";
      }

      if (pilotReady === "ready" && copilotReady === "ready" && fuelReady === "ready" && cargoReady === "ready"){
         faultyItems.style.visibility = "hidden";
         launchStatus.style.color = "green";
         launchStatus.innerHTML = `Shuttle is ready for launch!`;
      }

      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
         response.json().then(function(json){
            let randomIndex = Math.floor(Math.random() * json.length);
            let chosenPlanet = json[randomIndex];
            let missionTarget = document.getElementById("missionTarget");

            if (pilotReady === "ready" && copilotReady === "ready" && fuelReady === "ready" && cargoReady === "ready"){
               missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${chosenPlanet.name}</li>
                  <li>Diameter: ${chosenPlanet.diameter}</li>
                  <li>Star: ${chosenPlanet.star}</li>
                  <li>Distance from Earth: ${chosenPlanet.distance}</li>
                  <li>Number of Moons: ${chosenPlanet.moons}</li>
               </ol>
               <img src="${chosenPlanet.image}">
               `
            }
         });
      });
   });
});
