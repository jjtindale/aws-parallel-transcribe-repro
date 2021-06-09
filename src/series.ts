import path from "path";
import { transcribeFile } from "./transcribe";

async function transcribeInSeries() {
    console.info("transcribing in series");
    const transcribeNumbers = transcribeFile(path.resolve(__dirname, "../numbers.wav"));
    await transcribeNumbers;
    const transcribeLetters = transcribeFile(path.resolve(__dirname, "../letters.wav"));
    await transcribeLetters;
}

console.info("starting transcription");
transcribeInSeries()
    .then(() => console.info("finished"))
    .catch(err => console.error(err));