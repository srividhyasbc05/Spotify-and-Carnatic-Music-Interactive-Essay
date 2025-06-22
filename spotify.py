import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json

# Replace these with your actual credentials from https://developer.spotify.com/dashboard
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id='90286fdf5c9a464cb67de2e70c4baf4f',
    client_secret='09d40cb9a1ff487b989ed85f5d61fd8a'
))
playlist_url = '5o2oFm9aKVAJlVOEaBeDuW'
results = sp.playlist_tracks(playlist_url)


info={}
for item in results['items']:
    track = item['track']
    if not track:  # Skip if track is None
        continue

    track_id = track.get('id')
    if not track_id:
        continue  # Skip tracks without ID

    print("Fetching features for:", track['name'])

    audio_features = sp.audio_features(track_id)
    if audio_features is None:
        print("Could not fetch features for", track['name'])
        continue

    print(audio_features)

    # Combine data
    '''track_info = {
        'name': track_name,
        'artist': artist_name,
        'album': album_name,
        'cover_url': album_cover,
        'audio_features': audio_features
    }

    tracks_data.append(track_info)'''
