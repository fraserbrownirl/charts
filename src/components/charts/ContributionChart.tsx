import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mintingData, getChartConfig } from "@/lib/chartData";

const ContributionChart = () => {
  const config = getChartConfig();

  return (
    <Card className="shadow-[var(--shadow-card)] border-border/50 transition-[var(--transition-smooth)] hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
          Contribution Analysis
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Comparing pool and cause contributions across mints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mintingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="n" 
              stroke="hsl(var(--muted-foreground))"
              label={{ value: 'Mint Number', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              label={{ value: 'Contribution', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend />
            <Bar 
              dataKey="contributionToPool" 
              fill={config.contribution.color} 
              name={config.contribution.label}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="contributionToCause" 
              fill={config.cause.color} 
              name={config.cause.label}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ContributionChart;
