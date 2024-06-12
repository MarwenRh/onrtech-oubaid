export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
  role: string;
  jobTitle: string;
};
export type updatedProfile = {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  photo?: string;
};
export type JobOffer = {
  userId: string;
  _id: string;
  title: string;
  description: string;
  benefits: string;
  targetProfile: string;
  requiredQualification: string;
  optionalQualification: string;
  yearsOfExperienceRequired: number;
  yearsOfExperienceRecommanded: number;
  locationType: "On-Site" | "Remote" | "Hybrid";
  locationPlace: string;
  contractType:
    | "Full Time"
    | "Part Time"
    | "Contract Work"
    | "Freelancing"
    | "Internship";
  contractDuration: string;
  incomePeriod: "Hourly" | "Weekly" | "Monthly" | "Yearly";
  incomeValue: number;
  incomeCurrency: "USD" | "EUR" | "GBP";
  published: boolean;
  author: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
export type offers = JobOffer[];

export type review = {
  id: number;
  name: string;
  job: string;
  image: string;
  text: string;
};
export type article = {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
  publishedAt: Date;
};
export type articlesList = {
  articles: article[];
};

export type Form = {
  _id: string;
  name: string;
  email: string;
  reason: string;
  notes: string;
  createdAt: Date;
};
export type Application = {
  _id: string;
  applicantName: string;
  applicantEmail: string;
  offerTitle: string;
  cv: string;
  state: string;
};
export type link = {
  value: string;
  path: string;
};
