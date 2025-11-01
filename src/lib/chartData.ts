// Parse and structure the data from the spreadsheet
export interface MintData {
  n: number;
  mintPrice: number;
  contributionToPool: number;
  contributionToCause: number;
  poolSize: number;
  binomialProbability: number;
  profitability?: number;
}

// Sample data from the spreadsheet (first 95 entries)
export const mintingData: MintData[] = [
  { n: 1, mintPrice: 0.0025, contributionToPool: 0.002, contributionToCause: 0.0005, poolSize: 0.002, binomialProbability: 0.00390625 },
  { n: 2, mintPrice: 0.002500562493, contributionToPool: 0.002, contributionToCause: 0.0005, poolSize: 0.004, binomialProbability: 0.007797241211 },
  { n: 3, mintPrice: 0.002502249888, contributionToPool: 0.002002, contributionToCause: 0.0005, poolSize: 0.006002, binomialProbability: 0.01167303324 },
  { n: 4, mintPrice: 0.002505061931, contributionToPool: 0.002004, contributionToCause: 0.000501, poolSize: 0.008006, binomialProbability: 0.01553368545 },
  { n: 5, mintPrice: 0.0025089982, contributionToPool: 0.002007, contributionToCause: 0.000502, poolSize: 0.010013, binomialProbability: 0.01937925699 },
  { n: 10, mintPrice: 0.002545516399, contributionToPool: 0.002036, contributionToCause: 0.000509, poolSize: 0.020128, binomialProbability: 0.03838295838 },
  { n: 15, mintPrice: 0.002609980328, contributionToPool: 0.002088, contributionToCause: 0.000522, poolSize: 0.030456, binomialProbability: 0.05701838216 },
  { n: 20, mintPrice: 0.002702148931, contributionToPool: 0.002162, contributionToCause: 0.00054, poolSize: 0.041108, binomialProbability: 0.07529266527 },
  { n: 25, mintPrice: 0.002821678357, contributionToPool: 0.002257, contributionToCause: 0.000564, poolSize: 0.052195, binomialProbability: 0.09321280636 },
  { n: 30, mintPrice: 0.002968124101, contributionToPool: 0.002374, contributionToCause: 0.000594, poolSize: 0.063825, binomialProbability: 0.1107856684 },
  { n: 35, mintPrice: 0.003140943753, contributionToPool: 0.002513, contributionToCause: 0.000628, poolSize: 0.076104, binomialProbability: 0.1280179815 },
  { n: 40, mintPrice: 0.003339500349, contributionToPool: 0.002672, contributionToCause: 0.000668, poolSize: 0.089136, binomialProbability: 0.1449163451 },
  { n: 45, mintPrice: 0.003563066279, contributionToPool: 0.00285, contributionToCause: 0.000713, poolSize: 0.103023, binomialProbability: 0.161487231 },
  { n: 50, mintPrice: 0.00381082773, contributionToPool: 0.003049, contributionToCause: 0.000762, poolSize: 0.117862, binomialProbability: 0.1777369854 },
  { n: 55, mintPrice: 0.004081889618, contributionToPool: 0.003266, contributionToCause: 0.000816, poolSize: 0.133748, binomialProbability: 0.1936718317 },
  { n: 60, mintPrice: 0.004375280973, contributionToPool: 0.0035, contributionToCause: 0.000875, poolSize: 0.150773, binomialProbability: 0.2092978725 },
  { n: 65, mintPrice: 0.004689960728, contributionToPool: 0.003752, contributionToCause: 0.000938, poolSize: 0.169023, binomialProbability: 0.2246210922 },
  { n: 70, mintPrice: 0.005024823869, contributionToPool: 0.00402, contributionToCause: 0.001005, poolSize: 0.18858, binomialProbability: 0.2396473594 },
  { n: 75, mintPrice: 0.005378707881, contributionToPool: 0.004303, contributionToCause: 0.001076, poolSize: 0.209523, binomialProbability: 0.2543824286 },
  { n: 80, mintPrice: 0.005750399463, contributionToPool: 0.0046, contributionToCause: 0.00115, poolSize: 0.231924, binomialProbability: 0.2688319431 },
  { n: 85, mintPrice: 0.006138641427, contributionToPool: 0.004911, contributionToCause: 0.001228, poolSize: 0.255852, binomialProbability: 0.2830014368 },
  { n: 90, mintPrice: 0.006542139757, contributionToPool: 0.005234, contributionToCause: 0.001308, poolSize: 0.281371, binomialProbability: 0.2968963362 },
  { n: 95, mintPrice: 0.006959570741, contributionToPool: 0.005568, contributionToCause: 0.001392, poolSize: 0.308537, binomialProbability: 0.3105219628 },
];

export const getChartConfig = () => ({
  mintPrice: {
    label: "Mint Price",
    color: "hsl(var(--chart-1))",
  },
  poolSize: {
    label: "Pool Size",
    color: "hsl(var(--chart-2))",
  },
  probability: {
    label: "Binomial Probability",
    color: "hsl(var(--chart-3))",
  },
  contribution: {
    label: "Contribution to Pool",
    color: "hsl(var(--chart-4))",
  },
  cause: {
    label: "Contribution to Cause",
    color: "hsl(var(--chart-5))",
  },
});
