import React, {useState} from 'react';
import github from '../public/icons/github.png';
import linkedin from '../public/icons/linkedin.png';
import profile from '../public/icons/profile.jpeg'
import mail from '../public/icons/mail.png'

function Header() {

    function random() {
        let titles : string[] = ["Chalmers SE student", "Software Engineering student", "Dark Mode Enthusiast", "Github Streak Addict"];
        let randomIndex : number = Math.floor(Math.random()*titles.length);
        return titles[randomIndex];
    }

    return (
        <div>
            <div className="flex md:gap-x-4 flex-col gap-y-4 md:flex-row md:auto-cols-min md:items-center">
                <div className="min-w-fit">
                    <img src={profile.src} className="md:w-36 md:visible invisible w-0 rounded-full bg-blend-darken"/>
                </div>
                <div className="flex flex-col">
                    <div>
                        <p className="text-6xl tracking-wide font-bold">SIMON ENGSTRÖM</p>
                        <p suppressHydrationWarning className="text-slate-400 tracking-wide -mt-2"> - {random()}</p>
                    </div>
                    <div>
                        <Links centered={false}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Links(props) {
    let centered = props.centered;

    function Link(props) {
        let href : string = props.href;
        let image : StaticImageData = props.image;
        let width : number = props.width;

        return (
            <a target="_blank" rel="noreferrer" href={href}>
                <img className="transition duration-150 ease-in-out hover:scale-110" src={image.src} width={width}/>
            </a>
        )
    }

    return (
        <div className={"grid grid-flow-col auto-cols-max gap-x-2" + (centered ? " justify-center" : "")}>
            <Link href="https://github.com/lillelink" image={github} width={40}/>
            <Link href="https://www.linkedin.com/in/simon-engstr%C3%B6m-218622199/" image={linkedin} width={40}/>
            <Link href="mailto:simon_0_0_@live.se" image={mail} width={48}/>
        </div>
    )
}

function About() {

    function calcAge() {
        var bday = new Date(2000,10,17);
        var ageDiffMilliseconds = Date.now() - bday.getTime();
        var ageDate = new Date(ageDiffMilliseconds);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <div>
            <p className="font-bold text-3xl">Hi! 👋</p>
            <p className="font-serif">I am a {calcAge()} year-old student currently residing in Gothenburg, Sweden,
            where I study Software Engineering at Chalmers University of Technology. I am a dedicated, social and open person.
            In my spare time I enjoy developing hobby projects, listening to music and socializing.</p>
        </div> 
    )
}

function Technologies() { 

    return ( 
        <div>
            <p className="font-bold text-3xl">Languages/tools 🧠</p>
            <div className="flex columns-3 gap-x-10">
                <ul>
                    <li>Java</li>
                    <li>Haskell</li>
                    <li>TypeScript</li>
                    <li>JavaScript</li>
                    <li>CSS</li>    
                </ul>
                <ul>
                    <li>Git</li>
                    <li>Maven</li>
                    <li>node.js</li>
                    <li>express</li>
                    <li>Java-FX</li>
                </ul>
                <ul>
                    <li>Swedish 🇸🇪</li>
                    <li>English 🇬🇧</li>
                </ul>            
            </div>
        </div>
    )
}

function AwardsAndCertificates() {
    
    return (
        <div>
            <p className="font-bold text-3xl">Awards/certificates 🏆</p>
            <p>Valedictorian <span className="text-slate-400 italic">- NTI Gymnasiet Skövde 2019</span></p>
            <p>Best Graduation Project <span className="text-slate-400 italic">- NTI Gymnasiet Skövde 2019</span></p>
            <p>Mikrotik Certified Network Associate (MTCNA) <span className="text-slate-400 italic">- Mikrotik, 2020</span></p>
            <p>Rotary Youth Leadership Award <span className="text-slate-400 italic">- Rotary Skövde, 2018</span></p>
            <p>Best Grades <span className="text-slate-400 italic">- NTI Gymnasiet Skövde 2019</span></p>
        </div>
    )
}

function Content() {

    return (
        <div className="grid place-content-start">
            <div className="grid grid-cols-1 overflow-hidden space-y-10 lg:space-y-0 lg:divide-slate-400 lg:grid-cols-2 lg:gap-x-10">
                <div className="space-y-5">
                    <p className="font-bold text-3xl border-b-2 border-divider">Work experience 👨‍💻</p>

                    <div>
                        <p className="text-2xl">Dialect IT Solutions</p>
                        <p className="italic text-slate-400">Technician/Developer: August 2020 → now</p>
                        <p className="font-serif">While studying at Chalmers in Gothenburg, I remain a part-time employee at Dialect, working with support during summers and 
                        development of smaller features when I get the chance and find the time.
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl">Dialect IT Solutions</p>
                        <p className="italic text-slate-400">Technician: June 2019 → August 2020</p>
                        <p className="font-serif">After graduating high school I immediately started working full time as a technician. Here I developed skills in customer service
                        , and management of servers, network infrastructure and VoIP/Switchboard systems.
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl">Dialect IT Solutions</p>
                        <p className="italic text-slate-400">Part time: June 2016 → 2019</p>
                        <p className="font-serif">After graduating elementary school I worked summers and other holidays, assisting the technicians at Dialect in Skövde. I worked
                        mainly with maintenence of network equipment and internal systems. I continued to do this my entire high school period since it was
                        an unique opportunity for me to gain work experience, and I absolutely loved the workplace and the colleagues.
                        </p>
                    </div>

                </div>
                <div className="space-y-5">
                    <p className="font-bold text-3xl border-b-2 border-divider">Education 🎓</p>
                    <div>
                        <p className="text-2xl">Chalmers University of Technology</p>
                        <p className="italic text-slate-400">2020 → now</p>
                        <p className="font-serif">I am currently studying my second year at Chalmers University of Technology, pursuing a bachelors degree,
                        then a masters degree in Software Engineering. I am part of the <a href="https://digit.chalmers.it">digIT 21</a> committeé, 
                        which develops and maintains the many web services of the <a href="https://chalmers.it/">IT-division</a>.</p>
                    </div>

                    <div>
                        <p className="text-2xl">NTI-Gymnasiet Skövde</p>
                        <p className="italic text-slate-400">2016 → 2019</p>
                        <p className="font-serif">I studied information technology with software development specialization. 
                        During the third year I was a student ambassador for the school.
                        When graduating, I was awarded with best <a href="https://github.com/LilleLink/Gravity">graduation project</a>, 
                        best grades, and became valedictorian. 
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

function Footer() {

    return (
        <div className="text-center place-content-center space-y-2">
            <p className="text-slate-400">This website was made as a fun way to improve my react-ts skills and 
                try out tailwind-css for the first time!<br/>
                Heavily inspired by my friend <a target="_blank" rel="noreferrer" href="https://antonekstrom.se/">Anton Ekström</a>.
            </p>
            <Links centered={true}/>
        </div>
    )
}

export default function Home() {

    return (
        <div className="mx-5 sm:mx-20 lg:mx-48 my-10 space-y-10 animate-fade-in-down">
            <Header/>
            <About/>
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-0">
                <Technologies/>
                <AwardsAndCertificates/>
            </div>
            <Content/>
            <Footer/>
        </div>
    )
}
