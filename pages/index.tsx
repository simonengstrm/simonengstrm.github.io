import React, {useState} from 'react';

function Header() {

    return (
        <div className="mt-10 ml-10 mr-10 mb-5">
            <p className="text-6xl tracking-wide font-bold">SIMON ENGSTRÖM</p>
            <p className="italic text-slate-400">aka simpen, sien, lillelink</p>
        </div>
    )
}

function Content() {

    return (
        <div className="grid place-content-right ml-10 mr-10">
            <p className="font-bold text-3xl">About me</p>
            <p>I am a 21 year-old student currently residing in Gothenburg, Sweden, 
            where I study Software Engineering at Chalmers University of Technology. I am a hard working, social and open person.
            In my spare time I enjoy developing hobby projects, listening to music and socializing.</p> 

            <div className="place-content-start flex flex-wrap -mx-3 overflow-hidden divide-x-2 divide-slate-400">
                <div className="my-3 px-3 w-1/2 overflow-hidden space-y-4">
                    <p className="font-bold text-3xl underline">School</p>
                    <div>
                        <p className="text-2xl">Chalmers University of Technology</p>
                        <p className="italic text-slate-400">2020 → now</p>
                        <p>I am currently studying my second year at Chalmers University of Technology, pursuing a bachelors degree,
                        then a masters degree in Software Engineering.</p>
                    </div>

                    <div>
                        <p className="text-2xl">NTI-Gymnasiet Skövde</p>
                        <p className="italic text-slate-400">2016 → 2019</p>
                        <p>I studied information technology with software development specialization. 
                        During the third year I was a student ambassador for the school.
                        When graduating, I was awarded with best <a className="underline hover:text-slate-300" href="https://github.com/LilleLink/Gravity">graduation project</a>, 
                        best grades, and became valedictorian. 
                        </p>
                    </div>

                </div>
                <div className="my-3 px-3 w-1/2 overflow-hidden space-y-4">
                    <p className="font-bold text-3xl underline">Work</p>

                    <div>
                        <p className="text-2xl">Dialect IT Solutions</p>
                        <p className="italic text-slate-400">Technician/Developer: August 2020 → now</p>
                        <p>Meanwhile studying at Chalmers in Gothenburg, I remain a part-time employee at Dialect, working with support during summers and 
                        development of smaller features when I get the chance and find the time.
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl">Dialect IT Solutions</p>
                        <p className="italic text-slate-400">Technician: June 2019 → August 2020</p>
                        <p>After graduating high school I immediately started working full time as a technician. Here I developed skills in customer service
                        , and management of servers, network infrastructure and VoIP/Switchboard systems.
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl">Dialect IT Solutions</p>
                        <p className="italic text-slate-400">Part time: June 2016 → 2019</p>
                        <p>After graduating elementary school I worked summers and other holidays, assisting the technicians at Dialect in Skövde. I worked
                        mainly with maintenence of network equipment and internal systems. I continued to do this my entire high school period since it was
                        an unique opportunity for me to gain work experience, and I absolutely loved the workplace and the colleagues.
                        </p>
                    </div>

                </div>
            </div>
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
