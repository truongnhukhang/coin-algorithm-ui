import { createChart } from 'lightweight-charts';
import Image from 'next/image'
import { useRef } from 'react';

export default function BackTestRequestPage() {

    return (
        <div className="md:container flex-col">
            <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                <p>Submit back test request</p>
            </div>
            <div className="w-1/2">
                <form className="bg-white rounded px-8 pb-8 mb-4">
                    <div className="mb-4 flex flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                            Start date
                        </label>
                        <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text1" type="text" placeholder="Text 1" />
                    </div>
                    <div className="mb-4 flex flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="text1">
                            End date
                        </label>
                        <input className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text1" type="text" placeholder="Text 1" />
                    </div>

                    <div className="mb-4 flex  flex-row items-center">
                        <label className="basis-1/4 text-gray-700 text-sm font-bold mb-2 mr-3" htmlFor="exchange">
                            Exchange
                        </label>
                        <div className="relative">
                            <select className="flex-1 appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="exchange">
                                <option>Binance</option>
                                <option>OKX</option>
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
                            <select className="flex-1 appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="bot-order-type">
                                <option>Market</option>
                                <option>Limit Order</option>
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
                            <select className="flex-1 appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="candle-interval">
                                <option>5m</option>
                                <option>15m</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-5h12l-6 5z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
