import 'bootstrap/dist/css/bootstrap.min.css';
import './Round.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RoundAlbumListItem from '../RoundAlbumListItem/RoundAlbumListItem';

function Round() {

  const { id } = useParams();
  const [round, setRound] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getRound = async () => {
      // Get round info
      const round = await fetchRound(id);
      setRound(round);

      // Get participant info
      const participants = await fetchParticipants(round);
      setParticipants(participants);

      // Get album info
      const albums = await fetchAlbums(round);
      setAlbums(albums);
    };

    getRound();
  }, []);

  const fetchRound = async (id) => {
    const res = await fetch('https://tb-music-club.herokuapp.com/api/round?id=' + id);
    const round = await res.json();
    return round;
  };

  if (round === null) return null;

  const participantsList = createParticipantsList(participants);
  const albumsList = createAlbumsList(albums, participants);

  return (
    <div className="Round">
      <div className="mb-5 d-flex justify-content-between align-items-center">
        <div>
          <h1>Round {round.number}</h1>
          <small>{round.startDate} to {round.endDate}</small>
        </div>

        {participantsList}
      </div>

      {albumsList}
    </div>
  );
}

function fetchParticipants(round) {
  const participantPromises = round.participantIds.map((participantId) => {
    return fetch('https://tb-music-club.herokuapp.com/api/member?id=' + participantId)
      .then(response => response.json());
  });
  return Promise.all(participantPromises)
}

function fetchAlbums(round) {
  const albumPromises = round.albumIds.map((albumId) => {
    return fetch('https://tb-music-club.herokuapp.com/api/album?id=' + albumId)
      .then(response => response.json());
  });
  return Promise.all(albumPromises);
}

function createParticipantsList(participants) {
  // Sort participants by lastname, firstname
  participants.sort((a, b) => {
    if (a.lastName < b.lastName)
      return -1;
    else if (a.lastName > b.lastName)
      return 1;
    return a.firstName < b.firstName ? -1 : 1;
  });

  return (
    <div>
    {
      participants.map((participant) => (
        <p className="mb-1 text-right" key={participant.id}>{participant.firstName + ' ' + participant.lastName}</p>
      ))
    }
    </div>
  );
}

function createAlbumsList(albums, participants) {
  return (
    <div>
    {
      albums.map((album) => (
        <RoundAlbumListItem album={album} participants={participants} key={album.id}/>
      ))
    }
    </div>
  );
}

export default Round;
