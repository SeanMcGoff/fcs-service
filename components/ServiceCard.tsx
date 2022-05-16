import { Service } from '@prisma/client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import beautifyCauseArea from '../lib/util';

interface ServiceCardProps {
    service: Service;
    editable: boolean;
}

export default function ServiceCard(props: ServiceCardProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.editable)
    })

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)} className="block py-6 w-2/5 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 my-2 mx-auto">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 inline">{props.service.name}</h5>
                <p className={"font-normal text-gray-700 "+(props.editable ? "mb-2" : "")}>{props.service.address}</p>
                {props.editable && 
                <span>
                    {!props.service.published ? 
                    <a href={"/publish/"+props.service.id} 
                    className="border rounded p-2 mr-1 bg-green-100 hover:bg-green-200">Publish</a>
                    : 
                    <a href={"/unpublish/"+props.service.id} 
                    className="border rounded p-2 mr-1 bg-blue-100 hover:bg-blue-200">Unpublish</a>}
                    <a href={"/edit/"+props.service.id} 
                    className="border rounded py-2 pr-3 pl-1 mr-1 bg-yellow-100 hover:bg-yellow-200">Edit ✏️</a>
                    <a href={"/delete/"+props.service.id} 
                    className="border rounded py-2 pr-3 pl-1 ml-1 bg-red-200 hover:bg-red-300">Delete 🗑️</a>
                </span>
                }    
            </button>
            {showModal &&
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center mr-2">
                                        {props.service.name}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p>
                                        <span className="text-2xl font-medium">Cause Area: </span>
                                        <span className="text-lg text-slate-700">
                                            {beautifyCauseArea(props.service.causeArea)}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-2xl font-medium">Work: </span>
                                        <span className="text-lg text-slate-700">
                                            {props.service.work ? props.service.work : "Unknown"}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-2xl font-medium">Address: </span>
                                        <span className="text-lg text-slate-700">
                                            {props.service.address ?
                                                <a className="text-blue-500 hover:text-blue-600 text-decoration-line: underline"
                                                    href={"https://maps.google.com/?q=" + props.service.address}>
                                                    {props.service.address}
                                                </a>
                                                : "Unknown"}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-2xl font-medium">Available Slots: </span>
                                        <span className="text-lg text-slate-700">
                                            {props.service.availableStudentSlots + "/" + props.service.maxStudents}
                                        </span>
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <a type="button" className="button shadow-md border-1 p-2 rounded-md mx-2 bg-blue-200 hover:bg-blue-300"
                                        href={"mailto:" + props.service.email}>Email Service</a>
                                    <a type="button" className="button shadow-md border-1 p-2 rounded-md mx-2 bg-green-200 hover:bg-green-300"
                                        href={"tel:" + props.service.phone}>Call Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>}
        </>
    )
}

