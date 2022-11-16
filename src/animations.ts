import gsap from 'gsap';

import { getWidth } from './helpers';

export function pageLoadLeave(data: any, done: any) {
    const page = data.next.url.hash;

    const betweenPageLoadContainer = document.querySelector('.between-page-container-black');
    const pageLoadContainer = document.querySelector('.page-load-container');
    const containers = Array.from(document.querySelectorAll('.container'));

    pageLoadContainer.classList.add('hidden');

    const pageLoadLeaveTl = gsap.timeline();

    betweenPageLoadContainer.classList.remove('hidden');

    pageLoadLeaveTl.from(betweenPageLoadContainer, {
        x: -getWidth(),
        duration: 1,
        ease: 'power4',
        clearProps: 'all',
        onComplete: () => done()
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
