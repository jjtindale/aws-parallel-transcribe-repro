import path from "path";
import { transcribeFile } from "./transcribe";

async function doIt() {
    console.info("transcribing");
    const transcribeNumbers = transcribeFile(path.resolve(__dirname, "../numbers.wav"));
    const transcribeLetters = transcribeFile(path.resolve(__dirname, "../letters.wav"));
    await Promise.all([transcribeNumbers, transcribeLetters]);
}

console.info("starting transcription");
doIt()
    .then(() => console.info("finished"))
    .catch(err => console.error(err));