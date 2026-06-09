import { useState } from "react";
import { saveToStorage } from "../../storage/chromeStorage";
import { extractTextFromPdf } from "../../parser/pdfParser";

export default function Setup() {
    const [resumeFile, setResumeFile] =
        useState<File | null>(null);

    const [apiKey, setApiKey] =
        useState("");

    const handleSave = async () => {
       if(!resumeFile) {
        alert("Upload a resume")
        return;
       }

       try {
        const resumeText = 
            await extractTextFromPdf(resumeFile);
            await saveToStorage("resumetext", resumeText)
            await saveToStorage("OpenAiKey", apiKey)


            console.log("saved")
       }
       catch(error){
        console.error("Resume parsing failed : ", error);
       }
    }

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl fot-bold">
                    Welcome to jobLens AI
                </h1>

                <p className="text-sm text-zinc-400  mt-1">
                    Upload your resume  to begin
                </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 p-4">
                <label className="block text-sm font-medium mb-2">
                    Upload resume
                </label>

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-zinc-300"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            setResumeFile(file);
                        }
                    }}
                />
                {resumeFile && (
                    <p className="mt-2 text-sm text-green-400">
                        Selected: {resumeFile.name}
                    </p>
                )}
            </div>
            <div className="rounded-2xl border border-zinc-800 p-4">
                <label className="block  text-sm font-medium mb-2">
                    Open API Key
                </label>

                <input
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) =>
                        setApiKey(e.target.value)
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none"
                />
            </div>

            <button onClick={() =>handleSave()} className="w-full rounded-xl bg-blue-600 py-3 font-medium hover:bg-blue-500 transition">
                Save & Continue
            </button>
        </div>
    )
}