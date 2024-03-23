import { useState } from "react"
import { DefaultApi } from "@/app/data/apis/DefaultApi"
import { BackTest } from "@/app/data/models"
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

export default function BackTestCollection() {
    const [backTestCollection, setBackTestCollection] = useState([] as BackTest[])
    const [isLoading, setIsLoading] = useState(true)
    const api = new DefaultApi()
    api.getBackTests().then(val => {
        setBackTestCollection(val)
    }).finally(() => setIsLoading(true))
    const COLUMNS = [
        { label: 'Bot name', renderCell: (item: BackTest) => { if (item.botPath) { item.botPath.split("/").findLast } } },
        { label: 'Bot config', renderCell: (item: BackTest) => { if (item.backTestRequest?.indicatorParam) { item.backTestRequest?.indicatorParam } } },
        { label: 'Date Created', renderCell: (item: BackTest) => { if (item.priority) { Intl.DateTimeFormat('sv-SE').format(item.priority) } } }
    ]
    const theme = useTheme(getTheme());
    return <>
        <div>
            {isLoading ? <div className='overlay'></div> : ''}
            <div className={"md:container flex-col"}>
                <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                    <p className='underline underline-offset-8 uppercase '>Your BackTests</p>
                </div>
                <div className="px-8 pt-6 pb-8 mb-4">
                    <CompactTable columns={COLUMNS} data={backTestCollection} theme={theme} />;
                </div>
            </div>
        </div>
    </>
}