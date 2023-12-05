"use client";
import { ColorForStatus } from "@/helpers/ColorHelper";
import { OrderTypeNameByType, RSIconUrlForOrderType, StatusByStatusID } from "@/helpers/IconUrlHelper";
import { clerkClient } from "@clerk/nextjs";
import { faCog, faEnvelope, faEye, faMagnifyingGlass, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Chip, CircularProgress, Divider, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {

    const [page, setPage] = useState(0);
    const [orders, setOrders] = useState([] as any);
    const [maxPage, setMaxPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const action_buttons = () => {   
        return <div style={{ pointerEvents: "none", cursor:"pointer" }}>
            <Tooltip color="primary" content="Details">
                <span style={{ marginRight: "5px" }} className="text-lg cursor-pointer active:opacity-50">
                    <FontAwesomeIcon icon={faEye} />
                </span>
            </Tooltip></div>;
    };

    useEffect(() => {
        setLoading(true);
        axios.post("/api/admin/orders/list", { page })
            .then(async res => {
                if (res.data.success) {
                    setOrders(res.data.orders);
                    setMaxPage(res.data.maxPage);
                    setLoading(false);
                }

            }).catch(err => {
                console.error(err)
            });
    }, [page]);

    return (

        <div className="view_orderlist">

            <ButtonGroup size="sm">
                <Button color="success" startContent={<FontAwesomeIcon size="sm" icon={faPlus} />}> Create new order</Button>
                <Button color="default" startContent={<FontAwesomeIcon size="sm" icon={faEye} />}> View order by ID</Button>
                <Button color="primary" startContent={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}> View orders by user</Button>
                <Button color="primary" variant="bordered" startContent={<FontAwesomeIcon size="sm" icon={faCog} />}> Set order options</Button>
            </ButtonGroup>
            <br />
            <br />
            <Divider />
            <br />
            <h4>Order Overview</h4>

            {isLoading ? <div className="loader"><CircularProgress size="lg" aria-label="Loading..." /></div> : <div>
                <Table>
                    <TableHeader>
                        <TableColumn>Order ID</TableColumn>
                        <TableColumn>User</TableColumn>
                        <TableColumn>Type</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.map((order: any, i: number) => {
                                return <TableRow key={i}>
                                    <TableCell># {order.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Image src={order.user.avatar} alt="" width={30} height={30} />
                                            &nbsp;&nbsp;{order.user.username} @{order.user.handle}
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ display: "flex" }}>
                                        <Image src={RSIconUrlForOrderType(order.type) as string} alt="" width={30} height={30} />
                                        &nbsp;&nbsp;{OrderTypeNameByType(order.type)}
                                    </TableCell>
                                    <TableCell><Chip color={ColorForStatus(order.status)}>{StatusByStatusID(order.status)}</Chip></TableCell>
                                    <TableCell onClick={() => { 
                                        // redirect(`/admin/orders/${order.id}`);
                                        // TODO: Fix this...
                                        window.location.href = `/admin/order/${order.id}`;
                                    }
                                    }>{action_buttons()}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>


                <div className="pagination">
                    <Pagination total={maxPage} page={page} onChange={e => { setPage(e) }} />
                </div>
            </div>}

        </div>

    )
};