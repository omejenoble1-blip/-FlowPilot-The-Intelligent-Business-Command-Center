import { getActiveProfile } from './local-profiles.js';
export const session={current:null,async restore(){this.current=await getActiveProfile();return this.current;},set(profile){this.current=profile;}};
