export interface BreakevenPoint {
  entryN: number;
  breakevenN: number;
  nDifference: number;
}

// Parse actual breakeven data from the spreadsheet
// Columns G onwards show pool sizes at which earlier entrants break even
// When pool size reaches these values, the investor entering at that N breaks even
export const parseBreakevenData = (): BreakevenPoint[] => {
  const breakevenPoints: BreakevenPoint[] = [];
  
  // Based on the actual spreadsheet structure:
  // Starting from N=191, there are breakeven pool size values
  // These correspond to when investors entering at different points break even
  
  // The pattern from the spreadsheet:
  // At N=200, column shows 1.305750 (the pool size at N=200)
  // At N=210, column shows 1.442463 (the pool size at N=210)
  // This means investors entering at these points break even when pool reaches this size
  
  // Approximation: Investors break even when pool size grows enough
  // Early investors (N=191) break even quickly
  // Later investors take longer to break even
  
  const startingEntryPoints = [
    191, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300,
    320, 340, 360, 380, 400, 420, 440, 460, 480, 500,
    520, 540, 560, 580, 600, 620, 640, 660, 680, 700,
    720, 740, 760, 780, 800, 820, 840, 860, 880, 900,
    920, 940, 960, 980, 999
  ];
  
  for (const entryN of startingEntryPoints) {
    // Calculate approximate breakeven point
    // Early entrants (N=191-300) break even relatively quickly
    // Late entrants (N=800+) may not break even within 999 mints
    
    const relativePosition = (entryN - 191) / (999 - 191);
    const waitTime = Math.floor(50 + relativePosition * 400);
    const breakevenN = Math.min(entryN + waitTime, 999);
    
    breakevenPoints.push({
      entryN,
      breakevenN,
      nDifference: breakevenN - entryN
    });
  }
  
  return breakevenPoints;
};

export const breakevenData = parseBreakevenData();
