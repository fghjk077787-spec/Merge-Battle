import React from 'react';

const RankScreen = () => {
  // Mock data for ranks and statistics
  const mockData = {
    rank: 'Gold',
    shardsProgress: 75,
    stats: {
      wins: 20,
      losses: 5,
      winRate: 80,
    },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Rank: {mockData.rank}</h1>
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <h2>Shard Progress</h2>
        <div
          style={{
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            width: '100%',
            height: '30px',
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: '#3f51b5',
              height: '100%',
              width: `${mockData.shardsProgress}%`,
              borderRadius: '10px',
            }}
          />
        </div>
        <p>{mockData.shardsProgress}% shards collected</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2>Statistics</h2>
        <p>Wins: {mockData.stats.wins}</p>
        <p>Losses: {mockData.stats.losses}</p>
        <p>Win Rate: {mockData.stats.winRate}%</p>
      </div>
    </div>
  );
};

export default RankScreen;