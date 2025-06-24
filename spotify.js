const backbtn= document.getElementById('backbtn')
const playPause= document.getElementById('pause/play')
const nextbtn= document.getElementById('frontbtn')
let index=0
let playlistTracks=[]
let playlistLength=0
const pitchClasses={0:'C', 
    1: 'C sharp/ D flat', 
    2: 'D', 
    3: 'D sharp/ E flat', 
    4:'E', 
    5:'F', 
    6:'F sharp/ G flat', 
    7:'G', 
    8:'G sharp/ A flat', 
    9:'A', 
    10: 'A sharp/ B flat', 
    11: 'B'
}

const myAnalysis= {
    0: 'Ragam(s): Karaharapriya and Reetigowlai (janya Karaharapriya)',
    1: 'Ragam(s): Thodi, Mukhari (janya Karaharapriya), Kanakangi',
    2: 'Ragam(s): Sindhubhairavi (janya Hanumatodi)',
    3: 'Ragam(s): Abheri (janya Karaharapriya)',
    4: 'Ragam(s): Brindavani Saranga (janya Karaharapriya)',
}


async function getAccessToken() {
    const clientId = '90286fdf5c9a464cb67de2e70c4baf4f';
    const clientSecret = '09d40cb9a1ff487b989ed85f5d61fd8a';
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });
  
    const data = await result.json();
    return data.access_token;
  }
  async function getPlaylistTracks(playlistId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    return data.items;
}
async function getAudioFeatures(trackId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    return {
        nrg: data.energy,
        valence: data.valence,
        songKey: data.key
      };
}
async function displayTrack(index) {
    const accessToken = await getAccessToken();
    const track = playlistTracks[index].track;
    const trackId = track.id;
    const trackName = track.name;
    const trackImg = track.album.images[0].url

    let info=''

    const audioFeatures= await getAudioFeatures(trackId, accessToken);

    songname= document.getElementById('songName')
    songname.innerHTML= `${trackName}`
    const songkey= audioFeatures.songKey
    const energy = audioFeatures.nrg;
    const valence = audioFeatures.valence;

    const spotify= document.getElementById('spotify')
    spotify.innerHTML=
    
    `
    <div class="playlistsari"></div>
    <div class="playlistsari" id="spotify"></div>
    <h4 class="palanquin-dark-bold">Spotify's Analysis</h4>
    <h3 class="palanquin-dark-regular">Key: ${pitchClasses[songkey]}</h3>
    <h3 class="palanquin-dark-regular">Energy: ${energy}</h3>
    <h3 class="palanquin-dark-regular">Valence (Positiveness): ${valence} </h3>
    <div class="playlistsari"></div>
    <div class="playlistsari" id="spotify"></div>
    `
    const albumimg= document.getElementById('playlistimg')
    albumimg.innerHTML= `<img src= ${trackImg}`
    albumimg.style.backgroundImage = `url(${trackImg})`;
albumimg.style.backgroundSize = 'cover';
albumimg.style.backgroundPosition = 'center';
    const myanalysis= document.getElementById('myAnalysis')
    if (index==0){
        info= myAnalysis[0]
    }
    else if (index==1){
        info= myAnalysis[1]
    }
    else if (index==2){
        info= myAnalysis[2]
    }
    else if (index==3){
        info= myAnalysis[3]
    }
    else if (index==4){
        info= myAnalysis[4]
    }
    myanalysis.innerHTML=
    `
    <div class="playlistsari"></div>
    <div class="playlistsari"></div>
    <h4 class="palanquin-dark-bold">My Analysis</h4>
    <h3 class="palanquin-dark-regular">${info}</h3>
    <div class="playlistsari"></div>
    <div class="playlistsari"></div>
    `


}
async function analyzePlaylist(playlistId) {
    const accessToken = await getAccessToken();
    playlistTracks = await getPlaylistTracks(playlistId, accessToken);
    console.log(playlistTracks)
    playlistLength= playlistTracks.length
    await displayTrack(index);
}

backbtn.addEventListener('click', ()=>{
    index=(index - 1+ playlistLength) % playlistLength
    displayTrack(index);
})
nextbtn.addEventListener('click', ()=>{
    index=(index + 1) % playlistLength
    displayTrack(index);
})

window.onload = () => {
    const playlistId = '5o2oFm9aKVAJlVOEaBeDuW';
    analyzePlaylist(playlistId);
  };