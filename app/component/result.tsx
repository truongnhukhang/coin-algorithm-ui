import { LegacyRef, useRef } from "react"
import { BackTestResponse } from "../data/models"
import { CandlestickData, IChartApi, IChartApiBase, SeriesMarkerPosition, SeriesMarkerShape, UTCTimestamp, createChart } from "lightweight-charts"

function buildMarkerFrom(tradeTime: number, type: string, status: string, profit: number): {
    'time': UTCTimestamp,
    'position': SeriesMarkerPosition,
    'color': string,
    'shape': SeriesMarkerShape,
    'text': string
} {
    if (type === "sell") {
        if (status === "exit") {
            return {
                time: tradeTime / 1000 as UTCTimestamp,
                position: "aboveBar",
                color: profit < 0 ? "#e91e63" : "#80C89B",
                shape: "arrowDown",
                text:  String(profit)
            };
        } else {
            return {
                time: tradeTime / 1000 as UTCTimestamp,
                position: "aboveBar",
                color: "#e91e63",
                shape: "arrowDown",
                text: "E"
            };
        }
    } else {
        if (status === "exit") {
            return {
                time: tradeTime / 1000 as UTCTimestamp,
                position: "belowBar",
                color: profit < 0 ? "#e91e63" : "#80C89B",
                shape: "arrowUp",
                text: String(profit)
            };
        } else {
            return {
                time: tradeTime / 1000 as UTCTimestamp,
                position: "belowBar",
                color: "#2196F3",
                shape: "arrowUp",
                text: "E"
            };
        }
    }
}

export default function backTestResult(backTestResponse: BackTestResponse) {
    const chartRef = useRef(null)
    const balanceRef = useRef({})
    if (chartRef.current) {
        const chart = createChart(chartRef.current)
        const mainSeries = chart.addCandlestickSeries();
        // Set the data for the Main Series
        if (backTestResponse.candleDtos) {
            const candles = backTestResponse.candleDtos.map((c) => {
                return {
                    time: c.beginTime / 1000 as UTCTimestamp,
                    open: c.open,
                    close: c.close,
                    high: c.high,
                    low: c.low
                };
            })
            mainSeries.setData(candles)
        }
        if (backTestResponse.tradePointDtos) {
            mainSeries.setMarkers(backTestResponse.tradePointDtos.map((p) => {
                return buildMarkerFrom(p.tradeTime, p.type, p.status, p.pnl);
            }))
        }

    }
    return (<>
        <div>
            <div id="chart" ref={chartRef}></div>
            <div id="balance" ref={balanceRef}></div>
        </div>
    </>)
} 