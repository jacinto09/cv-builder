"use server";

import openai from "@/lib/openai";
import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  //TODO: Block for more than 3 trys

  const { jopTitle, educations, workExperiences, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introducction summary for a given user's provided data. Only return the summary and do not include any other information in the response. Keep it concise and professional`;

  const userMessage = `
    Please generate a professional resume summary from this data: 
    
    Job Title: ${jopTitle || "N/A"}

    Work experience: 
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"}
        to ${exp.endDate || "Present"}

        Description: ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

    Education: 
    ${educations
      ?.map(
        (edu) => `
        Position: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"}
        to ${edu.endDate || "N/A"}
        `,
      )
      .join("\n\n")}
    
    Skills: 
    ${skills}
    `;
  console.log("system", systemMessage);
  console.log("user", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });
  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }
  return aiResponse;
}
