import gsap from 'gsap';

import { getWidth } from './helpers';

export function pageLoadLeave(data: any, done: any) {
    const pageLoadContainer = document.querySelector('.between-page-container');
    const landingContainer = document.querySelector('.landing');

    const pageLoadLeaveTl = gsap.timeline();

    pageLoadContainer.classList.remove('hidden');

    pageLoadLeaveTl.from(pageLoadContainer, {
        x: -getWidth(),
        duration: 1,
        ease: 'power4',
        onComplete: () => {
            landingContainer.classList.add('hidden');

            done();
        }
    });
}

export function pageLoadEnter(data: any) {
    const pageLoadContainer = document.querySelector('.between-page-container');
    const landingContainer = document.querySelector('.landing');

    const pageLoadLeaveTl = gsap.timeline();

    pageLoadContainer.classList.remove('hidden');
    landingContainer.classList.add('hidden');

    pageLoadLeaveTl.from(pageLoadContainer, {
        x: getWidth(),
        duration: 1,
        ease: 'power4',
        clearProps: 'all',
        onComplete: () => {
            pageLoadContainer.classList.add('hidden');
        }
    });
}
