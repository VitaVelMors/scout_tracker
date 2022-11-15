const apiURL = "https://scout-tracker.onrender.com";
console.log("API:", apiURL);

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




// function getData(data){
//   prevNext(data);
//   if (data.results){
//     $.each(data.results, function(index, value){
//       $(`denList`).append(
//         $(`<button id = 'childBtn' class = 'btn'>${value.name}</button>`).on('click', function (e){
          
//           $(`#footer`).empty()
//           $(`#results`).append(
//             $(`<h2 class='header'>${scout.name}</h2>`))
//             $.each(value, function(key, value){
//               $(`#results`).append(
//               $(`<ul id = "link-list"></ul>`).append(
//                 $(`<li class = "key">${key}: ${value}</li>`)
//               )
//             )
//           })
//         })
//       )
//     })
//   }
// }

// // function prevNext(data){
// //   if ($(`#results`) != ''){
// //     if(data.previous){
// //       $(`#footer`).append(
// //         $(`<button id = 'prevNext' class='btn'> << Previous </button>`).on('click', function(e){
// //           $(`#results`).empty()
// //           $(`#footer`).empty()
// //           $.get(data.previous, (data) =>{
// //             console.log(data)    
// //             getData(data);
// //           })
// //         })
// //       )
// //     }
// //     if(data.next){
// //       $(`#footer`).append(
// //         $(`<button id = 'prevNext' class='btn'> Next >> </button>`).on('click', function(e){
// //           $(`#results`).empty()
// //           $(`#footer`).empty()
// //           $.get(data.next, (data) =>{
// //             console.log(data)    
// //             getData(data);
// //           })
// //         })
// //       )
// //     }
// //   }
// // }


// // $.get(`https://swapi.dev/api/`, (data) => {
// //   searchBtns(data);
// // })