import chroma from 'chroma-js';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryLabel } from 'victory';
import { useState, useEffect } from 'react';

import ChartPlaceholder from '../../ChartPlaceholder';

/**
 * Convert a genre name to a color.
 * @param genre genre name
 * @return hex color
 */
function genreToColor(genre) {
  let hash = 0;
  for (let i = 0; i < genre.length; i++)
    hash = genre.charCodeAt(i) + ((hash << 5) - hash);
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }

  // Desaturate if too saturated and dark
  const hsl = chroma(color).hsl();
  color = (hsl[1] > 0.7 && hsl[2] < 0.6) ? chroma(color).desaturate(1) : color;

  return color;
}

function MemberGenresChart({member}) {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (member === null) return;

      // Get shared votes
      const res = await fetch(`https://tb-music-club.herokuapp.com/api/member-genres?memberId=${member.id}`);
      const genres = await res.json();
      const topTenGenres = genres.splice(0, 10);

      // Format genre data for plotting
      const plotData = topTenGenres.map((genre) => ({
        genre: genre.genre,
        count: genre.albumTitles.length
      }));

      plotData.reverse();

      setPlotData(plotData);
    };

    loadData();
  }, [member]);

  // Define chart placeholder
  const chartSkeleton = (<div style={{ width: '100%', height: '350px', backgroundColor: '#f3f3f3', borderRadius: '3px' }}></div>);

  // Define chart container that can scroll on mobile
  const chartContainer = <VictoryContainer style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto" }} />;

  return (
    (plotData.length === 0) ? <ChartPlaceholder aspectRatio={300 / 450} /> :
    <VictoryChart
      containerComponent={chartContainer}
      padding={{left: 180, right: 30, top: 50}}
      domainPadding={15}
      animate={{ duration: 500, easing: 'cubic' }}>
      <VictoryBar
        data={plotData}
        x="genre"
        y="count"
        labels={plotData.map((x) => x.count)}
        style={{ data: { width: 15, fill: ({ datum }) => genreToColor(datum.genre)}, labels: { fontFamily: 'Poppins', fontSize: 12, fill: "#313131" } }}
        horizontal={true}
        labelComponent={<VictoryLabel dx={5}/>}
      />

      <VictoryAxis
        style={{ tickLabels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />

      <VictoryLabel
        text="Top 10 Posted Artist Genres"
        x={225}
        y={30}
        textAnchor="middle"
        style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold' }}
      />
    </VictoryChart>
  );
}

export default MemberGenresChart;
