//The user will enter a NBA player, click on the type of stat, team, and receive their stats. Default will be all stats?


document.querySelector('button').addEventListener('click', getStats)

function getStats() {
    let player = document.querySelector('input').value
    
    fetch(`https://www.balldontlie.io/api/v1/players/?search=${player}`)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
        console.log(data)
        document.querySelector('h2').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`
        document.querySelector('.team').innerText = data.data[0].team['full_name']
        document.querySelector('.position').innerText = data.data[0].position

//need to see how to do async/await for nested fetches to send player id from this fetch to another fetch for stats 
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

