const { patchScout, patchDate } = require("../../backend/app");

const ENV = "production";
const apiUrl = ENV == "dev" ? "http://localhost:3000" : "https://scout-tracker.onrender.com";

console.log("API:", apiUrl);

let den = document.getElementById("den")
let results = document.getElementById("results")

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

    let findScout = document.getElementById('search-scout').addEventListener("click", event => {
    let findName = document.getElementById("find").value;
    results.style.display = "inline";
    den.style.display = "none";
    getScout(`${findName}`)
    .then(data => {
      let scoutImg = document.createElement('div');
        scoutImg.style.backgroundImage = `url(${data.image})`;
        scoutImg.style.backgroundSize = 'cover';
        scoutImg.style.backgroundRepeat = 'no-repeat';
        let scoutHead = document.createElement('h2');
        scoutHead.innerHTML = `${data.name}, ${data.age}`;
        results.appendChild(scoutImg, scoutHead);
        });
    fetch(`${apiUrl}/api/achievements`)
      .then(response =>response.json())
      .then(data=> {
        data.forEach(element => {
          let achName = document.createElement('div')
          achName.innerHTML = `${element.ach_name}`;
          let compDate = document.createElement(`input type = "text"`)
          compDate.innerHTML = `${element.comp_date}`;
          results.appendChild(achName, compDate)
          let submitBtn = document.createElement(`button type = "button" class = "scoutbtn"`)
          submitBtn.addEventListener("click", (event) => {
          patchDate(`'', compDate.value, ${data.scout_id}`)  
          })
          results.appendChild(submitBtn)
      })
      let deleteBtn = document.createElement(`button class = "scoutbtn"`);
      results.appendChild(deleteBtn)
      deleteBtn.addEventListener("click", (event) => {
        deleteScout(`${data.name}`)
      })
        })
      })

  
  // .then(scoutElement.addEventListener("click", event =>{
  //     den.empty();
  //     // fetch(`${apiUrl}/api/scouts/:id`)
  //     den.appendChild(`<h2>${scout.name}, ${scout.age}, ${scout.scout_id}</h2>`, 
  //     fetch(`${apiUrl}/api/achievements`)
  //       .then(response => response.json())
  //       .then(data => {
  //         data.forEach(ach => {
  //           console.log(ach)
              // let achElement = document.createElement(`<table>
              //                                         <tr>
              //                                         <th>ach_id</th>
              //                                         <th>ach_name</th>
              //                                         <th>comp_date</th>
              //                                         </tr>
              //                                         <tr>
              //                                         <td>ach.ach_id[0]</td>
              //                                         <td>ach.ach_name[0]</td>
              //                                         <td>ach.comp_date[0]</td>`);
              // console.log(achElement);
  //         })

  //   })
  //   )
  // }))



    let submit = document.getElementById('add-scout').addEventListener("click", event => {
      let name = document.getElementById("name").value;
      let age = document.getElementById("age").value;
      let image = document.getElementById("image").value
      
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
            scoutElement.style.backgroundImage = `url(${scout.image})`;
            scoutElement.style.backgroundSize = 'cover';
            scoutElement.style.backgroundRepeat = 'no-repeat';
            scoutElement.innerHTML = `${scout.name}`;
            den.appendChild(scoutElement);
          }else {
              alert("something went HORRIBLY WRONG!!!", response);
          }
      })
      .catch(error => console.error(error));
  
  })