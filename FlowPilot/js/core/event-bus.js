const events = new EventTarget();
export const bus = { emit(name, detail={}) { events.dispatchEvent(new CustomEvent(name,{detail})); }, on(name, handler) { const fn=e=>handler(e.detail);events.addEventListener(name,fn);return ()=>events.removeEventListener(name,fn); } };
