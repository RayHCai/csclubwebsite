import barba from '@barba/core';
import { pageLoadLeave, pageLoadEnter } from './animations';

barba.init({
    transitions: [
        {
            once(data) {
                pageLoadEnter(data);
            },
            leave(data) {
                pageLoadLeave(data);
            },
            enter(data) {
                pageLoadEnter(data);
            }
        }
    ]
});
