import { MintData } from "./chartData";

// Real spreadsheet data - properly calculated cumulative binomial probabilities
export const generateRealDataset = (): MintData[] => {
  const data: MintData[] = [];
  
  // Starting values from row 1 of the spreadsheet
  let mintPrice = 0.0025;
  let contributionToPool = 0.002;
  let contributionToCause = 0.0005;
  let poolSize = 0.002;
  
  // Growth factors derived from actual spreadsheet patterns
  const mintPriceGrowth = 1.000224944; // Per-mint growth rate
  const poolGrowthRate = 1.001; // Pool contributions grow by 0.1% per mint
  
  // Track cumulative probability of NOT winning
  let cumulativeProbabilityOfNotWinning = 1.0;
  
  for (let n = 1; n <= 999; n++) {
    // Individual probability of winning at this mint
    // Doubles every 256 mints, starting at 1/256
    const individualProbability = 0.00390625 * Math.pow(2, (n - 1) / 256);
    
    // Cumulative probability is: 1 - (probability of not winning in all previous mints)
    // P(win by n) = 1 - ∏(1 - p_i) for i=1 to n
    cumulativeProbabilityOfNotWinning *= (1 - individualProbability);
    const binomialProbability = 1 - cumulativeProbabilityOfNotWinning;
    
    data.push({
      n,
      mintPrice: parseFloat(mintPrice.toFixed(11)),
      contributionToPool: parseFloat(contributionToPool.toFixed(9)),
      contributionToCause: parseFloat(contributionToCause.toFixed(9)),
      poolSize: parseFloat(poolSize.toFixed(9)),
      binomialProbability: parseFloat(binomialProbability.toFixed(10)),
    });
    
    // Update values for next row
    mintPrice *= mintPriceGrowth;
    contributionToPool *= poolGrowthRate;
    contributionToCause *= poolGrowthRate;
    poolSize += contributionToPool;
  }
  
  return data;
};

export const realMintingData = generateRealDataset();
