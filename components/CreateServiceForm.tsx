import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CauseArea, Service } from '@prisma/client'
import React from 'react'
import beautifyCauseArea from '../lib/util'


const ServiceForm = () => {
    const inputClassName = "appearance-none block w-full bg-gray-200 text-gray-700 border \
    border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    const checkboxClassName = "block form-check-input appearance-none h-4 w-4 border border-gray-300 \
    rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition \
    duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mx-auto cursor-pointer"
    return (
        <>
        
        <form className="w-full max-w-lg mx-auto p-2">
        <h2 className="text-2xl text-center mg-6"><b>Create a Service</b></h2>
            <div className="flex flex-wrap -mx-3 mb-6">
                <h3 className="w-full text-center md:w-full px-3 mb-6 md:mb-2">
                Anyone can see this information ⬇️</h3>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Name*
                        <input className={inputClassName}
                        id="name" type="text" placeholder="Knot Reel Service">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Cause Area*
                        <select className={inputClassName}
                        id="causeArea">
                            {Object.keys(CauseArea).map(key => (
                                <option key={key} value={key}>
                                    {beautifyCauseArea(CauseArea[key as keyof typeof CauseArea])}
                                </option>

                            ))}
                        </select>
                    </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Work
                        <textarea style={{resize: "none"}} className={inputClassName} 
                        id="work" placeholder="What does the work entail at this Service Opportunity?">
                        </textarea>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Address*
                        <input className={inputClassName} 
                        id="address" type="text" placeholder="1234 Avenue Rd.">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email*
                        <input className={inputClassName} 
                        id="email" type="email" placeholder="service@example.com">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Phone Number*
                        <input className={inputClassName} 
                        id="phoneNumber" type="tel"  placeholder="123-456-7890">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Max Slots*
                        <input className={inputClassName} 
                        id="maxStudents" type="number"  placeholder="10">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        # Available*
                        <input className={inputClassName} 
                        id="available" type="number"  placeholder="10">
                        </input>
                    </label>
                </div>
                <h3 className="w-full text-center md:w-full px-3 mb-6 md:mb-2">
                Only administrators can see this information ⬇️</h3>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-center form-check">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Publish Service?
                        <input className={checkboxClassName}
                        id="published" type="checkbox">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-center form-check">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Reminded Service Coordinator?
                        <input className={checkboxClassName}
                        id="published" type="checkbox">
                        </input>
                    </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Notes
                        <textarea style={{resize: "none"}} className={inputClassName} 
                        id="work" placeholder="This field is for other notes on this service.">
                        </textarea>
                    </label>
                </div>
                <input type="submit" className="button bg-emerald-300 hover:bg-emerald-400 p-2 rounded-md mx-auto" value="Create Service"></input>
            </div>
        </form>
        </>
    )
}

export default withPageAuthRequired(ServiceForm)