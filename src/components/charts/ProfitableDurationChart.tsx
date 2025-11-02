import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getBreakevenPoints, type BreakevenPoint } from "@/lib/parseBreakevenFromCSV";

const ProfitableDurationChart = () => {
  const [breakevenPoints, setBreakevenPoints] = useState<BreakevenPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakevenPoints().then(points => {
      setBreakevenPoints(points);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading duration analysis...</div>;
  }

  if (breakevenPoints.length === 0) {
    return <div className="text-center p-8">No duration data available</div>;
  }

  // Filter out points with no breakeven
  const validPoints = breakevenPoints.filter(p => p.profitableDuration !== null);

  const chartData = validPoints.map(p => ({
    entryN: p.entryN,
    duration: p.profitableDuration
  }));

  // Calculate color based on duration (gradient from red to green)
  const maxDuration = Math.max(...validPoints.map(p => p.profitableDuration as number));
  const minDuration = Math.min(...validPoints.map(p => p.profitableDuration as number));

  const getColor = (duration: number) => {
    const normalized = (duration - minDuration) / (maxDuration - minDuration);
    // Use chart colors with opacity based on duration
    if (normalized < 0.33) return 'hsl(var(--destructive))';
    if (normalized < 0.66) return 'hsl(var(--chart-3))';
    return 'hsl(var(--chart-2))';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profitable Duration by Entry Point</CardTitle>
        <CardDescription>
          Number of mints before breaking even for each investor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="entryN" 
              label={{ value: 'Entry Point (N)', position: 'insideBottom', offset: -10 }}
              className="text-muted-foreground"
            />
            <YAxis 
              label={{ value: 'Mints Until Breakeven', angle: -90, position: 'insideLeft' }}
              className="text-muted-foreground"
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">Entry at N = {data.entryN}</p>
                      <p className="text-sm">Duration: {data.duration?.toFixed(1)} mints</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="duration" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.duration as number)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-4">
          Shows how many mints each investor can complete before their cumulative 20% cause 
          contributions exceed the pool size they entered with. 
          <span className="text-destructive ml-1">Red</span> = shorter duration,
          <span className="text-chart-2 ml-1">Green</span> = longer duration.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfitableDurationChart;
