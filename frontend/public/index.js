
const apiURL = "https://scout-tracker.onrender.com";

console.log("API:", apiURL);

let denList = document.getElementById("den")

fetch(`${apiUrl}/api/scouts`)
    .then(response => response.json())
    .then(data => {
        data.forEach(scout => {
            var scoutElement = document.createElement('li');
            console.log(scoutElement);
            scoutElement.innerHTML = `${scout.name} - age ${scout.age}`;
            den.appendChild(scoutElement);
        });
    });

    var submit = document.getElementById('add-scout').addEventListener("click", event => {
      let name = document.getElementById("name").value;
      let age = document.getElementById("age").value;
      
      let scout = {
          "name": name,
          "age": age
      }
      
      fetch(`${apiUrl}/api/scouts`, {
          method: 'POST',
          mode: "cors",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scout)
      })
      .then(response => {
          if(response.status == 201){
              var scoutElement = document.createElement(`<button id = 'childBtn' class = 'scoutbtn'>${scout.name}</button>`);
              // scoutElement.innerHTML = `${scout.name} - age ${scout.age}`;
              den.appendChild(scoutElement);
          }else {
              alert("something went HORRIBLY WRONG!!!", response);
          }
      })
      .catch(error => console.error(error));
  
  })