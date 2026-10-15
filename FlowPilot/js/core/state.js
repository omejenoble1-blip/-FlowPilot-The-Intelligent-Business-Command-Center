export const state = { profile:null, route:'dashboard', records:{}, theme:'dark', currency:'NGN', dateFormat:'medium', charts:[], searchQuery:'', activeSettings:'profile', timer:null };
export function setState(patch){Object.assign(state,patch);return state;}
