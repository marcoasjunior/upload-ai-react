import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export function VideoInputForm() {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const promptInputRef = useRef<HTMLTextAreaElement>(null)

    function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target
        if (!files) return
        const selectedFile = files[0]

        setVideoFile(selectedFile)
    }

    async function convertVideoToAudio(video: File) {
        console.log("Convert started.");

        const ffmpeg = await getFFmpeg();

        await ffmpeg.writeFile("input.mp4", await fetchFile(video));

        ffmpeg.on("progress", (progress) => {
            console.log("Convert progress: " + Math.round(progress.progress * 100));
        });

        await ffmpeg.exec([
            "-i",
            "input.mp4",
            "-map",
            "0:a",
            "-b:a",
            "20k",
            "-acodec",
            "libmp3lame",
            "output.mp3",
        ]);
        const data = await ffmpeg.readFile("output.mp3");

        const audioFileBlob = new Blob([data], { type: "audio/mp3" });
        const audioFile = new File([audioFileBlob], "output.mp3", {
            type: "audio/mpeg",
        });

        console.log("Convert finished");

        return audioFile;
    }

    async function handleUploadVideo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const prompt = promptInputRef.current?.value

        if (!videoFile || !prompt) return

        const audioFile = await convertVideoToAudio(videoFile)

        console.log(audioFile)

    }

    const previewURL = useMemo(() => {
        if (!videoFile) return null
        return URL.createObjectURL(videoFile)
    }, [videoFile])

    return (
        <form className="space-y-6" onSubmit={handleUploadVideo}>
            <label
                htmlFor="video"
                className=" relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
                {previewURL ? (
                    <video
                        src={previewURL}
                        className="pointer-events-none w-full h-full object-cover rounded-md absolute inset-0"
                        controls={false}
                    ></video>
                )
                    : (
                        <>
                            <FileVideo className="w4 h-4"></FileVideo>
                            Selecione um vídeo
                        </>
                    )}

            </label>
            <input
                type="file"
                id="video"
                className="sr-only"
                accept="video/mp4"
                onChange={handleFileSelected}
            ></input>

            <Separator />

            <div className="space-y-2">
                <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
                <Textarea
                    ref={promptInputRef}
                    id="transcription_prompt"
                    className="h-20 leading-relaxed resize-none"
                    placeholder="inclua palavras-chaves mencionadas no vídeo separadas por vírgula"></Textarea>
            </div>

            <Button
                type="submit"
                className="w-full"
            >
                Carregar vídeo
                <Upload className="w-4 h-4 ml-2"></Upload>
            </Button>
        </form>
    )
}