import {
    StartStreamTranscriptionCommand,
    TranscribeStreamingClient
} from "@aws-sdk/client-transcribe-streaming";
import fs from "fs";

const client = new TranscribeStreamingClient({ region: "eu-west-2" });

export async function transcribeFile(filePath: string): Promise<void> {
    console.info(`transcribing ${filePath}`);
    const fileStream = fs.createReadStream(filePath);

    const transcribeInput = async function* () {
        for await (const chunk of fileStream) {
            yield { AudioEvent: { AudioChunk: chunk } };
        }
    };

    const command = new StartStreamTranscriptionCommand({
        LanguageCode: "en-GB",
        MediaEncoding: "pcm",
        MediaSampleRateHertz: 44100,
        AudioStream: transcribeInput()
    });

    const response = await client.send(command);

    if (!response.TranscriptResultStream) {
        throw new Error("TranscriptResultStream not available");
    }

    for await (const result of response.TranscriptResultStream) {
        const transcriptSoFar = result.TranscriptEvent?.Transcript?.Results?.[0]?.Alternatives?.[0].Transcript;
        console.info(transcriptSoFar);
    }
}
