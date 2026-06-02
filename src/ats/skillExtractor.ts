import { TECH_SKILLS }
from "../constants/skills";

const escapeRegex =
  (text: string) =>
    text.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

export const extractSkills =
  (text: string) => {
    const lowerText =
      text.toLowerCase();

    const matches =
      TECH_SKILLS.filter(
        (skill) => {
          const regex =
            new RegExp(
              `\\b${escapeRegex(
                skill.toLowerCase()
              )}\\b`,
              "i"
            );

          return regex.test(
            lowerText
          );
        }
      );

    return [
      ...new Set(matches),
    ];
  };