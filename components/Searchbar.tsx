import beautifyCauseArea from "../lib/util"
import { CauseArea } from "@prisma/client";
import React from "react";

interface SearchbarProps {
    query: string;
    ca: string;
    onQueryChange: (e: any) => void;
    onCaChange: (e: any) => void;
}

export default function Searchbar(props: SearchbarProps) {

    // I'll figure out the type for e later

    function handleQueryChange(e: any) {
        props.onQueryChange(e.target.value);
    }

    function handleCaChange(e: any) {
        props.onCaChange(e.target.value);
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                <div className="my-3 col-span-2">
                    <div className="input-group relative flex flex-wrap items-stretch w-full rounded">
                        <input type="search" value={props.query} onChange={handleQueryChange}
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base \
                        font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 \
                        rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 \
                        focus:outline-none"
                            placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
                        </input>
                    </div>
                </div>
                <select id="cause-area" value={props.ca} onChange={handleCaChange}
                    className="col-span-1 my-3 border-2 rounded-md">
                    <option key="ANY" value="ANY">Any Cause</option>
                    {Object.keys(CauseArea).map(key => (
                        <option key={key} value={key}>
                            {beautifyCauseArea(CauseArea[key as keyof typeof CauseArea])}
                        </option>

                    ))}
                </select>
            </div>
        </>

    )
}