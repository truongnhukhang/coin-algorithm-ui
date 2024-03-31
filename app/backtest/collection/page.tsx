'use client'
import { useEffect, useState } from "react"
import { DefaultApi } from "../../data/apis/DefaultApi"
import { BackTest } from "../../data/models"
import { Column, CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Configuration } from "@/app/data/runtime";
import { TableNode } from "@table-library/react-table-library/types/table";
import Link from "next/link";

export default function BackTestCollection() {
    const [isLoading, setIsLoading] = useState(true)
    const [colums, setColumns] = useState([
        {
            label: 'Bot name', renderCell: (item: BackTest) => {
                return item.botPath?.split('/')[item.botPath.split('/').length - 1]
            }
        },
        {
            label: 'Bot config', renderCell: (item: BackTest) => {
                const data = item.backTestRequest?.indicatorParam
                return Object.keys(data).map(key => `${key}=${data[key]}`).join(";");
            }
        },
        {
            label: 'Date Created', renderCell: (item) => Intl.DateTimeFormat('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(item.priority)
        },
        { label: 'Status', renderCell: (item) => item.status },
        { label: 'Note', renderCell: (item) => item.note }
    ] as Column<TableNode>[])
    const [ids, setIds] = useState([]);

    const handleExpand = (item) => {
        if (ids.includes(item.id)) {
            setIds(ids.filter((id) => id !== item.id));
        } else {
            setIds(ids.concat(item.id));
        }
    };
    const ROW_PROPS = {
        onClick: handleExpand,
    };

    const ROW_OPTIONS = {
        renderAfterRow: (item: BackTest) => {
            const data = item.backTestRequest?.indicatorParam
            const config = Object.keys(data).map(key => `${key}=${data[key]}`).join(";");
            return (

                <>
                    {ids.includes(item.id) && (
                        <tr style={{ display: "flex", gridColumn: "1 / -1" }}>

                            <td style={{ flex: "1" }}>
                                <ul
                                    style={{
                                        margin: "3px",
                                        padding: "4px",
                                        backgroundColor: "rgb(241 241 241)",
                                    }}
                                >
                                    <li>
                                        <div className="flex flex-row gap-y-4 gap-x-2">
                                            <strong className="pd-4 flex-none w-32">Bot name </strong>
                                            <div>{item.botPath}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-row gap-y-4 gap-x-2"><strong className="pd-4 flex-none w-32">Bot config</strong><div>{config}</div></div>

                                    </li>
                                    <li>
                                        <div className="flex flex-row gap-y-4 gap-x-2"><strong className="pd-4 flex-none w-32">Bot note</strong><div className="text-sm">{item.note}</div></div>
                                    </li>
                                    <li>
                                        <div className="flex flex-row gap-y-4 gap-x-2 mt-4 mb-4 justify-center">
                                            <Link href={`run/${item.ident}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Detail
                                            </button></Link>
                                            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Delete
                                            </button>
                                        </div>
                                    </li>

                                </ul>
                            </td>
                        </tr>
                    )}
                </>
            )
        },
    };
    const [data, setData] = useState({})
    const theme = useTheme([
        getTheme(),
        {
            Table: `
              --data-table-library_grid-template-columns:  minmax(min-content,25%) 30% 15% 10% 20%;
            `,
        },
    ]);
    useEffect(() => {
        const api = new DefaultApi(new Configuration({ basePath: process.env.BASE_URL }))
        api.getBackTests({ page: '1', pageSize: '100' }).then(val => {
            const nodes = val
            setData({ nodes })
        }).finally(() => setIsLoading(false))

    }, [])

    return (
        <div>
            {isLoading ? <div className='overlay'></div> :
                <div className={"md:container flex-col"}>
                    <div className='font-thin text-gray-900 text-2xl font-mono px-8 pt-6 pb-8 mb-4'>
                        <p className='underline underline-offset-8 uppercase '>Your BackTests</p>
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4" style={{ "max-width": "1200px" }}>
                        <CompactTable columns={colums} data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }} rowProps={ROW_PROPS}
                            rowOptions={ROW_OPTIONS} />
                    </div>
                </div>
            }

        </div>
    )
}