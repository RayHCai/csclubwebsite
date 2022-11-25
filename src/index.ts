import gsap from 'gsap';
import barba from '@barba/core';
import { pageLoadLeave, pageLoadEnter, navEnter, navLeave } from './animations';

const PageStyles = {
    home: 'light',
    about: 'dark',
}

function loadSnow() {
    const snowContainer = document.querySelector('.snow-container');
    
    for(let i = 0; i < 200; i++) {
        let snowParticle = document.createElement('div');
    
        snowParticle.classList.add('snow');
    
        snowContainer.appendChild(snowParticle);
    }
}

function loadDomMethods() {
    let closeNavButton: HTMLElement = document.querySelector('nav i');
    let openNavButton = document.getElementById('openNavButton');

    openNavButton.addEventListener('click', () => {
        navEnter();
    });

    closeNavButton.addEventListener('click', () => {
        navLeave();
    });
}

function loadDomElements(manualStyle: string | null = null) {
    const page = (window.location.hash ? window.location.hash : 'home') as keyof typeof PageStyles;
    const style = manualStyle ? manualStyle : PageStyles[page];

    let closeNavButton: HTMLElement = document.querySelector('nav i');
    let openNavButton = document.getElementById('openNavButton');

    function changeColors(a: HTMLElement) {
        a.style.color = style === 'light' ? 'var(--black)' : 'var(--white)'
    }

    changeColors(openNavButton);
    closeNavButton.style.color = style !== 'light' ? 'var(--black)' : 'var(--white)'

    document.querySelectorAll('footer a').forEach(
        (a: HTMLAnchorElement) => changeColors(a)
    );

    document.querySelectorAll('nav a').forEach(
        (a: HTMLAnchorElement) => a.style.color = style !== 'light' ? 'var(--black)' : 'var(--white)'
    );

    document.querySelector('nav').style.background = style === 'light' ? 'var(--black)' : 'var(--white)';
}

barba.init({
    transitions: [
        {
            once() {
                loadSnow();
                loadDomElements('light');
                loadDomMethods();

                const containers = Array.from(document.querySelectorAll('.container'));

                containers.forEach(
                    c => c.classList.add('hidden')
                );

                const pageLoadContainer = document.querySelector('.page-load-container');
                const betweenPageContainer = document.querySelector('.between-page-container-black');
                const landingContainer: HTMLDivElement = document.querySelector('.landing');

                betweenPageContainer.classList.add('hidden');
                landingContainer.classList.add('hidden');

                landingContainer.style.opacity = '0';

                const pageLoadEnterTl = gsap.timeline();

                pageLoadEnterTl.from(pageLoadContainer, {
                    autoAlpha: 0,
                    duration: 0.6,
                    y: -40,
                    ease: 'power4',
                    clearProps: 'all',
                });

                pageLoadEnterTl.to(pageLoadContainer.children[0], {
                    autoAlpha: 0,
                    duration: 0.6,
                    clearProps: 'all',
                    y: -40,
                    delay: 0.1,
                    onComplete: () => {
                        landingContainer.classList.remove('hidden')
                        pageLoadContainer.classList.add('hidden')
                        document.querySelector('.landing-container').classList.remove('hidden')
                    }
                });

                pageLoadEnterTl.to(landingContainer, {
                    autoAlpha: 1,
                    duration: 0.5, 
                    ease: 'power4',
                    clearProps: 'all'
                });
            },
        },
        {
            name: 'self',
            leave(data) {
                const done = this.async();
                
                pageLoadLeave(data, done);
            },
            after(data) {
                loadDomElements();
                
                pageLoadEnter(data);
            }
        }
    ]
});
