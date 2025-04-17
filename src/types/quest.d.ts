export interface Quest {
    id: string;
    title: string;
    description: string;
    reward: number;
    expiration: string;
    status: 'active' | 'expired';
    image: string;
    amount: number;
    location: string;
  }
  
  export interface CreateQuest {
    title: string;
    description: string;
    reward: number;
    expiration: Date;
    location: string;
    applicantLimit: number;
  }