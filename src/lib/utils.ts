import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeValues } from "./validation";
import { ResumeServerData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    photo: data.photoUrl || undefined,
    description: data.description || undefined,
    email: data.email || undefined,
    phone: data.phone || undefined,
    jobTitle: data.jobTitle || undefined,
    country: data.country || undefined,
    city: data.city || undefined,
    educations: data.educations.map((e) => ({
      school: e.school || undefined,
      degree: e.degree || undefined,
      startDate: e.startDate?.toISOString().split("T")[0],
      endDate: e.endDate?.toISOString().split("T")[0],
    })),
    workExperiences: data.workExperiences.map((e) => ({
      company: e.company || undefined,
      position: e.position || undefined,
      startDate: e.startDate?.toISOString().split("T")[0],
      endDate: e.endDate?.toISOString().split("T")[0],
      description: e.description || undefined,
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
  };
}
