'use client'
import BackTestResultVirtualization from "@/app/component/result";
import { DefaultApi } from "@/app/data/apis/DefaultApi";
import { BackTestResult } from "@/app/data/models";
import { Configuration } from "@/app/data/runtime";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function BackTestResultDetail({ params }: { params: { id: string } }) {
    const [backTestResult, setBackTestResult] = useState({} as unknown as BackTestResult)
    const [isLoading, setIsLoading] = useState(true)
    const searchParams = useSearchParams();
    useEffect(() => {
        const api = new DefaultApi(new Configuration({ basePath: process.env.BASE_URL }))
        api.getBackTestResult({ ident: params.id, position: searchParams.get('position') + "", len: searchParams.get('len') + "" }).then(val => {
            setBackTestResult(val)
        }).finally(() => setIsLoading(false))
    }, [])
    return (<>
        <div>
            {isLoading ? <div className='overlay'></div> :
                <div className={"flex-col"}>
                    <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                        <p className='underline underline-offset-8 uppercase '>BackTest Detail</p>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4" >
                        <BackTestResultVirtualization {...backTestResult}></BackTestResultVirtualization>
                    </div>
                </div>
            }

        </div >
    </>)
}