'use client'
import { DefaultApi } from "@/app/data/apis/DefaultApi"
import { BackTestRun } from "@/app/data/models"
import { Configuration } from "@/app/data/runtime"
import { Column, CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { TableNode } from "@table-library/react-table-library/types/table"
import { useEffect, useState } from "react"

export default function BackTestRun({ params }: { params: { id: string } }) {
    const ident = params.id
    const [isLoading, setIsLoading] = useState(true)

    const [colums, setColumns] = useState([
        {
            label: 'pnl', renderCell: (item: BackTestRun) => {
                return item.pnl
            }
        },
        {
            label: 'fee', renderCell: (item: BackTestRun) => {
                return item.fee
            }
        },
        {
            label: 'total', renderCell: (item: BackTestRun) => {
                return item.total
            }
        },
        { label: 'Win', renderCell: (item: BackTestRun) => item.numWin },
        { label: 'Lose', renderCell: (item: BackTestRun) => item.numLoose },
        { label: 'Win streak', renderCell: (item: BackTestRun) => item.winStreak },
        { label: 'Lose Streak', renderCell: (item: BackTestRun) => item.loseStreak },
        { label: 'Drawdown money', renderCell: (item: BackTestRun) => item.drawDownVal },
        { label: 'Drawdown Percent', renderCell: (item: BackTestRun) => item.drawDownPer },
        {
            label: 'Config', renderCell: (item: BackTestRun) => {
                const data = item.config
                return Object.keys(data).map(key => `${key}=${data[key]}`).join(";");
            }
        },

    ] as Column<TableNode>[])
    const [data, setData] = useState({})
    const theme = useTheme([
        getTheme(),
        {
            Table: `
              --data-table-library_grid-template-columns:  25% 25% 20% 10% 20%;
            `,
        },
    ]);
    useEffect(() => {
        const api = new DefaultApi(new Configuration({ basePath: process.env.BASE_URL }))
        api.getBackTestRuns({ sortBy: 'pnl', ident: ident }).then(val => {
            const nodes = val
            setData({ nodes })
        }).finally(() => setIsLoading(false))

    }, [])
    return (
        <div>
            {isLoading ? <div className='overlay'></div> :
                <div className={"md:container flex-col"}>
                    <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                        <p className='underline underline-offset-8 uppercase '>BackTest overrall</p>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4">
                        <CompactTable columns={colums} data={data} theme={theme} />
                    </div>
                </div>
            }

        </div>
    )
}