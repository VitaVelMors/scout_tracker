const ENV = "production";
const apiUrl = ENV == "dev" ? "http://localhost:3000" : "https://scout-tracker.onrender.com";

console.log("API:", apiUrl);

let den = document.getElementById("den")

fetch(`${apiUrl}/api/scouts`)
  .then(response => response.json())
  .then(data => {
      data.forEach(scout => {
          let scoutElement = document.createElement('button')
          console.log(scoutElement);
          scoutElement.classList.add("each-scout")
          scoutElement.style.backgroundImage = `url(${scout.image})`;
          scoutElement.style.backgroundSize = 'cover';
          scoutElement.style.backgroundRepeat = 'no-repeat';
          scoutElement.innerHTML = `${scout.name}`;
          den.appendChild(scoutElement);
      });            
  })

    let submit = document.getElementById('add-scout').addEventListener("click", event => {
      let name = document.getElementById("name").value;
      let age = document.getElementById("age").value;
      let image = document.getElementById("image").value;
      
      let scout = {
          "name": name,
          "age": age,
          "image": image
      }
      
      fetch(`${apiUrl}/api/scouts`, {
          method: 'POST',
          mode: "cors",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scout)
      })
      .then(response => {
          if(response.status == 201){
            let scoutElement = document.createElement('button')
            console.log(scoutElement);
            scoutElement.classList.add("each-scout")
            scoutElement.innerHTML = `${scout.name}`;
            den.appendChild(scoutElement);
          }else {
              alert("something went HORRIBLY WRONG!!!", response);
          }
      })
      .catch(error => console.error(error));
  
  })