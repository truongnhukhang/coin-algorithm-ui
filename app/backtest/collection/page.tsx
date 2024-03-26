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
                                        backgroundColor: "#e0e0e0",
                                    }}
                                >
                                    <li>
                                        <Link href={`run/${item.ident}`}><strong>Bot name:</strong></Link> {item.botPath}
                                    </li>
                                    <li>
                                        <strong>Bot config:</strong> {config}
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
              --data-table-library_grid-template-columns:  25% 25% 20% 10% 20%;
            `,
        },
    ]);
    useEffect(() => {
        const api = new DefaultApi(new Configuration({ basePath: process.env.BASE_URL }))
        api.getBackTests().then(val => {
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
                    <div className="px-8 pt-6 pb-8 mb-4">
                        <CompactTable columns={colums} data={data} theme={theme} layout={{ custom: true, }} rowProps={ROW_PROPS}
                            rowOptions={ROW_OPTIONS} />
                    </div>
                </div>
            }

        </div>
    )
}