import 'bootstrap/dist/css/bootstrap.min.css';

import RoundListItem from './RoundListItem.js';

function RoundList() {
  const roundListItemsData = [
    {
      round: {
        albumIds: null,
        id: "a85a6a7c-c131-4ce1-9d4f-bb24f9f61f5a",
        number: 1,
        startDate: "2019-02-20",
        endDate: "2019-02-27",
        picksPerParticipant: 3,
        participantIds: null
      },
      albums: [
        {
          id: "ebfe7f8f-14d7-4999-b70a-d5432bdec36a",
          title: "Another Green World",
          artist: "Brian Eno",
          trackCount: 14,
          imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/92/Another_Green_World.jpg",
          posterId: "96e05653-5e9d-4f86-9b05-fe41ef993587",
          pickedTracks: null,
          topTrackNumber: 3
        }
      ],
      participants: [
        {
          participatedRoundIds: null,
          postedAlbumIds: null,
          id: "96e05653-5e9d-4f86-9b05-fe41ef993587",
          firstName: "Max",
          lastName: "Hellen",
          color: "#e6962e"
        }
      ]
    },
  ];

  return (
    <div className="RoundList">
      <div>
        {
          roundListItemsData.map((itemData) =>
            <RoundListItem
              key={itemData.round.id}
              number={itemData.round.number}
              participants={itemData.participants}
              albums={itemData.albums}
            />
          )
        }
      </div>
    </div>
  );
}

export default RoundList;
