const url = window.location.search;
const params = new URLSearchParams(url);
const id = params.get('id');

const listaCanciones = document.getElementById('listSongs');
const templateCard = document.getElementById('cardSongs').content;
const fragment = document.createDocumentFragment();
const banerPlaylist = document.getElementById('cardInfo');



const cardPlayList = document.getElementById('cardSongs');
let playlistFound = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist()
});

const fetchPlaylist = async() => {
    const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bfba836c5fmsh3192c29afd71d13p170e42jsn69998f37e523',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
};
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        printSongs(result.items);
    } catch (error) {
        console.error(error);
    }
}

const printSongs = (result) => {
    
    result.forEach(canciones => {
        templateCard.querySelector('h5').textContent = canciones.track.name;
        templateCard.querySelector('p').textContent = canciones.track.artists.map(artist => artist.name).join(',\n');
        templateCard.querySelector('#duration_ms').textContent = `Duración: ${(canciones.track.duration_ms / 60000).toFixed(2)}`;
        templateCard.querySelector('img').setAttribute('src', canciones.track.album.images[2].url)
        
        
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    listaCanciones.appendChild(fragment);
}