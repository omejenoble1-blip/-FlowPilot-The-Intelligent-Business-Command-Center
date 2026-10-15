export class FlowPilotError extends Error { constructor(message,code='APP_ERROR',cause){super(message,{cause});this.name='FlowPilotError';this.code=code;} }
export function userMessage(error){return error?.message || 'Something went wrong. Please try again.';}
