'use client'
import { log } from 'console';
import { createChart } from 'lightweight-charts';
import Image from 'next/image'
import { FormEvent, useRef, useState } from 'react';
import { DefaultApi } from '../../data/apis';
import BackTestResultVirtualization from '../../component/result';
export default function BackTestRequestPage() {
    const [isLoading, setLoading] = useState(false)
    const firstDateOfTheYear = new Date().getFullYear() + '-01' + '-01'
    const toDay = Intl.DateTimeFormat('sv-SE').format(new Date())
    const [backTestRequest, setBackTestRequest] = useState({
        startDate: firstDateOfTheYear,
        endDate: toDay,
        exchange: 'binance',
        botOrderType: 'MARKET',
        mainInterval: '5m',
        indicatorParam: "",
        preFetchBar: '',
        initBalance: '1000',
        numberWorker: '1',
    })
    async function upload(formData: FormData) {
        try {
            setLoading(true)
            const response = await fetch(process.env.BASE_URL + "/api/backtest", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false)
        }
    }
    const handlerSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
        const file = inputElement?.files?.item(0) as File;
        const regex = /([a-zA-Z0-9]+)=((?:-?\d+\.\d+,)+)(?:;|\n)/g;
        const indicatorObj = {}
        if (backTestRequest.indicatorParam != '') {
            const indicators = backTestRequest.indicatorParam.split('\n')
            indicators.map(s => {
                const k = s.split('=')[0]
                const v = s.split('=')[1]
                indicatorObj[k] = v
            })
        }
        formData.append("backTestRequest", JSON.stringify({
            starDateStr: backTestRequest.startDate,
            endDateStr: backTestRequest.endDate,
            exchange: backTestRequest.exchange,
            botOrderType: backTestRequest.botOrderType,
            mainInterval: backTestRequest.mainInterval,
            preFetchBar: backTestRequest.preFetchBar,
            initBalance: backTestRequest.initBalance,
            numberWorker: backTestRequest.numberWorker,
            indicatorParam: indicatorObj
        }));
        formData.append("botJar", file);
        upload(formData)
    }
    return (
        <div>
            {isLoading ? <div className='overlay'></div> : ''}
            <div className={"md:container flex-col"}>
                <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                    <p className='underline underline-offset-8 uppercase '>Submit back test request</p>
                </div>
                <div className="w-1/2">
                    <form className="bg-white rounded px-8 pb-8 mb-4" onSubmit={handlerSubmit}>
                        <div className='font-thin text-gray-900 text-lg font-mono  pt-6 pb-8 mb-4'>
                            <p>Exchange Config</p>
                        </div>
                        <div className="mb-4 flex flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                                Start date
                            </label>
                            <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="text1" type="text" placeholder="yyyy-mm-dd (2021-01-01)" value={backTestRequest.startDate} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        startDate: e.target.value
                                    }
                                    )
                                }} />
                        </div>
                        <div className="mb-4 flex flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                                End date
                            </label>
                            <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="text1" type="text" placeholder="yyyy-mm-dd (2023-12-30)" value={backTestRequest.endDate} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        endDate: e.target.value
                                    }
                                    )
                                }} />
                        </div>

                        <div className="mb-4 flex  flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="exchange">
                                Exchange
                            </label>
                            <div className="relative">
                                <select name='exchange' value={backTestRequest.exchange} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        exchange: e.target.value
                                    }
                                    )
                                }}
                                    className="flex-1 appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="exchange">
                                    <option value="binance">Binance</option>
                                    <option value="okx">OKX</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-5h12l-6 5z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 flex  flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="bot-order-type">
                                Bot Order Type
                            </label>
                            <div className="relative">
                                <select className="flex-1 appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="bot-order-type"
                                    onChange={e => {
                                        setBackTestRequest({
                                            ...backTestRequest,
                                            botOrderType: e.target.value
                                        }
                                        )
                                    }}>
                                    <option value={'MARKET'}>Market</option>
                                    <option value={'LIMIT_ORDER'}>Limit Order</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-5h12l-6 5z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 flex  flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="candle-interval">
                                Candle Interval
                            </label>
                            <div className="relative">
                                <select name='mainInterval' value={backTestRequest.mainInterval} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        mainInterval: e.target.value
                                    }
                                    )
                                }}
                                    className="flex-1 appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="candle-interval">
                                    <option value="5m">5m</option>
                                    <option value="15m">15m</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-5h12l-6 5z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className='font-thin text-gray-900 text-lg font-mono pt-6 pb-8 mb-4'>
                            <p>Algorithm Config</p>
                        </div>
                        <div className="mb-4 flex  flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="file">
                                Upload Bot
                            </label>
                            <input className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" />
                        </div>
                        <div className="mb-4 flex flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                                Prefetch bar
                            </label>
                            <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="text1" type="text" placeholder="150" value={backTestRequest.preFetchBar} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        preFetchBar: e.target.value
                                    }
                                    )
                                }} />
                        </div>
                        <div className="mb-4 flex flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                                Initiation balance
                            </label>
                            <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="text1" type="number" placeholder="1000$" value={backTestRequest.initBalance} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        initBalance: e.target.value
                                    }
                                    )
                                }} />
                        </div>
                        <div className="mb-4 flex flex-row items-center">
                            <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                                Number worker allocate to this backtest
                            </label>
                            <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="text1" type="text" placeholder="1" value={backTestRequest.numberWorker} onChange={e => {
                                    setBackTestRequest({
                                        ...backTestRequest,
                                        numberWorker: e.target.value
                                    }
                                    )
                                }} />
                        </div>
                        <div className="mb-4 block items-center">
                            <div className="flex items-center  mb-4" >
                                <p className='text-gray-700 text-sm font-bold mb-2 mr-3'>Indicator params</p>
                            </div>
                            <div className='block'>
                                <textarea placeholder={`rsi=14,36,48\nsma=34,55,89`} className="block text-sm appearance-none border rounded mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="10" cols="100" onChange={e => {
                                        setBackTestRequest({
                                            ...backTestRequest,
                                            indicatorParam: e.target.value
                                        }
                                        )
                                    }}>
                                </textarea>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    )
}
