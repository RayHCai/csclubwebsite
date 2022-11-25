import gsap from 'gsap';

import { getWidth } from './helpers';

export function navEnter() {
    const nav = document.querySelector('nav');
    const openNavButton = document.getElementById('openNavButton');
    const navContentContainer = document.getElementById('navContentContainer');

    const navEnterTl = gsap.timeline();

    navEnterTl.to(openNavButton, {
        autoAlpha: 0,
        x: -200,
        duration: 0.6,
        ease: 'power4',
        onComplete: () => {
            openNavButton.classList.add('hidden');
            nav.classList.remove('hidden');
        }
    });

    navEnterTl.from(nav, {
        autoAlpha: 0,
        x: -getWidth() * .3,
        duration: 0.6,
        ease: 'power4',
        onComplete: () => {
            let navButtonColor = openNavButton.style.color;

            openNavButton.removeAttribute('style');
            openNavButton.style.color = navButtonColor;

            let navBackground = nav.style.background;

            nav.removeAttribute('style');
            nav.style.background = navBackground;

            navContentContainer.classList.remove('hidden');
        }
    });

    navEnterTl.from(navContentContainer, {
        autoAlpha: 0,
        ease: 'power4',
        duration: 0.5,
        clearProps: 'all'
    });
}

export function navLeave() {
    const nav = document.querySelector('nav');
    const openNavButton = document.getElementById('openNavButton');
    const navContentContainer = document.getElementById('navContentContainer');

    const navLeaveTl = gsap.timeline();

    navLeaveTl.to(navContentContainer, {
        autoAlpha: 0,
        ease: 'power4',
        duration: 0.5,
        clearProps: 'all',
        onComplete: () => navContentContainer.classList.add('hidden')
    });

    navLeaveTl.to(nav, {
        autoAlpha: 0,
        x: -getWidth() * .3,
        duration: 0.6,
        ease: 'power4',
        onComplete: () => {
            nav.classList.add('hidden');
            
            let navBackground = nav.style.background;

            nav.removeAttribute('style');
            nav.style.background = navBackground;

            openNavButton.classList.remove('hidden');
        }
    });

    navLeaveTl.from(openNavButton, {
        autoAlpha: 0,
        x: -200,
        duration: 0.6,
        ease: 'power4',
        onComplete: () => {
            let navButtonColor = openNavButton.style.color;

            openNavButton.removeAttribute('style');
            openNavButton.style.color = navButtonColor;
        }
    });
}

export function pageLoadLeave(data: any, done: any) {
    const betweenPageLoadContainer = document.querySelector('.between-page-container-black');
    const pageLoadContainer = document.querySelector('.page-load-container');
    const nav = document.querySelector('nav');
    const closeNavButton = document.getElementById('openNavButton');
    
    pageLoadContainer.classList.add('hidden');

    const pageLoadLeaveTl = gsap.timeline();

    betweenPageLoadContainer.classList.remove('hidden');

    if(nav.classList.contains('hiden')) pageLoadLeaveTl.to(closeNavButton, {
        x: -200,
        duration: 0.5,
        clearProps: 'all',
        ease: 'power4',
        onComplete: () => closeNavButton.classList.add('hidden')
    });
    else pageLoadLeaveTl.to(nav, {
        x: -getWidth(),
        clearProps: 'all',
        onComplete: () => nav.classList.add('hidden')
    });


    pageLoadLeaveTl.from(betweenPageLoadContainer, {
        x: -getWidth(),
        duration: 1,
        ease: 'power4',
        clearProps: 'all',
        onComplete: () => {
            closeNavButton.classList.remove('hidden')

            done();
        }
    });
}

export function pageLoadEnter(data: any) {
    const page = data.next.url.hash;

    const betweenPageLoadContainer = document.querySelector('.between-page-container-black');
    const pageLoadContainer = document.querySelector('.page-load-container');
    const containers = Array.from(document.querySelectorAll('.container'));

    containers.filter(
        (c: HTMLDivElement) => {
            if(page) return c.id !== page
            else return c.id
        }
    ).forEach(
        (c: HTMLDivElement) => c.classList.add('hidden')
    );

    pageLoadContainer.classList.add('hidden');

    const pageLoadLeaveTl = gsap.timeline();

    pageLoadLeaveTl.to(betweenPageLoadContainer, {
        x: -getWidth(),
        duration: 1,
        ease: 'power4',
        clearProps: 'all',
        onComplete: () => {
            betweenPageLoadContainer.classList.add('hidden');
        }
    });
}
