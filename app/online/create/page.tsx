// create a new page same as /backtest/create/page.tsx except for the following:
// Dont have the startDate,endDate,numberWorker input fields
// Change BackTest to Online object on everything
// Change OnlineRequest to OnlineRequest object on everything
"use client"
import { DefaultApi } from "@/app/data/apis/DefaultApi";
import { BotOrderType } from "@/app/data/models/BotOrderType";
import { OnlineRequest } from "@/app/data/models/OnlineRequest"
import { Configuration } from "@/app/data/runtime";
import { FormEvent, useState } from "react"

// Change BackTestSubmitResponse to OnlineCreateResponse object on everything
export default function OnlineCreatePage() {
    const [isLoading, setLoading] = useState(false)
    const [onlineRequest, setOnlineRequest] = useState({
        // create deault values for the OnlineRequest object
        enableCloseMode: false,
        preFetchBar: 100,
        indicatorParam: {},
        coin: "BTCUSDT",
        mainInterval: "5m",
        exchange: "Binance",
        otherIntervals: ['5m', '4h'],
        btcDomIntervals: ['5m', '4h'],
        initBalance: 0,
        makerFee: 0,
        takerFee: 0,
        botOrderType: 'MARKET',
    } as OnlineRequest)

    function handlerSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        // import API create Online
        // call the API create Online with the onlineRequest object
        // set the loading to true
        // if success set the loading to false
        // if error set the loading to false
        const api = new DefaultApi(new Configuration({ basePath: process.env.BASE_URL }))
        setLoading(true)
        api.createOnline({ onlineRequest }).then(() => {
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    return (<div>
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
                    <div className="mb-4 flex  flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="exchange">
                            Exchange
                        </label>
                        <div className="relative">
                            <select name='exchange' value={onlineRequest.exchange} onChange={e => {
                                setOnlineRequest({
                                    ...onlineRequest,
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
                                    const value = e.target.value as keyof typeof BotOrderType;
                                    setOnlineRequest({
                                        ...onlineRequest,
                                        botOrderType: BotOrderType[value]
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
                            <select name='mainInterval' value={onlineRequest.mainInterval} onChange={e => {
                                setOnlineRequest({
                                    ...onlineRequest,
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
                    <div className="mb-4 flex flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                            Bot name
                        </label>
                        <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="text1" type="text" placeholder="localhost:8088" value={onlineRequest.botName} onChange={e => {
                                setOnlineRequest({
                                    ...onlineRequest,
                                    botName: e.target.value
                                }
                                )
                            }} />
                    </div>
                    <div className="mb-4 flex flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                            Bot path
                        </label>
                        <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="text1" type="text" placeholder="localhost:8088" value={onlineRequest.botPath} onChange={e => {
                                setOnlineRequest({
                                    ...onlineRequest,
                                    botPath: e.target.value
                                }
                                )
                            }} />
                    </div>
                    <div className="mb-4 flex flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                            Prefetch bar
                        </label>
                        <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="text1" type="number" placeholder="150" value={onlineRequest.preFetchBar} onChange={e => {
                                setOnlineRequest({
                                    ...onlineRequest,
                                    preFetchBar: parseInt(e.target.value)
                                }
                                )
                            }} />
                    </div>
                    <div className="mb-4 flex flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                            Initiation balance
                        </label>
                        <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="text1" type="number" placeholder="1000$" value={onlineRequest.initBalance} onChange={e => {
                                setOnlineRequest({
                                    ...onlineRequest,
                                    initBalance: parseInt(e.target.value)
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
                                    function convertToIndicatorParam(input: string): { [key: string]: string } {
                                        const indicatorParam: { [key: string]: string } = {};
                                        const pairs = input.split('\n');

                                        for (const pair of pairs) {
                                            if (pair) { // Check if the pair is not an empty string
                                                const [key, value] = pair.split('=');
                                                indicatorParam[key] = value;
                                            }
                                        }

                                        return indicatorParam;
                                    }

                                    setOnlineRequest({
                                        ...onlineRequest,
                                        indicatorParam: convertToIndicatorParam(e.target.value)
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

    </div>)
}