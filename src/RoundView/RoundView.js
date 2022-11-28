// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import components
import RoundHeader from './RoundHeader/RoundHeader';
import AlbumList from './AlbumList/AlbumList';

// Import services
import { getAlbumAsync } from '../services/AlbumService';
import { getMemberAsync } from '../services/MemberService';
import { getRoundAsync } from '../services/RoundService';

function Round() {
  const { id } = useParams();
  const [round, setRound] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getRound = async () => {
      // Get round info
      const round = await getRoundAsync(id);
      setRound(round);

      // Get participant info
      const participants = await fetchParticipants(round);
      participants.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName > b.lastName) return 1;
        return a.firstName < b.firstName ? -1 : 1;
      });
      setParticipants(participants);

      // Get album info
      const albums = await fetchAlbums(round.albumIds);
      setAlbums(albums);
    };

    getRound();
  }, [id]);

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
  const promises = round.participantIds.map((participantId) => getMemberAsync(participantId));
  return Promise.all(promises)
}

function fetchAlbums(albumIds) {
  const albumPromises = albumIds.map((albumId) => getAlbumAsync(albumId));
  return Promise.all(albumPromises);
}

export default Round;
