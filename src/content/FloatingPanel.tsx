import { useEffect, useState } from "react";
import type { JobDetails } from "../types/job";
import { extractSkills } from "../ats/skillExtractor";

import { compareSkill } from "../ats/skillMatcher";
import AnalysisResult from "./components/AnalysisResult";

import { getJobDetails } from "./getJobDetails";



export default function FloatingPanel() {


    const [jobData, setJobData] =
        useState<JobDetails>({
            title: "",
            company: "",
            location: "",
            description: "",
        });


    const [position, setPosition] =
        useState({
            x: window.innerWidth - 380,
            y: 120,
        });

    const [dragging, setDragging] =
        useState(false);

    const [offset, setOffset] =
        useState({
            x: 0,
            y: 0,
        });

    const [loading, setLoading] =
        useState(false);

    const [analysis, setAnalysis] =
        useState<{
            score: number;
            matching: string[];
            missing: string[];
        } | null>(null);

    const handleMouseDown = (
        e: React.MouseEvent
    ) => {
        setDragging(true);

        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const isJobReady =
        Boolean(
            jobData.title &&
            jobData.description
        );

    useEffect(() => {
        const updateJobData =
            async () => {
                const data =
                    await getJobDetails();

                if (
                    data.title &&
                    data.description &&
                    data.description !==
                    "No description found"
                ) {
                    setJobData(data);
                } {
                    setJobData(data);
                }
            };

        updateJobData();

        const interval =
            setInterval(
                updateJobData,
                1500
            );

        return () =>
            clearInterval(interval);
    }, []);

    const handleAnalyze = async () => {

        if (!isJobReady) {
            alert(
                "Job details are still loading"
            );
            return;
        }

        try {
            setLoading(true);
            const storedResume =
                await chrome.storage.local.get(
                    "resumetext"
                );

            const resumetext =
                typeof storedResume
                    .resumetext ===
                    "string"
                    ? storedResume
                        .resumetext
                    : "";

            const resumeSkills =
                extractSkills(
                    resumetext
                );

            const jobSkills = extractSkills(jobData.description)
            console.log(jobData.title);
            console.log(jobData.description);
            const result = compareSkill(resumeSkills, jobSkills);

            setAnalysis(result);
        }
        catch (error) {
            console.error("Analysis failed : ", error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const handleMouseMove = (
            e: MouseEvent
        ) => {
            if (!dragging) return;

            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "mouseup",
            handleMouseUp
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "mouseup",
                handleMouseUp
            );
        };
    }, [dragging, offset]);

    return (
        <div
            style={{
                position: "fixed",
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: "340px",
                background:
                    "rgba(24,24,27,0.95)",
                color: "white",
                border:
                    "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "20px",
                zIndex: 999999,
                backdropFilter: "blur(20px)",
                boxShadow:
                    "0 20px 50px rgba(0,0,0,0.35)",
                userSelect: "none",
            }}
        >
            {/* Header */}
            <div
                onMouseDown={
                    handleMouseDown
                }
                style={{
                    cursor: dragging
                        ? "grabbing"
                        : "grab",
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#e1e1eb",
                        }}
                    >
                        JobLens AI
                    </h2>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#a1a1aa",
                        }}
                    >
                        AI Job Assistant
                    </p>
                </div>

                <div
                    style={{
                        fontSize: "18px",
                    }}
                >
                    ✨
                </div>
            </div>

            {/* Job Detection */}
            <div
                style={{
                    background:
                        "rgba(255,255,255,0.05)",
                    borderRadius: "18px",
                    padding: "14px",
                    marginBottom: "16px",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#c6c6d4",
                    }}
                >
                    Status
                </p>
                <h3
                    style={{
                        marginTop: "6px",
                        marginBottom: "4px",
                        fontSize: "15px",
                        color: "#f4f4f5",
                    }}
                >
                    {isJobReady
                        ? jobData.title
                        : "Detecting Job..."}
                </h3>

                <p
                    style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#a1a1aa",
                    }}
                >
                    {isJobReady
                        ? jobData.company
                        : "Scanning LinkedIn"}
                </p>

                <p
                    style={{
                        marginTop: "4px",
                        marginBottom: 0,
                        fontSize: "12px",
                        color: "#71717a",
                    }}
                >
                    {isJobReady
                        ? jobData.location
                        : ""}
                </p>
            </div>

            {/* Analyze Button */}
            <button
                onClick={handleAnalyze}
                style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "16px",
                    padding: "14px",
                    background:
                        "linear-gradient(to right, #2563eb, #4f46e5)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "15px",
                    cursor: "pointer",
                }}
            >
                {loading
                    ? "Analyzing..."
                    : "Analyze Job"}
            </button>
            {analysis && (
                <AnalysisResult
                    score={analysis.score}
                    matching={
                        analysis.matching
                    }
                    missing={
                        analysis.missing
                    }
                    jobSkills={
                        extractSkills(
                            jobData.description
                        )
                    }
                />
            )}
        </div>
    );
}