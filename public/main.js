//The user will enter a NBA player, click on the type of stat, team, and receive their stats. Default will be all stats?

document.querySelector('button').addEventListener('click', apiRequest)

function apiRequest() {
    var player = document.querySelector('input').value;
    var season = document.querySelector('input[type="number"]').value;
    var id;
    
    fetch(`https://www.balldontlie.io/api/v1/players/?search=${player}`)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
        object = data;
        id = object.data[0].id;
        
        document.querySelector('h2').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`
        document.querySelector('.team').innerText = data.data[0].team['full_name']
        document.querySelector('.position').innerText = data.data[0].position

        
//nested fetches to send player id from one promise to another promise to get player stats 
    })
    .then (async data => {
        await new Promise(data => {
            return fetch (`https://balldontlie.io/api/v1/stats?season[]=${season}&player_ids[]=${id}`)
            .then(response => response.json())
            .then(data => {
                array[index] = {...e, ...data};
                console.log(data)
            })
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


// function apiRequest() {
//     let player = document.querySelector('input[type="text"]').value;
//     let season = document.querySelector('input[type="number"]').value;
//     try{
//         const response = fetch(`https://www.balldontlie.io/api/v1/players/?search=${player}`);
//         const data = async response.json();
//         let object = data;
//         var id = object.data[0].id;
        

//         document.querySelector('h2').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`;
//         document.querySelector('.team').innerText = data.data[0].team['full_name'];
//         document.querySelector('.position').innerText = data.data[0].position;

//         // const stats = response.then (`https://balldontlie.io/api/v1/stats?season[]=${season}&player_ids[]=${id}`);
       
//         // console.log(stats);
    
// } catch(error){
//         console.log(`error`);
//     }

// }

