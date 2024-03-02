import { OpenAI } from "openai";

export const generateChatCompletion = async (postTitle: string): Promise<string> => {
    const maxCharacterLimit = 200
    try {
        const openai = new OpenAI({
        apiKey: "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", //TODO
        dangerouslyAllowBrowser: true  // remove after moving to https
        });

        const request: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
        model: "gpt-3.5-turbo",
        messages: [
            {
            role: "user",
            content: `Generate a concise post about ${postTitle}. Keep it short and engaging for readers.`,
            },
        ],
        temperature: 1,
        max_tokens: maxCharacterLimit,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        };

        const response = await openai.chat.completions.create(request);
        const firstPostContent = response.choices[0]?.message?.content || '';

        // Split the content into an array of sentences
        const sentences = firstPostContent.split(/(?<=[.!?])\s+/);

        // Concatenate sentences until the character limit is reached
        let truncatedContent = '';
        for (const sentence of sentences) {
            if (truncatedContent.length + sentence.length <= maxCharacterLimit) {
                truncatedContent += sentence;
            } else {
                break;
            }
        }

        return truncatedContent
    } catch (error) {
        console.error("Error generating chat completion:", error);
        throw error; 
    }
};
