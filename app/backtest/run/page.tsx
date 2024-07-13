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
import { usePagination } from "@table-library/react-table-library/pagination";
import { SortFn, useSort } from "@table-library/react-table-library/sort";

import router, { useRouter, useSearchParams } from "next/navigation";
function mergeSortState(sortKey: string, sortReverse: boolean) {
    return sortKey + (sortReverse == false ? '+' : '-');
}
const PAGE_SIZE = 30;
export const dynamicParams = true
export default function BackTestRun() {
    const router = useRouter()
    const params = useSearchParams()
    const ident = params.get("ident")
    const api = new DefaultApi(new Configuration({ basePath: process.env.BASE_URL }))
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [colums, setColumns] = useState([
        {
            label: 'pnl', renderCell: (item: BackTestRun) => {
                return item.pnl.toFixed(2)
            }, sort: { sortKey: "pnl" },
        },
        {
            label: 'fee', renderCell: (item: BackTestRun) => {
                return item.fee.toFixed(2)
            }, sort: { sortKey: "fee" },
        },
        {
            label: 'total', renderCell: (item: BackTestRun) => {
                return item.total.toFixed(2)
            }, sort: { sortKey: "total" },
        },
        { label: 'Win', renderCell: (item: BackTestRun) => item.numWin, sort: { sortKey: "numWin" }, },
        { label: 'Lose', renderCell: (item: BackTestRun) => item.numLoose, sort: { sortKey: "numLoose" }, },
        { label: 'Win streak', renderCell: (item: BackTestRun) => item.winStreak.toFixed(2), sort: { sortKey: "winStreak" }, },
        { label: 'Lose Streak', renderCell: (item: BackTestRun) => item.loseStreak.toFixed(2), sort: { sortKey: "loseStreak" }, },
        { label: 'Drawdown money', renderCell: (item: BackTestRun) => item.drawDownVal.toFixed(2), sort: { sortKey: "drawDownVal" }, },
        { label: 'Drawdown Percent', renderCell: (item: BackTestRun) => (item.drawDownPer * 100).toFixed(2) + '%', sort: { sortKey: "drawDownPer" }, },
        {
            label: 'Config', renderCell: (item: BackTestRun) => {
                const data = item.config
                return Object.keys(data).map(key => `${key}=${data[key]}`).join("\n");
            }
        },

    ] as Column<TableNode>[])

    const [data, setData] = useState({ nodes: [] })
    const sort = useSort(
        data,
        {
            state: {
                sortKey: 'total',
                reverse: true,
            },
            onChange: onSortChange,
        },
        {
            sortFns: [] as any as Record<string, SortFn>,
            isServer: true,
        }
    );

    function fetchData(page: number) {
        api.getBackTestRuns({ sortBy: mergeSortState(sort.state['sortKey'], sort.state['reverse']), ident: ident, page: page + '', pageSize: PAGE_SIZE + '' }).then(val => {
            const nodes = val.backTestRuns;
            setData({ nodes });
            setTotal(val.totalBackTestRun);
        }).finally(() => setIsLoading(false));
    }
    const select = useRowSelect(data, {
        onChange: (action, state) => {
            const btRun = data.nodes.find(r => r.id == state.id) as unknown as BackTestRun
            router.push(`/backtest/detail?ident=${btRun.ident}&position=${btRun.position}&len=${btRun.len}`)
        },
    });
    const theme = useTheme([
        getTheme(),
        {
            Table: `
              --data-table-library_grid-template-columns:  repeat(9,1fr) minmax(min-content, 150px);
            `,
        },
    ]);

    function onSortChange(action, state) {
        fetchData(1);
        setPage(1)
    }
    function prev() {
        if (page > 1) {
            setPage(page - 1)
            fetchData(page - 1)
        }
    }
    function next() {
        if (page * PAGE_SIZE < total) {
            setPage(page + 1)
            fetchData(page + 1)
        }

    }
    useEffect(() => {
        fetchData(1);
    }, [])
    return (
        <div>
            {isLoading ? <div className='overlay'></div> :
                <div className={"flex-col"}>
                    <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                        <p className='underline underline-offset-8 uppercase '>BackTest overrall</p>
                    </div>
                    <div className="px-8 pt-6 pb-2 mb-1 text-lg font-mono flex justify-between">
                        <div className="py-2 px-4"> {total} Back test ran </div>
                        <div className="flex gap-1">
                            <div><button onClick={prev} className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Previous
                            </button> </div>
                            <div><button onClick={next} className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Next
                            </button> </div>
                        </div>

                    </div>
                    <div className="px-8 pb-8 mb-4" style={{ "maxWidth": "1200px", "maxHeight": "1200px" }}>
                        <CompactTable columns={colums} data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }} select={select} sort={sort} />
                    </div>
                </div>
            }

        </div >
    )
}

