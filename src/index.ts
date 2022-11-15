import gsap from 'gsap';
import barba from '@barba/core';
import { pageLoadLeave, pageLoadEnter } from './animations';

barba.init({
    transitions: [
        {
            once(data) {
                const pageLoadContainer = document.querySelector('.page-load-container');
                const betweenPageContainer = document.querySelector('.between-page-container');
                const landingContainer = document.querySelector('.landing');

                betweenPageContainer.classList.add('hidden');
                landingContainer.classList.add('hidden');

                (landingContainer as any).style.opacity = 0;

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
                pageLoadEnter(data);
            }
        }
    ]
});
