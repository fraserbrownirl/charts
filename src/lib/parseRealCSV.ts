import { MintData } from "./chartData";

export interface BreakevenEntry {
  entryN: number;
  breakevenPoolSizes: number[];
}

// Parse CSV synchronously from the uploaded data file
// Using static import to embed CSV data at build time
const parseCSVData = (csvText: string): { 
  mintingData: MintData[], 
  breakevenData: BreakevenEntry[] 
} => {
  const lines = csvText.trim().split('\n');
  const mintingData: MintData[] = [];
  const breakevenData: BreakevenEntry[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',');
    
    const n = parseInt(values[0]);
    if (isNaN(n)) continue;
    
    const mintPrice = parseFloat(values[1]);
    const contributionToPool = parseFloat(values[2]);
    const contributionToCause = parseFloat(values[3]);
    const poolSize = parseFloat(values[4]);
    const binomialProbability = parseFloat(values[5]);
    
    mintingData.push({
      n,
      mintPrice,
      contributionToPool,
      contributionToCause,
      poolSize,
      binomialProbability,
      profitability: undefined
    });
    
    // Parse investor profit data starting from column 7 (index 6)
    // Each subsequent column represents profit for investors who have entered
    const investorProfits: number[] = [];
    for (let j = 6; j < values.length; j++) {
      const val = values[j].trim();
      if (val !== '') {
        const parsedVal = parseFloat(val);
        if (!isNaN(parsedVal)) {
          investorProfits.push(parsedVal);
        }
      }
    }
    
    if (investorProfits.length > 0) {
      breakevenData.push({
        entryN: n,
        breakevenPoolSizes: investorProfits
      });
    }
  }
  
  return { mintingData, breakevenData };
};

// Fetch CSV data at runtime
let cachedData: { mintingData: MintData[], breakevenData: BreakevenEntry[] } | null = null;

export const getRealData = async () => {
  if (cachedData) return cachedData;
  
  const response = await fetch('/minting-data.csv');
  const csvText = await response.text();
  cachedData = parseCSVData(csvText);
  return cachedData;
};

// For synchronous exports (will be empty initially, populated after fetch)
export const realMintingData: MintData[] = [];
export const realBreakevenData: BreakevenEntry[] = [];

// Auto-initialize
getRealData().then(data => {
  realMintingData.length = 0;
  realMintingData.push(...data.mintingData);
  realBreakevenData.length = 0;
  realBreakevenData.push(...data.breakevenData);
});
