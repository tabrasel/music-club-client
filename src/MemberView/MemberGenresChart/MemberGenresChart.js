// Import packages
import chroma from 'chroma-js';
import { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';

// Import components
import ChartPlaceholder from '../../ChartPlaceholder';

// Import services
import { getMemberGenresAsync } from '../../services/MemberService';

/**
 * Converts a string to a color.
 * @param str  the string to convert
 * @return     a hex color string
 */
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }

  let hsl = chroma(color).hsl();
  color = (hsl[2] > 0.6) ? chroma(color).darken(1) : color;
  hsl = chroma(color).hsl();
  color = (hsl[1] > 0.7 && hsl[2] < 0.6) ? chroma(color).desaturate(1) : color; // Desaturate if too saturated and dark

  return color;
}

function MemberGenresChart({member}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (member === null) return;

      const genres = await getMemberGenresAsync(member.id)
      const plotData = genres.map((genre) => ({
        text: genre.genre,
        value: genre.albumTitles.length
      }));
      setChartData(plotData);
    };

    loadData();
  }, [member]);

  const options = {
    enableTooltip: false,
    deterministic: true,
    rotations: 1,
    rotationAngles: [0],
    fontSizes: [8, 56],
    fontFamily: "sans-serif",
  };

  const callbacks = { getWordColor: (word) => stringToColor(word.text) };

  return (
    (chartData.length === 0)
    ? <ChartPlaceholder aspectRatio={300 / 450} />
    : <ReactWordcloud words={chartData} options={options} callbacks={callbacks} />
  );
}

export default MemberGenresChart;
