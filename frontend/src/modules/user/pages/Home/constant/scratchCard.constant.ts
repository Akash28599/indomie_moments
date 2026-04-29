export const SCRATCH_CARD_PRIZES = [
  { amount: 200, label: "₦200 Airtime", weight: 50, color: "#FFD700" },
  { amount: 100, label: "₦100 Airtime", weight: 50, color: "#C0C0C0" },
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
