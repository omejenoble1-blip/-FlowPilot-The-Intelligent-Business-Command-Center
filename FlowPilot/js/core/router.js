import { ROUTES } from './constants.js';
export function readRoute(){const value=location.hash.replace(/^#\/?/,'').split('/')[0];return ROUTES.includes(value)?value:'dashboard';}
export function navigate(route){if(!ROUTES.includes(route))route='dashboard';if(location.hash===`#${route}`)window.dispatchEvent(new HashChangeEvent('hashchange'));else location.hash=route;}
export function bindRouter(onRoute){const run=()=>onRoute(readRoute());window.addEventListener('hashchange',run);run();return()=>window.removeEventListener('hashchange',run);}
