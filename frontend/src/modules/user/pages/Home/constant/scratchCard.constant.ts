export const SCRATCH_CARD_PRIZES = [
  { amount: 200, weight: 625000, color: "#FFD700" },
  { amount: 300, weight: 275000, color: "#C0C0C0" },
  { amount: 500, weight: 40000, color: "#FF6B35" },
  { amount: 700, weight: 25000, color: "#FFD700" },
  { amount: 800, weight: 20000, color: "#87CEEB" },
  { amount: 1000, weight: 10000, color: "#FFD700" },
  { amount: 1500, weight: 5000, color: "#FFD700" },
];

export const getRandomPrize = () => {
  const totalWeight = SCRATCH_CARD_PRIZES.reduce((sum, p) => sum + p.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const prize of SCRATCH_CARD_PRIZES) {
    if (random < prize.weight) {
      return prize;
    }
    random -= prize.weight;
  }
  
  return SCRATCH_CARD_PRIZES[0];
};
