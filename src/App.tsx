import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Github, FileVideo, Upload, Wand } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";

export function App() {

    return (
        <div className="min-h-screen flex flex-col">
            <div className="px-6 py-3 flex items-center justify-between border-b">
                <h1 className="text-xl font-bold">upload.ai</h1>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Desenvolvido by me ❤️</span>

                    <Separator orientation="vertical" className="h-6" />

                    <Button variant={"outline"}>
                        <Github className="w-4 h-4 mr-2" />
                        Github
                    </Button>
                </div>
            </div>

            <main className="flex-1 p-6 flex gap-6">
                <div className="flex flex-col flex-1 gap-4">
                    <div className="grid grid-rows-2 gap-4 flex-1">
                        <Textarea
                            placeholder="inclua prompt para IA"
                            className="resize-none p-4 leading-relaxed"
                        >

                        </Textarea>
                        <Textarea
                            placeholder="resultado gerado por IA"
                            className="resize-none p-4 leading-relaxed"
                        >
                        </Textarea>
                    </div>
                    <p className="text-sm text-muted-foreground">Lembre-se: você pode usar a variável <code className="text-violet-400"> {"transcription"} </code></p>
                </div>

                <aside className="w-80 space-y-6">
                    <form className="space-y-6">
                        <label
                            htmlFor="video"
                            className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
                        >
                            <FileVideo className="w4 h-4"></FileVideo>
                            Selecione um vídeo
                        </label>
                        <input
                            type="file"
                            id="video"
                            className="sr-only"
                            accept="video/mp4"
                        ></input>

                        <Separator />



                        <div className="space-y-2">
                            <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
                            <Textarea
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

                    <Separator />

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label>Prompt</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="selecione um prompt" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="title">
                                        Título do YouTube
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label>Modelo</Label>
                            <Select disabled defaultValue="gpt3.5">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gpt3.5">
                                        GPT 3.5-turbo 16k
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="block text-xs text-muted-foreground italic"> Você poderá customizar esta opção em breve</span>
                        </div>

                        <Separator />

                        <div className="space-y-5">
                            <Label >Temperatura</Label>
                            <Slider
                                min={0}
                                max={1}
                                step={0.1}
                            />
                            <span className="block text-xs text-muted-foreground italic leading-relaxed"> Valores mais altos tendem a deixar os resultados mais criativos, porém com mais erros</span>
                        </div>

                        <Separator />

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Executar
                            <Wand className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </aside>
            </main>
        </div>
    )
}

