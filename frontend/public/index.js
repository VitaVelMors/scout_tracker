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
          scoutElement.innerHTML = `${scout.name}`;
          den.appendChild(scoutElement);
      });            
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