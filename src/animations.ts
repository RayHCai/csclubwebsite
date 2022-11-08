import gsap from 'gsap';

export function pageLoadLeave(data: any) {
    return gsap.to(data.current.container, {
        opacity: 0
    });
}

export function pageLoadEnter(data: any) {
    return gsap.from(data.next.container, {
        opacity: 0
    });
}