import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RoundView.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RoundHeader from './RoundHeader/RoundHeader';
import AlbumList from './AlbumList/AlbumList';

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
      participants.sort((a, b) => {
        if (a.lastName < b.lastName)
          return -1;
        else if (a.lastName > b.lastName)
          return 1;
        return a.firstName < b.firstName ? -1 : 1;
      });
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
    <div>
      <RoundHeader round={round} participants={participants} />

      <hr className="mt-3 mb-5" />

      <AlbumList
        albums={albums}
        participants={participants}
        votesPerParticipant={round.picksPerParticipant} />
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
