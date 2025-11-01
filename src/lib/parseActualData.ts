import { MintData } from "./chartData";

// Parse the actual spreadsheet data from the markdown table
export const parseSpreadsheetData = (markdownContent: string): MintData[] => {
  const lines = markdownContent.split('\n');
  const data: MintData[] = [];
  
  for (const line of lines) {
    // Skip headers and non-data lines
    if (!line.startsWith('|') || line.includes('---') || line.includes('Mint price')) {
      continue;
    }
    
    // Split by pipe and trim
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    
    if (cells.length < 7) continue;
    
    const n = parseInt(cells[0]);
    if (isNaN(n) || n < 1) continue;
    
    const mintPrice = parseFloat(cells[1]);
    const contributionToPool = parseFloat(cells[2]);
    const contributionToCause = parseFloat(cells[3]);
    const poolSize = parseFloat(cells[4]);
    const binomialProbability = parseFloat(cells[5]);
    const profitability = cells[6] ? parseFloat(cells[6]) : undefined;
    
    // Parse breakeven data (columns 8 onwards)
    const breakevenValues: number[] = [];
    for (let i = 7; i < cells.length; i++) {
      const val = parseFloat(cells[i]);
      if (!isNaN(val)) {
        breakevenValues.push(val);
      }
    }
    
    data.push({
      n,
      mintPrice,
      contributionToPool,
      contributionToCause,
      poolSize,
      binomialProbability,
      profitability,
    });
  }
  
  return data;
};
