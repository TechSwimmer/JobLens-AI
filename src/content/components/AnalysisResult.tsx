interface AnalysisResultProps {
  score: number;
  matching: string[];
  missing: string[];
  jobSkills: string[];
}

export default function AnalysisResult({
  score,
  matching,
  missing,
  jobSkills,
}: AnalysisResultProps) {
  return (
    <div
      className="joblens-scroll"
      style={{
        marginTop: "20px",
    maxHeight: "320px",
    overflowY: "auto",
    paddingRight: "6px",
      }}
    >
      <div
        style={{
          background:
            "rgba(39,39,42,0.95)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          padding: "18px",
          borderRadius: "20px",
        }}
      >
        {/* Score */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            marginBottom: "18px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#a1a1aa",
              }}
            >
              ATS Match Score
            </p>

            <h3
              style={{
                margin: 0,
                marginTop: "4px",
                fontSize: "28px",
                fontWeight: 700,
                color: "#f8fafc",
              }}
            >
              {score}%
            </h3>
          </div>

          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background:
                "linear-gradient(to right, #2563eb, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              fontSize: "22px",
            }}
          >
            🎯
          </div>
        </div>

        {/* Matching */}
        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <h4
            style={{
              margin: 0,
              marginBottom: "10px",
              color: "#f4f4f5",
              fontSize: "14px",
            }}
          >
            Matching Skills
          </h4>

          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <h4
              style={{
                margin: 0,
                marginBottom: "10px",
                color: "#f4f4f5",
                fontSize: "14px",
              }}
            >
              Detected Job Skills
            </h4>

            <div>
              {jobSkills.map(
                (skill) => (
                  <span
                    key={skill}
                    style={{
                      display:
                        "inline-block",
                      margin: "4px",
                      padding:
                        "8px 12px",
                      borderRadius:
                        "999px",
                      background:
                        "rgba(59,130,246,0.15)",
                      color:
                        "#93c5fd",
                      border:
                        "1px solid rgba(59,130,246,0.2)",
                      fontSize:
                        "13px",
                    }}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            {matching.length ? (
              matching.map(
                (skill) => (
                  <span
                    key={skill}
                    style={{
                      display:
                        "inline-block",
                      margin: "4px",
                      padding:
                        "8px 12px",
                      borderRadius:
                        "999px",
                      background:
                        "rgba(34,197,94,0.15)",
                      color:
                        "#86efac",
                      border:
                        "1px solid rgba(34,197,94,0.2)",
                      fontSize:
                        "13px",
                      fontWeight:
                        500,
                    }}
                  >
                    {skill}
                  </span>
                )
              )
            ) : (
              <p
                style={{
                  color:
                    "#a1a1aa",
                  fontSize:
                    "13px",
                }}
              >
                No matching skills
              </p>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <h4
            style={{
              margin: 0,
              marginBottom: "10px",
              color: "#f4f4f5",
              fontSize: "14px",
            }}
          >
            Missing Skills
          </h4>

          <div>
            {missing.length ? (
              missing.map(
                (skill) => (
                  <span
                    key={skill}
                    style={{
                      display:
                        "inline-block",
                      margin: "4px",
                      padding:
                        "8px 12px",
                      borderRadius:
                        "999px",
                      background:
                        "rgba(239,68,68,0.15)",
                      color:
                        "#fca5a5",
                      border:
                        "1px solid rgba(239,68,68,0.2)",
                      fontSize:
                        "13px",
                      fontWeight:
                        500,
                    }}
                  >
                    {skill}
                  </span>
                )
              )
            ) : (
              <p
                style={{
                  color:
                    "#a1a1aa",
                  fontSize:
                    "13px",
                }}
              >
                No missing skills
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}