import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Line, LineChart } from "recharts";
import { getBreakevenPoints, type BreakevenPoint } from "@/lib/parseBreakevenFromCSV";

const BreakevenPointChart = () => {
  const [breakevenPoints, setBreakevenPoints] = useState<BreakevenPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakevenPoints().then(points => {
      setBreakevenPoints(points);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading breakeven analysis...</div>;
  }

  if (breakevenPoints.length === 0) {
    return <div className="text-center p-8">No breakeven data available</div>;
  }

  // Filter out points with no breakeven (stays profitable)
  const validPoints = breakevenPoints.filter(p => p.breakevenN !== null);

  // Prepare data for line chart with trend
  const chartData = validPoints.map(p => ({
    entryN: p.entryN,
    breakevenN: p.breakevenN,
    profitableDuration: p.profitableDuration
  }));

  const maxN = Math.max(...validPoints.map(p => p.breakevenN as number));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entry Point vs Breakeven Analysis</CardTitle>
        <CardDescription>
          Shows when each investor breaks even based on their entry point
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="entryN" 
              label={{ value: 'Entry Point (N)', position: 'insideBottom', offset: -10 }}
              className="text-muted-foreground"
            />
            <YAxis 
              label={{ value: 'Breakeven N', angle: -90, position: 'insideLeft' }}
              className="text-muted-foreground"
              domain={[0, maxN + 10]}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">Entry at N = {data.entryN}</p>
                      <p className="text-sm">Breakeven at N = {data.breakevenN?.toFixed(1)}</p>
                      <p className="text-sm text-muted-foreground">
                        Duration: {data.profitableDuration?.toFixed(1)} mints
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3" 
              segment={[{ x: 0, y: 0 }, { x: maxN, y: maxN }]}
              label={{ value: 'Entry = Breakeven', position: 'insideTopRight' }}
            />
            <Line 
              type="monotone" 
              dataKey="breakevenN" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-4">
          Each point shows when an investor breaks even. Points above the diagonal line indicate 
          investors who mint for longer before breaking even.
        </p>
      </CardContent>
    </Card>
  );
};

export default BreakevenPointChart;
