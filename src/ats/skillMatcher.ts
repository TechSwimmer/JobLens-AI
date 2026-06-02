export const compareSkills =
  (
    resumeSkills: string[],
    jobSkills: string[]
  ) => {
    const matching =
      resumeSkills.filter(
        (skill) =>
          jobSkills.some(
            (jobSkill) =>
              jobSkill.toLowerCase() ===
              skill.toLowerCase()
          )
      );

    const missing =
      jobSkills.filter(
        (skill) =>
          !resumeSkills.some(
            (resumeSkill) =>
              resumeSkill.toLowerCase() ===
              skill.toLowerCase()
          )
      );

    const score =
      Math.round(
        (matching.length /
          Math.max(
            jobSkills.length,
            1
          )) *
          100
      );

    return {
      matching,
      missing,
      score,
    };
  };