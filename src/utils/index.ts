export class ApiError extends Error {
    messages: string[];
    constructor(messages: string[], public readonly code?: string) {
        super(messages.join(", "));
        this.messages = messages;
    }
}
