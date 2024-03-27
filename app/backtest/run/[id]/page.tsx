'use client'
import { DefaultApi } from "@/app/data/apis/DefaultApi"
import { BackTestRun } from "@/app/data/models"
import { Configuration } from "@/app/data/runtime"
import { Column, CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { TableNode } from "@table-library/react-table-library/types/table"
import { useEffect, useState } from "react"
import { useRowSelect } from "@table-library/react-table-library/select";
import { redirect } from "next/navigation";

export default function BackTestRun({ params }: { params: { id: string } }) {
    const ident = params.id
    const [isLoading, setIsLoading] = useState(true)

    const [colums, setColumns] = useState([
        {
            label: 'pnl', renderCell: (item: BackTestRun) => {
                return item.pnl.toFixed(2)
            }
        },
        {
            label: 'fee', renderCell: (item: BackTestRun) => {
                return item.fee.toFixed(2)
            }
        },
        {
            label: 'total', renderCell: (item: BackTestRun) => {
                return item.total.toFixed(2)
            }
        },
        { label: 'Win', renderCell: (item: BackTestRun) => item.numWin },
        { label: 'Lose', renderCell: (item: BackTestRun) => item.numLoose },
        { label: 'Win streak', renderCell: (item: BackTestRun) => item.winStreak.toFixed(2) },
        { label: 'Lose Streak', renderCell: (item: BackTestRun) => item.loseStreak.toFixed(2) },
        { label: 'Drawdown money', renderCell: (item: BackTestRun) => item.drawDownVal.toFixed(2) },
        { label: 'Drawdown Percent', renderCell: (item: BackTestRun) => (item.drawDownPer * 100).toFixed(2) + '%' },
        {
            label: 'Config', renderCell: (item: BackTestRun) => {
                const data = item.config
                return Object.keys(data).map(key => `${key}=${data[key]}`).join("\n");
            }
        },

    ] as Column<TableNode>[])

    const [data, setData] = useState({ nodes: [], })
    const select = useRowSelect(data, {
        onChange: onSelectChange,
    });
    function onSelectChange(action, state) {
        const btRun = data.nodes.find(r => r.id == state.id) as unknown as BackTestRun
        redirect(`/backtest/detail/${btRun.ident}?position=${btRun.position}&len=${btRun.len}`)
    }
    const theme = useTheme([
        getTheme(),
        {
            Table: `
              --data-table-library_grid-template-columns:  repeat(9,1fr) minmax(min-content, 150px);
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
                <div className={"flex-col"}>
                    <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                        <p className='underline underline-offset-8 uppercase '>BackTest overrall</p>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4" style={{ "max-width": "1200px" }}>
                        <CompactTable columns={colums} data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }} select={select} />
                    </div>
                </div>
            }

        </div >
    )
}

