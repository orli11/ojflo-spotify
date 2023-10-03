const playList = document.getElementById('playlist');
const templateCard = document.getElementById('cardPlayList').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist();
})

const fetchPlaylist = async() => {
    const data = await fetch('/api/playlists.json');
    const play = await data.json();
    creaTarjetas(play.playlists.items);
}

const creaTarjetas = (cards) => {
    cards.forEach((item) => {
        templateCard.querySelector('h5').textContent = item.data.name;
        templateCard.querySelector('p').textContent = item.data.description.length > 40 ? item.data.description.substring(0, 40) : item.data.description;
        templateCard.querySelector('img').setAttribute('src', item.data.images.items[0].sources[0].url || '')
        templateCard.querySelector('.greenCircle > i').dataset.id = item.data.uri;
        const datos = item.data.uri.split(':');
        templateCard.querySelector('.card-title').dataset.id = datos[2];

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    playList.appendChild(fragment)
}

const openSpotify = (e) => {
    window.location.replace(`https://open.spotify.com/embed?uri${e.target.dataset.id}`)
}

const openPlaylist = (e) => {
    window.location.replace(`/playlist.html?id=${e.target.dataset.id}`)
}