import React from 'react';
import { useRank } from '../../hooks/useRank';

const tierColors: Record<string, string> = {
  Bronze: "#a98c65",
  Silver: "#bbbbbb",
  Gold: "#ffd700",
  Platinum: "#71e1d6",
  Diamond: "#7b6df6"
};

const RankScreen: React.FC = () => {
  const { rank, recordMatch, winRate } = useRank();

  return (
    <div style={{
      padding: 20,
      fontFamily: "Arial,sans-serif",
      background: "#191926",
      color: "#fff",
      minHeight: "100vh"
    }}>
      <h1 style={{
        textAlign: "center",
        color: tierColors[rank.tier],
        textShadow: `0 0 10px ${tierColors[rank.tier]}88`
      }}>
        {rank.tier}{rank.subLevel}
      </h1>
      <div style={{ margin: "16px 0", textAlign: "center" }}>
        <b>Shard Progress:</b>
        <div style={{
          background: "#333",
          borderRadius: 12,
          margin: "8px auto",
          height: 24,
          width: 200,
          overflow: "hidden"
        }}>
          <div style={{
            background: tierColors[rank.tier],
            width: `${(rank.shards / rank.maxShards) * 100}%`,
            height: "100%",
            transition: "width .2s"
          }}></div>
        </div>
        <span>{rank.shards}/{rank.maxShards} shards</span>
      </div>
      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <b>Wins: </b>{rank.wins} &emsp;
        <b>Losses: </b>{rank.losses} <br/>
        <b>WinRate: </b>{winRate}%
      </div>
      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <button style={{
          margin: 4,
          padding: "8px 20px",
          background: "#6eeb83",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 17
        }} onClick={() => recordMatch("W")}>+ Победа</button>
        <button style={{
          margin: 4,
          padding: "8px 20px",
          background: "#ff5677",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 17
        }} onClick={() => recordMatch("L")}>+ Поражение</button>
      </div>
      <div>
        <b>Match History:</b>
        <div style={{marginTop: 8, textAlign: 'center'}}>
          {rank.history.length === 0
            ? <span>No matches played yet</span>
            : rank.history.map((res, i) =>
              <span key={i} style={{
                margin: 2,
                padding: 5,
                borderRadius: '50%',
                background: res === "W" ? "#6eeb83" : "#ff5677",
                color: "#222"
              }}>{res}</span>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default RankScreen;