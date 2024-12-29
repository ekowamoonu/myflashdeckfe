import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Link } from "react-router-dom";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(173 58% 39%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(12 76% 61%)",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(197 37% 24%)",
  },
  edge: {
    label: "Edge",
    color: "hsl(43 74% 66%)",
  },
  other: {
    label: "Other",
    color: "hsl(27 87% 67%)",
  },
} satisfies ChartConfig;

const Index = () => {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <>
      <DashboardTitle>Overview page</DashboardTitle>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded-md gap-6 flex flex-row">
          <div>
            <img
              className="w-[70px]"
              src="images/overview_car_stats.png"
              alt=""
            />
          </div>
          <div>
            <p className="font-bold text-[clamp(1rem,2.5vw,2rem)] text-slate-800">
              5
            </p>
            <p className="text-sm">Total number of vehicles</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md gap-6 flex flex-row">
          <div>
            <img
              className="w-[70px]"
              src="images/overview_maintenance_stats.png"
              alt=""
            />
          </div>
          <div>
            <p className="font-bold text-[clamp(1rem,2.5vw,2rem)] text-slate-800">
              $50,000
            </p>
            <p className="text-sm">Total maintenance cost</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md gap-6 flex flex-row">
          <div>
            <img
              className="w-[70px]"
              src="images/overview_fuel_stats.png"
              alt=""
            />
          </div>
          <div>
            <p className="font-bold text-[clamp(1rem,2.5vw,2rem)] text-slate-800">
              100L
            </p>
            <p className="text-sm">Total amount fuel consumed</p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-6 p-3 rounded-md">
        <div className="flex flex-row gap-6">
          <div className="w-[30%]">
            <h1 className="font-semibold mb-3">Quick actions</h1>
            <p>
              <Button
                asChild
                size={"lg"}
                variant={"outline"}
                className="w-full mb-4"
              >
                <Link to="#"> Add new vehicle profile</Link>
              </Button>
            </p>
            <p>
              <Button
                asChild
                size={"lg"}
                variant={"outline"}
                className="w-full mb-4"
              >
                <Link to="#"> Record new maintenance</Link>
              </Button>
            </p>
            <p>
              <Button
                asChild
                size={"lg"}
                variant={"outline"}
                className="w-full mb-4"
              >
                <Link to="#"> Record new expense </Link>
              </Button>
            </p>
            <p>
              <Button size={"lg"} variant={"outline"} className="w-full">
                <Link to="#"> Record new purchased fuel</Link>
              </Button>
            </p>
          </div>
          <div className="w-[70%]">
            <h1 className="font-semibold mb-3">Expenses</h1>
            <div>
              <Card className="flex flex-col border-0">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut with Text</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="visitors"
                        nameKey="browser"
                        innerRadius={60}
                        strokeWidth={5}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {totalVisitors.toLocaleString()}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Visitors
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
