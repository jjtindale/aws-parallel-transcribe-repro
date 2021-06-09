import path from "path";
import { transcribeFile } from "./transcribe";

async function transcribeInParallel() {
    console.info("transcribing in parallel");
    const transcribeNumbers = transcribeFile(path.resolve(__dirname, "../numbers.wav"));
    const transcribeLetters = transcribeFile(path.resolve(__dirname, "../letters.wav"));
    await Promise.all([transcribeNumbers, transcribeLetters]);
}

console.info("starting transcription");
transcribeInParallel()
    .then(() => console.info("finished"))
    .catch(err => console.error(err));