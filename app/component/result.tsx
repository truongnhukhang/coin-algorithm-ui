'use client'
import { LegacyRef, useEffect, useRef, useState } from "react"
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
                text: String(profit)
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

export default function BackTestResult(backTestResponse: BackTestResponse) {
    const balanceRef = useRef()
    const chartRef = useRef()
    const [chart, setChart] = useState({} as IChartApi)
    const firstChartRender = useRef(true)
    const firstBalanceRender = useRef(true)
    const candleDtos = backTestResponse.candleDtos;
    useEffect(() => {
        if (chartRef.current && firstChartRender.current) {
            const chart = createChart(chartRef.current, { height: 400 })
            const mainSeries = chart.addCandlestickSeries();
            // Set the data for the Main Series
            if (candleDtos) {
                const candles = candleDtos.map((c) => {
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
            firstChartRender.current = false


        }
        if (balanceRef.current && firstBalanceRender.current) {
            const balanceChart = createChart(balanceRef.current, { height: 400 })
            const balanceLine = balanceChart.addLineSeries();
            if (backTestResponse.balanceDtos) {
                const lines: { 'time': UTCTimestamp, 'value': Number }[] = []
                for (let i = 0; i < backTestResponse.balanceDtos.length; i++) {
                    const balanceVal = backTestResponse.balanceDtos[i]
                    lines.push({ time: balanceVal.time / 1000 as UTCTimestamp, value: balanceVal.value })
                }
                balanceLine.setData(lines)
            }
            firstBalanceRender.current = false
        }
    }, [])

    return (<>
        <div>
            <div id="trading-information" className="flex flex-col">
                <div className='font-bold text-gray-900 text-xl  px-8 pt-6 pb-8 mb-4'>
                    <p className=''>Trade result chart</p>
                </div>
                <div id="chart-container">
                    <div id="chart" ref={chartRef}></div>
                </div>
            </div>
            <div id="balance-information" className="flex flex-col">
                <div className='font-bold text-gray-900 text-xl  px-8 pt-6 pb-8 mb-4'>
                    <p className=''>Balance chart</p>
                </div>
                <div id="balance" ref={balanceRef}></div>
            </div>
            <div id="trade-stats" className="flex flex-col">
                <div className='font-bold text-gray-900 text-xl  px-8 pt-6 pb-8 mb-4'>
                    <p className=''>Trade statistic</p>
                </div>
                <div id="streak-stats" className="flex flex-col px-8 ">
                    <table className="table-auto w-1/2 text-left">
                        <tr>
                            <th>Profit - Fee = PNL</th>
                            <td>{backTestResponse.pnl.toFixed(2)} - {backTestResponse.fee.toFixed(2)} = {backTestResponse.total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>win trades</th>
                            <td>{backTestResponse.numWin}</td>
                        </tr>
                        <tr>
                            <th>loss trades</th>
                            <td>{backTestResponse.numLoose}</td>
                        </tr>
                        <tr>
                            <th>Win streak</th>
                            <td>{backTestResponse.winStreak?.count} wins , PNL = {backTestResponse.winStreak?.pnl.toFixed(2)}$</td>
                        </tr>
                        <tr>
                            <th>Loss streak</th>
                            <td>{backTestResponse.looseStreak?.count} lost , PNL = {backTestResponse.looseStreak?.pnl.toFixed(2)}$</td>
                        </tr>
                        <tr>
                            <th>avg win streak</th>
                            <td>{backTestResponse.avgWinStreak.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>avg loss streak</th>
                            <td>{backTestResponse.avglooseStreak.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Max drawdown value</th>
                            <td>{backTestResponse.drawDownVal?.value.toFixed(2)} - Start from {new Date(Number(backTestResponse.drawDownVal?.startDate)).toLocaleDateString()} to {new Date(Number(backTestResponse.drawDownVal?.endDate)).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <th>Max drawdown percent</th>
                            <td>{backTestResponse.drawdownPer?.value.toFixed(3) * 100}% - Start from {new Date(Number(backTestResponse.drawdownPer?.startDate)).toLocaleDateString()} to {new Date(Number(backTestResponse.drawdownPer?.endDate)).toLocaleDateString()}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </>)
} 