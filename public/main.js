//The user will enter a NBA player, click on the type of stat, team, and receive their stats. 
function init() {
    document.getElementById("search").value = ""
};

window.onload = init();

const teams = [
        {
            "id": 1,
            "name": "Hawks"
        },
        {
            "id": 2,
            "name": "Celtics"
        },
        {
            "id": 3,
            "name": "Nets"
        },
        {
            "id": 4,
            "name": "Hornets"
        },
        {
            "id": 5,
            "name": "Bulls"
        },
        {
            "id": 6,
            "name": "Cavaliers"
        },
        {
            "id": 7,
            "name": "Mavericks"
        },
        {
            "id": 8,
            "name": "Nuggets"
        },
        {
            "id": 9,
            "name": "Pistons"
        },
        {
            "id": 10,
            "name": "Warriors"
        },
        {
            "id": 11,
            "name": "Rockets"
        },
        {
            "id": 12,
            "name": "Pacers"
        },
        {
            "id": 13,
            "name": "Clippers"
        },
        {
            "id": 14,
            "name": "Lakers"
        },
        {
            "id": 15,
            "name": "Grizzlies"
        },
        {
            "id": 16,
            "name": "Heat"
        },
        {
            "id": 17,
            "name": "Bucks"
        },
        {
            "id": 18,
            "name": "Timberwolves"
        },
        {
            "id": 19,
            "name": "Pelicans"
        },
        {
            "id": 20,
            "name": "Knicks"
        },
        {
            "id": 21,
            "name": "Thunder"
        },
        {
            "id": 22,
            "name": "Magic"
        },
        {
            "id": 23,
            "name": "76ers"
        },
        {
            "id": 24,
            "name": "Suns"
        },
        {
            "id": 25,
            "name": "Trail Blazers"
        },
        {
            "id": 26,
            "name": "Kings"
        },
        {
            "id": 27,
            "name": "Spurs"
        },
        {
            "id": 28,
            "name": "Raptors"
        },
        {
            "id": 29,
            "name": "Jazz"
        },
        {
            "id": 30,
            "name": "Wizards"
        }
    ]

document.querySelector('button').addEventListener('click', apiRequest);

function apiRequest() {
    const player = document.querySelector('input').value;
    const season = document.querySelector('input[type="number"]').value;
    const stat = document.querySelector('#stats').value;
    const table = document.getElementById('table');

    console.log("about to run first fetch()");
    fetch(`https://www.balldontlie.io/api/v1/players/?search=${player}`)
        .then(res => res.json()) //parse response as JSON
        .then(data => {
            console.log("got first fetch() result");
            const object = data;
            const id = object.data[0].id;

            document.querySelector('h2').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`;
            document.querySelector('.team').innerText = data.data[0].team['full_name'];
            document.querySelector('.position').innerText = data.data[0].position;


            //nested fetches to send player id from one promise to another promise to get player stats
            console.log("about to run second fetch()");
            return fetch(`https://www.balldontlie.io/api/v1/stats?season[]=${season}&player_ids[]=${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log("got second fetch() result");
                    table.classList.remove('hidden')
                    table.innerHTML = ""
                    data.data.forEach(e => {
                        let date = e['game'].date.slice(0,10);
                        let selectedStat =  e[`${stat}`]
                        let row = table.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        cell1.innerHTML = date;
                        cell2.innerHTML = selectedStat;
                    })})
              

        }).catch(err => {
            console.log(`error ${err}`)
        });
    init();
    }

const table = document.getElementById("myTable");
