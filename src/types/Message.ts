type SenderType = "me" | "other";

export type Message = {
    sender: {
        type: SenderType,
        name: string;
        image: string;
    }
    content: string;
}