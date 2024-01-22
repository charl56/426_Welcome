import { useEffect } from 'react';
import { gsap, ScrollTrigger, MotionPathPlugin } from 'gsap/all';


import './User.css'

function User() {
    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger)
        gsap.registerPlugin(MotionPathPlugin)

        const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1
        const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1

        // Fish path
        const path = [
            // 1
            { x: 800, y: 200 },
            { x: 900, y: 20 },
            { x: 1100, y: 100 },
            // 2
            { x: 1000, y: 200 },
            { x: 900, y: 20 },
            { x: 10, y: 500 },
            // 3
            { x: 100, y: 300 },
            { x: 500, y: 400 },
            { x: 1000, y: 200 },
            // 4
            { x: 1100, y: 300 },
            { x: 400, y: 400 },
            { x: 200, y: 250 },
            // 5
            { x: 100, y: 300 },
            { x: 500, y: 450 },
            { x: 1100, y: 500 }
        ]

        const scaledPath = path.map(({ x, y }) => {
            return {
                x: x * rx,
                y: y * ry
            }
        })

        const sections = [...document.querySelectorAll('section')]
        const fish = document.querySelector('.fish')
        const fishHeadAndBody =
            [
                ...document.querySelectorAll('.fish__head'),
                ...document.querySelectorAll('.fish__body')
            ]


        const tl = gsap.timeline({
            scrollTrigger: {
                scrub: 1.5,
            },
        })
        tl.to(fish, {
            motionPath: {
                path: scaledPath,
                align: 'self',
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 10,
            immediateRender: true,
            // ease: 'power4'
        })
        tl.to('.indicator', {
            opacity: 0
        }, 0)
        tl.to(fish, {
            rotateX: 180
        }, 1)
        tl.to(fish, {
            rotateX: 0
        }, 2.5)
        tl.to(fish, {
            z: -500,
            duration: 2,
        }, 2.5)
        tl.to(fish, {
            rotateX: 180
        }, 4)
        tl.to(fish, {
            rotateX: 0
        }, 5.5)
        tl.to(fish, {
            z: -50,
            duration: 2,
        }, 5)
        tl.to(fish, {
            rotate: 0,
            duration: 1,
        }, '-=1')
        tl.to('.fish__skeleton', {
            opacity: 0.6,
            duration: 0.1,
            repeat: 4
        }, '-=3')
        tl.to(fishHeadAndBody, {
            opacity: 0,
            duration: 0.1,
            repeat: 4
        }, '-=3')
        tl.to('.fish__inner', {
            opacity: 0.1,
            duration: 1
        }, '-=1')
        tl.to('.fish__skeleton', {
            opacity: 0.1,
            duration: 1
        }, '-=1')

        tl.pause()


        const rotateFish = (self) => {
            if (self.direction === -1) {
                gsap.to(fish, { rotationY: 180, duration: 0.4 })
            } else {
                gsap.to(fish, { rotationY: 0, duration: 0.4 })
            }
        }

        const showContent = (div, p) => {
            gsap.to(div, { opacity: 1, duration: 1 })
            gsap.to(p, { opacity: 1, duration: 1 })
        }

        const hideText = (div, p) => {
            gsap.to(div, { opacity: 0, duration: 1 })
            gsap.to(p, { opacity: 0, duration: 1 })
        }

        sections.forEach((section, i) => {
            // const div = section.querySelector('div')
            // const p = section.querySelector('p')
            // gsap.to(div, { opacity: 0 })
            // gsap.to(p, { opacity: 0 })

            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                // onEnter: () => showContent(div, p),
                // onEnterBack: () => showContent(div, p),
                // onLeave: () => hideText(div, p),
                // onLeaveBack: () => hideText(div, p),
                onUpdate: (self) => rotateFish(self)
            })
        })

    }, []);

    return (
        <div>
            <p className="indicator">
                <span>Scroll</span>
                <span>↓</span>
            </p>

            <div className="fish-wrapper">
                <div className="fish">
                    <div className="fish__skeleton"></div>
                    <div className="fish__inner">
                        {/* Body */}
                        <div className="fish__body"></div>
                        <div className="fish__body"></div>
                        <div className="fish__body"></div>
                        <div className="fish__body"></div>
                        {/* Head */}
                        <div className="fish__head"></div>
                        <div className="fish__head fish__head--2"></div>
                        <div className="fish__head fish__head--3"></div>
                        <div className="fish__head fish__head--4"></div>
                        {/* Queue */}
                        <div className="fish__tail-main"></div>
                        <div className="fish__tail-fork"></div>
                        {/* Fin (nageaoirs) */}
                        <div className="fish__fin"></div>
                        <div className="fish__fin fish__fin--2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User



// https://michellebarker.co.uk/