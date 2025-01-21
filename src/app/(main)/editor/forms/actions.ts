"use server";

import openai from "@/lib/openai";
import {
  GenerateSummaryInput,
  GenerateWorkExperienceInput,
  generateSummarySchema,
  WorkExperience,
  generateWorkExperienceSchema,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
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

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to generate a single work experience entry based in the user input. Your response must adhere to the following structure. You can omit fields if they can't be infered from the provided data, but don't add any new ones.
    
    Job title: <job title>
    Company: <company name>
    Start date: <format : YYYY-MM-DD> (only if provided)
    End date: <format : YYYY-MM-DD> (only if provided)
    Description: <an optimized description in bullet format, might be infered from the job title>
    `;

  const userMessage = `
    Please provide a work experience entry from this description:
    ${description}
    `;

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

  console.log("aiReponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
