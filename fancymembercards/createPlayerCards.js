// global variable thingy fr
let players = [];
const membersContainer = document.querySelector('.members');
let displayMode = 'name'; // Default to displaying name


// function that makea da card 
function renderPlayerCards(players) {
    membersContainer.innerHTML = '';    // needed for repainting the cards when sorting

    players.forEach(player => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        memberDiv.style.backgroundImage = `url(${player.faust}`;
        if (player.name == "Razikof" || player.name == "debuggyo") {
            memberDiv.setAttribute('onclick', "location.href='faust/faust.html'")
        }

        // TODO: don't use HTML in the JS, but create and set the elements directly with JS.
        const playerCard = `
            <img class="img player-skin" src="https://starlightskins.lunareclipse.studio/render/dungeons/${player.name}/full" height="150" alt="${player.name} body">
            <div class="memberinfo">
                <p class="name"><img class="img" src="https://starlightskins.lunareclipse.studio/render/pixel/${player.name}/face" height="30" alt="${player.name} body">${player.name}</p>
                <p><b>Rank:</b> ${player.rank}</p>
                <p><b>Current Town:</b> ${player.town}</p>
                <p><b>Discord:</b> ${player.discord}</p>
                <p><b>Nicknames:</b> ${player.nicknames}</p>
                <p><b>Pronouns:</b> ${player.pronouns}</p>
            </div>
        `;

        memberDiv.innerHTML = playerCard;
        memberDiv.id = player.gamertag;
        membersContainer.appendChild(memberDiv);
    });
}

fetch('fancymembercards/players.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
        renderPlayerCards(players);
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });

function sortByNations(players) {
    return [...players].sort((a, b) => {
        const nationA = a.nations[0] || '';
        const nationB = b.nations[0] || '';
        const nationComparison = nationA.localeCompare(nationB);

        // if nations are the same, compare by names
        if (nationComparison === 0) {
            return a.name.localeCompare(b.name);
        }
        return nationComparison;
    });
}

/*
NOTE:
This will not work locally because of CORS. Start Chrome from PowerShell with the following command to disable web security.
Start-Process "chrome.exe" -ArgumentList "--user-data-dir=`"C:\Chrome dev session`" --disable-web-security" 

TODO:
Cache player skins locally as calling an API every time is slow, and may be rate limited
*/
