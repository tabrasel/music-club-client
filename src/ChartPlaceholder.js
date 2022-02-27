function ChartPlaceholder({ aspectRatio }) {
  const aspectRatioStr = (aspectRatio * 100) + '%';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: aspectRatioStr
      }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#f3f3f3',
          borderRadius: '5px'
        }}>
      </div>
    </div>
  );
}

export default ChartPlaceholder;
