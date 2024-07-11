import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { VacationsStatusModel } from "../../../Models/StatsModels";
import "./VacationsPieChart.css";
import { SetStateAction, useCallback, useState, useEffect } from "react";

type VacationsPieChartProps = {
    vacationsStatus: VacationsStatusModel;
};

export function VacationsPieChart(props: VacationsPieChartProps): JSX.Element {

    const data = [
        { name: 'Future Vacations', value: props?.vacationsStatus?.future_vacations },
        { name: 'Ongoing Vacations', value: props?.vacationsStatus?.ongoing_vacations },
        { name: 'Past Vacations', value: props?.vacationsStatus?.past_vacations },
    ];

    const renderActiveShape = (props: any, fontSize: number) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value
        } = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={"#3f3d56"} fontWeight={"bold"} fontSize={fontSize*1.3}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={"#3f3d56"}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={"#3f3d56"}
                />
                <text
                    x={cx}
                    y={cy+12}
                    dy={10}
                    textAnchor="middle"
                    fill="#3f3d56"
                    fontSize={fontSize}
                >{`${value} vacations`}</text>
                <text
                    x={cx}
                    y={cy+14}
                    dy={30}
                    textAnchor="middle"
                    fill="#3f3d56"
                    fontSize={fontSize*0.9}
                >
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_: any, index: SetStateAction<number>) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getResponsiveRadius = () => {
        const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.23;
        return { innerRadius: baseRadius * 0.75, outerRadius: baseRadius };
    };

    const getResponsiveFontSize = () => {
        return Math.min(dimensions.width, dimensions.height) * 0.026;
    };

    const { innerRadius, outerRadius } = getResponsiveRadius();
    const fontSize = getResponsiveFontSize();

    return (
        <div className="VacationsPieChart">
            <ResponsiveContainer width={"100%"} height={350}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={(props: any) => renderActiveShape(props, fontSize)}
                        data={data}
                        cx={"50%"}
                        cy={"50%"}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        fill="#a1c1d6"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}