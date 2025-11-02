import { getRealData, type BreakevenEntry } from "./parseRealCSV";

export interface InvestorProfitLine {
  entryN: number; // N value where this investor entered
  profitData: { n: number; profit: number }[]; // Profit/loss at each subsequent mint number
}

export interface BreakevenPoint {
  entryN: number;
  breakevenN: number | null;
  profitableDuration: number | null;
}

// CSV structure notes:
// - After the base columns, there are up to 21 investor P/L columns.
// - At mint number n, only investors who have already entered have a value.
// - The investor P/L columns are ordered from newest (left) to oldest (right).
// - The newest investor at the current n has 0 profit and is not included in the array.
// - Therefore, at n with K active investors, the array has length K-1.

export const parseInvestorProfitLines = (breakevenData: BreakevenEntry[]): InvestorProfitLine[] => {
  const investorLines: InvestorProfitLine[] = [];
  const FIRST_INVESTOR_N = 11; // First investor enters at n=11
  const INVESTOR_ENTRY_INTERVAL = 20; // New investor every 20 mints
  const NUM_INVESTORS = 21; // Fixed 21 investor columns (G–AA)

  // Create a line for each of the 21 investors (fixed column per investor)
  for (let investorIndex = 0; investorIndex < NUM_INVESTORS; investorIndex++) {
    const entryN = FIRST_INVESTOR_N + investorIndex * INVESTOR_ENTRY_INTERVAL;
    const profitData: { n: number; profit: number }[] = [];

    // Walk all rows; for rows at/after this investor's entry, read fixed column value
    for (const entry of breakevenData) {
      const currentN = entry.entryN;
      if (currentN < entryN) continue; // Not entered yet

      const profit = (entry.breakevenPoolSizes as unknown as (number | null | undefined)[])[investorIndex];

      if (profit !== null && profit !== undefined && !Number.isNaN(profit)) {
        profitData.push({ n: currentN, profit: Number(profit) });
      }
    }

    if (profitData.length > 0) {
      investorLines.push({ entryN, profitData: profitData.sort((a, b) => a.n - b.n) });
    }
  }

  return investorLines.sort((a, b) => a.entryN - b.entryN);
};

// Calculate breakeven points for all investors
export const calculateBreakevenPoints = (profitLines: InvestorProfitLine[]): BreakevenPoint[] => {
  return profitLines.map(line => {
    const { entryN, profitData } = line;
    
    // Find where profit crosses from positive to negative
    for (let i = 0; i < profitData.length - 1; i++) {
      const current = profitData[i];
      const next = profitData[i + 1];
      
      if (current.profit >= 0 && next.profit < 0) {
        // Linear interpolation to find precise breakeven point
        const breakevenN = current.n + 
          (0 - current.profit) / (next.profit - current.profit) * (next.n - current.n);
        
        return {
          entryN,
          breakevenN: Math.round(breakevenN * 10) / 10,
          profitableDuration: Math.round((breakevenN - entryN) * 10) / 10
        };
      }
    }
    
    // If never goes negative, return null
    return {
      entryN,
      breakevenN: null,
      profitableDuration: null
    };
  });
};

// Async function to get investor profit lines
export const getInvestorProfitLines = async (): Promise<InvestorProfitLine[]> => {
  const data = await getRealData();
  return parseInvestorProfitLines(data.breakevenData);
};

// Async function to get breakeven points
export const getBreakevenPoints = async (): Promise<BreakevenPoint[]> => {
  const profitLines = await getInvestorProfitLines();
  return calculateBreakevenPoints(profitLines);
};
