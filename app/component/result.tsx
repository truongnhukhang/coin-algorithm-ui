'use client'
import { LegacyRef, useEffect, useRef, useState } from "react"
import { BackTestResult } from "../data/models"
import { CandlestickData, IChartApi, IChartApiBase, SeriesMarkerPosition, SeriesMarkerShape, UTCTimestamp, createChart } from "lightweight-charts"
import { format } from 'date-fns'
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
export default function BackTestResultVirtualization(resultObj: BackTestResult) {
    const balanceRef = useRef()
    const chartRef = useRef()
    const [chart, setChart] = useState({} as IChartApi)
    const firstChartRender = useRef(true)
    const firstBalanceRender = useRef(true)
    const candleDtos = resultObj.candleDtos;
    const chartDtos = resultObj.chartDtos;
    useEffect(() => {
        if (chartRef.current && firstChartRender.current) {
            const chartList = [] as IChartApi[]
            const chart = createChart(chartRef.current, { height: 400, timeScale: { timeVisible: true } })
            chartList.push(chart)
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
            if (chartDtos) {
                chartDtos.forEach(chartDto => {
                    if (chartDto.overlay && chartDto.plotList) {
                        chartDto.plotList.forEach(plot => {
                            if (plot.values && plot.style == 'line') {
                                const lineSeries = chart.addLineSeries({
                                    color: plot.color,
                                    title: plot.name,
                                    priceFormat: { precision: plot.pricePrecision }
                                });
                                const lines: { 'time': UTCTimestamp, 'value': Number }[] = []
                                for (let i = 0; i < candleDtos.length; i++) {
                                    const time = candleDtos[i].beginTime / 1000 as UTCTimestamp
                                    const value = plot.values[i]
                                    lines.push({ time: time, value: value })
                                }
                                lineSeries.setData(lines)
                            }
                        })
                    }
                    if (!chartDto.overlay && chartDto.plotList) {
                        // todo : impl panel indicator
                        const subChart = createChart(chartRef.current, { height: 200, timeScale: { timeVisible: true } })
                        chartDto.plotList.forEach(plot => {
                            if (plot.values && plot.style == 'line') {
                                const lineSeries = subChart.addLineSeries({
                                    color: plot.color,
                                    title: plot.name,
                                    priceFormat: { precision: 2 }
                                });
                                const lines: { 'time': UTCTimestamp, 'value': Number }[] = []
                                for (let i = 0; i < candleDtos.length; i++) {
                                    const time = candleDtos[i].beginTime / 1000 as UTCTimestamp
                                    const value = plot.values[i]
                                    lines.push({ time: time, value: value })
                                }
                                lineSeries.setData(lines)
                            }
                        })
                        chartList.push(subChart)
                    }
                    for (let i = 0; i < chartList.length; i++) {
                        const tmpChart = chartList[i]
                        tmpChart.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
                            for (let j = 0; j < chartList.length; j++) {
                                if (chartList[j] != tmpChart) {
                                    chartList[j].timeScale().setVisibleLogicalRange(timeRange);
                                }
                            }
                        })
                    }
                })
            }
            if (resultObj.tradePointDtos) {
                mainSeries.setMarkers(resultObj.tradePointDtos.map((p) => {
                    return buildMarkerFrom(p.tradeTime, p.type, p.status, p.pnl);
                }))
            }
            firstChartRender.current = false


        }
        if (balanceRef.current && firstBalanceRender.current) {
            const balanceChart = createChart(balanceRef.current, { height: 400 })
            const balanceLine = balanceChart.addLineSeries();
            if (resultObj.balanceDtos) {
                const lines: { 'time': UTCTimestamp, 'value': Number }[] = []
                for (let i = 0; i < resultObj.balanceDtos.length; i++) {
                    const balanceVal = resultObj.balanceDtos[i]
                    lines.push({ time: balanceVal.time / 1000 as UTCTimestamp, value: balanceVal.value })
                }
                balanceLine.setData(lines)
            }
            firstBalanceRender.current = false
        }
    }, [])

    return (
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
                <div id="streak-stats" className="flex flex-col px-8 relative overflow-x-auto">
                    <table className="table-auto w-2/3 text-left">
                        <tr>
                            <th className="border-2 px-3 py-3">Profit - Fee = PNL</th>
                            <td className="border-2 px-3 py-3">{resultObj.pnl.toFixed(2)} - {resultObj.fee.toFixed(2)} = {resultObj.total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">win trades</th>
                            <td className="border-2 px-3 py-3">{resultObj.numWin}</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">loss trades</th>
                            <td className="border-2 px-3 py-3">{resultObj.numLoose}</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">Win streak</th>
                            <td className="border-2 px-3 py-3">{resultObj.winStreak?.count} wins , PNL = {resultObj.winStreak?.pnl.toFixed(2)}$</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">Loss streak</th>
                            <td className="border-2 px-3 py-3">{resultObj.looseStreak?.count} lost , PNL = {resultObj.looseStreak?.pnl.toFixed(2)}$</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">avg win streak</th>
                            <td className="border-2 px-3 py-3">{resultObj.avgWinStreak.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">avg loss streak</th>
                            <td className="border-2 px-3 py-3">{resultObj.avglooseStreak.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">Max drawdown value</th>
                            <td className="border-2 px-3 py-3">{resultObj.drawDownVal?.value.toFixed(2)} - Start from {format(new Date(Number(resultObj.drawDownVal?.startDate)), 'yyyy-MM-dd')} to {format(new Date(Number(resultObj.drawDownVal?.endDate)), 'yyyy-MM-dd')}</td>
                        </tr>
                        <tr>
                            <th className="border-2 px-3 py-3">Max drawdown percent</th>
                            <td className="border-2 px-3 py-3">{resultObj.drawdownPer?.value.toFixed(3) * 100}% - Start from {format(new Date(Number(resultObj.drawdownPer?.startDate)), 'yyyy-MM-dd')} to {format(new Date(Number(resultObj.drawdownPer?.endDate)), 'yyyy-MM-dd')}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="trade-data" className="flex flex-col">
                <div className='font-bold text-gray-900 text-xl  px-8 pt-6 pb-8 mb-4'>
                    <p className=''>Trade Data</p>
                </div>
                <div id="streak-stats" className="flex flex-col px-8 relative overflow-x-auto">
                    {resultObj.tradePointDtos ? <table className="table-auto text-sm text-left">
                        <thead className="text-left">
                            <th className="border-2 px-3 py-3">Time</th>
                            <th className="border-2 px-3 py-3">Type</th>
                            <th className="border-2 px-3 py-3">State</th>
                            <th className="border-2 px-3 py-3">Volume</th>
                            <th className="border-2 px-3 py-3">Pnl</th>
                            <th className="border-2 px-3 py-3">Fee</th>
                            <th className="border-2 px-3 py-3">Log</th>
                        </thead>
                        <tbody>
                            {resultObj.tradePointDtos.map((tradePoint) =>
                                <tr key={tradePoint.tradeTime}>
                                    <td className="border-2 px-3 py-3">{format(new Date(tradePoint.tradeTime), 'yyyy-MM-dd:hh-mm-ss')}</td>
                                    <td className="border-2 px-3 py-3">{tradePoint.type}</td>
                                    <td className="border-2 px-3 py-3">{tradePoint.status}</td>
                                    <td className="border-2 px-3 py-3">{tradePoint.amount}</td>
                                    <td className="border-2 px-3 py-3">{tradePoint.pnl}</td>
                                    <td className="border-2 px-3 py-3">{tradePoint.fee}</td>
                                    <td className="border-2 px-3 py-3">{tradePoint.log}</td>
                                </tr>
                            )}
                        </tbody>
                    </table> : ''}

                </div>
            </div>
        </div>
    )
} 