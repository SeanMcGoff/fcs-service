import React from 'react'

interface NavbarProps {
    loggedIn: boolean
    creatingService: boolean
}

export default function Navbar(props: NavbarProps) {
    return (
        <nav className="w-full z-10 top-0 py-2 mb-2 bg-slate-300 rounded-b-lg px-4 flex">
            <div className="lg:w-1/4 md:w-1/2">
                <h1 className="text-3xl w-fit m-0">FCS Service</h1>
                A service project by <a className="font-semibold" href="https://github.com/SeanMcGoff">Sean McGoff</a>
            </div>
            <div className="lg:w-1/4 md:w-1/2 ml-auto text-right">
                {props.loggedIn ? <a href={props.creatingService ? "/" : "/create_service"}
                className={(props.creatingService ? "bg-slate-200 hover:bg-slate-300 " 
                :"bg-emerald-300 hover:bg-emerald-400 ")+
                "text-gray-800 font-semibold py-2 px-4 lg:mr-2 md:mr-0 rounded shadow inline-block"}>
                    {props.creatingService ? "Back to Services" : "+ Create Service"}
                </a> : null}
                {props.loggedIn && !props.creatingService ?
                <a href={"/api/csv"}
                className="bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold py-2 px-4 lg:mr-2 md:mr-0 rounded shadow inline-block">
                Export to CSV</a> : null}
                <a href={props.loggedIn ? "/api/auth/logout" : "/api/auth/login"}
                className="bg-slate-200 hover:bg-slate-300 text-gray-800 font-semibold py-2 px-4 rounded shadow inline-block">
                    {props.loggedIn ? "Logout" : "Login"}
                </a>
            </div>   
        </nav>
    )
}
