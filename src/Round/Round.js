import 'bootstrap/dist/css/bootstrap.min.css';
import './Round.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RoundParticipantsKey from '../RoundParticipantsKey/RoundParticipantsKey';
import AlbumList from '../AlbumList/AlbumList';

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

  return (
    <div className="Round">
      <div className="mt-2 mb-5 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="m-0">Round {round.number}</h1>
          <small>{round.startDate} to {round.endDate}</small>
        </div>

        <RoundParticipantsKey participants={participants} />
      </div>

      <AlbumList albums={albums} participants={participants}/>
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

export default Round;
