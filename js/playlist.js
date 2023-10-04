const url = window.location.search;
const params = new URLSearchParams(url);
const id = params.get('id');

const listaCanciones = document.getElementById('listSongs');
const templateCard = document.getElementById('cardSongs').content;
const fragment = document.createDocumentFragment();

const infoplaylist = {};
const banerPlaylist = document.getElementById('cardInfo');



const cardPlayList = document.getElementById('cardSongs');
let playlistFound = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist()
    infoAlbum()
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

const newBanner = () => {
    const albumName = document.getElementById('albumTitle');
    const albumDescription = document.getElementById('albumDescription');
    const albumImage = document.getElementById('albumImage');
    albumName.textContent = infoplaylist.name;
    albumDescription.textContent = infoplaylist.description;
    albumImage.setAttribute('src', infoplaylist.images.items[0].sources[0].url || '');
}

const infoAlbum = async () => {
    const data = await fetch('./api/playlists.json');
    const play = await data.json();

    play.playlists.items.forEach(element => {
        const uriParts = element.data.uri.split(":");
        const elementId = uriParts[uriParts.length - 1];
        if (elementId === id) {
            const { name, description, images } = element.data;
            infoplaylist.name = name;
            infoplaylist.description = description;
            infoplaylist.images = images;
        }
    });
    //console.log('INFO DE PLAYLIST', infoplaylist);
    newBanner();
}