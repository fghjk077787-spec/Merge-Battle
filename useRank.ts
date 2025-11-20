import { useState } from "react";

type RankTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
type SubLevel = "" | "+";

type RankInfo = {
  tier: RankTier;
  subLevel: SubLevel;
  shards: number;
  maxShards: number;
  wins: number;
  losses: number;
  history: ("W" | "L")[];
};

const nextTier: Record<RankTier, RankTier | null> = {
  Bronze: "Silver",
  Silver: "Gold",
  Gold: "Platinum",
  Platinum: "Diamond",
  Diamond: null,
};

export function useRank(initial?: Partial<RankInfo>) {
  const [rank, setRank] = useState<RankInfo>({
    tier: initial?.tier ?? "Bronze",
    subLevel: initial?.subLevel ?? "",
    shards: initial?.shards ?? 0,
    maxShards: 5,
    wins: initial?.wins ?? 0,
    losses: initial?.losses ?? 0,
    history: initial?.history ?? [],
  });

  function recordMatch(result: "W" | "L") {
    setRank(prev => {
      let { tier, subLevel, shards, maxShards, wins, losses, history } = prev;
      if (result === "W") {
        wins += 1;
        shards += 1;
        if (shards >= maxShards) {
          shards = 0;
          if (tier !== "Diamond") {
            tier = nextTier[tier]!;
          } else {
            subLevel = subLevel === "" ? "+" : "";
          }
        }
      } else {
        losses += 1;
      }
      return {
        tier,
        subLevel,
        shards,
        maxShards,
        wins,
        losses,
        history: [result, ...history].slice(0, 10)
      };
    });
  }

  return {
    rank,
    recordMatch,
    winRate: (rank.wins / Math.max(rank.wins + rank.losses, 1) * 100).toFixed(0)
  };
}