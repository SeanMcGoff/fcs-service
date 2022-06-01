import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CauseArea, Service } from '@prisma/client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useRef } from 'react'
import beautifyCauseArea from '../lib/util'
import Link from 'next/link';

interface Props {
    onSubmit: (data: any) => void
    serviceNames: string[]
    oldService: Service
}

type FormInputs = {
    name: string
    causeArea: CauseArea
    work: string | null
    address: string
    email: string
    phone: string
    maxStudents: number
    availableStudentSlots: number
    published: boolean
    reminded: boolean
    notes: string | null
}

const ServiceForm = (props: Props) => {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            name: props.oldService.name,
            causeArea: props.oldService.causeArea,
            work: props.oldService.work,
            address: props.oldService.address,
            email: props.oldService.email,
            phone: props.oldService.phone,
            maxStudents: props.oldService.maxStudents,
            availableStudentSlots: props.oldService.availableStudentSlots,
            published: props.oldService.published,
            reminded: props.oldService.reminded,
            notes: props.oldService.notes
        }
    });

    const emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const inputClassName = "appearance-none block w-full bg-gray-200 text-gray-700 border \
    border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    const checkboxClassName = "block form-check-input appearance-none h-4 w-4 border border-gray-300 \
    rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition \
    duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mx-auto cursor-pointer"
    
    const uniqueName = (name: string) => !(props.serviceNames.includes(name)) || name == props.oldService.name
    const leqmaxStudents = (as: number) => as < getValues("maxStudents")

    return (
        <>
        <form className="w-full max-w-lg mx-auto p-2" onSubmit={handleSubmit(props.onSubmit)}>
        <h2 className="text-2xl text-center mg-6"><b>Create a Service</b></h2>
            <div className="flex flex-wrap -mx-3 mb-6">
                <h3 className="w-full text-center md:w-full px-3 mb-6 md:mb-2">
                Anyone can see this information ⬇️</h3>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Name*
                        <input className={inputClassName} {...register("name", { required: true , validate: uniqueName})}
                        id="name" type="text" placeholder="Knot Reel Service">
                        </input>
                        {errors.name?.type === 'required' && <span className="text-red-500">Service Name Required</span>}
                        {errors.name?.type === 'validate' && <span className="text-red-500">Name Already Exists</span>}
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Cause Area*
                        <select className={inputClassName} {...register("causeArea", { required: true })}
                        id="causeArea">
                            {Object.keys(CauseArea).map(key => (
                                <option key={key} value={key}>
                                    {beautifyCauseArea(CauseArea[key as keyof typeof CauseArea])}
                                </option>

                            ))}
                        </select>
                        {errors.causeArea && <span className="text-red-500">Cause Area Required</span>}
                    </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Work
                        <textarea style={{resize: "none"}} className={inputClassName} {...register("work")}
                        id="work" placeholder="What does the work entail at this Service Opportunity?">
                        </textarea>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Address*
                        <input className={inputClassName} {...register("address", { required: true })}
                        id="address" type="text" placeholder="1234 Avenue Rd.">
                        </input>
                        {errors.address && <span className="text-red-500">Address Required</span>}
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email*
                        <input className={inputClassName} {...register("email", { required: true, pattern: emailRegExp})}
                        id="email" type="email" placeholder="service@example.com">
                        </input>
                        {errors.email?.type === 'required' && <span className="text-red-500">Email Required</span>}
                        {errors.email?.type === 'patten' && <span className="text-red-500">Invalid Email</span>}
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Phone Number*
                        <input className={inputClassName} {...register("phone", { required: true })}
                        id="phone" type="tel"  placeholder="123-456-7890">
                        </input>
                        {errors.phone && <span className="text-red-500">Phone Number Required</span>}
                    </label>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Max Slots*
                        <input className={inputClassName} {...register("maxStudents", { required: true, min: 1, max: 99 })}
                        id="maxStudents" type="number"  placeholder="10">
                        </input>
                        {errors.maxStudents?.type === 'required' && <span className="text-red-500">Field Required</span>}
                        {errors.maxStudents?.type === 'min' && <span className="text-red-500">Must be at least 1</span>}
                        {errors.maxStudents?.type === 'max' && <span className="text-red-500">Must be at most 99</span>}
                    </label>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        # Available*
                        <input className={inputClassName} {...register("availableStudentSlots", { required: true, min: 0, validate: leqmaxStudents})}
                        id="availableStudentSlots" type="number"  placeholder="10">
                        </input>
                        {errors.availableStudentSlots?.type === 'required' && <span className="text-red-500">Field Required</span>}
                        {errors.availableStudentSlots?.type === 'min' && <span className="text-red-500">Must be at least 0</span>}
                        {errors.availableStudentSlots?.type === 'validate' && <span className="text-red-500">Must be less than or equal to Max Slots</span>}
                    </label>
                </div>
                <h3 className="w-full text-center md:w-full px-3 mb-6 md:mb-2">
                Only administrators can see this information ⬇️</h3>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-center form-check">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Publish Service?
                        <input className={checkboxClassName} {...register("published")}
                        id="published" type="checkbox">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-center form-check">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Reminded Service Coordinator? 
                        <input className={checkboxClassName} {...register("reminded")}
                        id="published" type="checkbox">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Notes
                        <textarea style={{resize: "none"}} className={inputClassName} {...register("notes")}
                        id="work" placeholder="This field is for other notes on this service.">
                        </textarea>
                    </label>
                </div>
                <input type="submit" className="button bg-emerald-300 hover:bg-emerald-400 p-2 rounded-md mx-auto" value="Update Service"></input>
                <Link href="/"><a type="button" className="button bg-red-300 hover:bg-red-400 p-2 rounded-md mx-auto">Cancel Changes</a></Link>
            </div>
        </form>
        </>
    )
}

export default withPageAuthRequired(ServiceForm)