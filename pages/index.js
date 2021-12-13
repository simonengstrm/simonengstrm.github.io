import React, {useState} from 'react';

function Header() {

    return (
        <div className="m-10">
            <p className="text-6xl tracking-wide font-bold">SIMON ENGSTRÖM</p>
            <p className="italic text-slate-400">aka simpen, sien, kingen</p>
        </div>
    )
}

function Content() {

    return (
        <div className="grid place-content-right ml-10 mr-10">
            <p className="font-bold text-3xl">About me</p>
            <p className="font-thin">I am a 21 year-old student currently residing in Gothenburg, Sweden, 
            where I study Software Engineering at Chalmers University of Technology.</p> 
        </div>
    )
}

export default function Home() {

    return (
        <div>
            <Header/>
            <Content/>
        </div>
    )
}
