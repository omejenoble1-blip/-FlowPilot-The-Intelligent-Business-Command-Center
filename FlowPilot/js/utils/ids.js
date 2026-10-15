export function makeId(prefix='rec'){return `${prefix}_${globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`}`;}
