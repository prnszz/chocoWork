// types/survey.ts
export interface Survey {
    id: number;
    title: string;
    company: string;
    date: string;
    coins: number;
    duration: number;
    content: string;
  }
  
  export interface SurveyTemplate {
    title: string;
    company: string;
    content: string;
  }
  
  export type SurveyCardProps = Omit<Survey, 'content'>;