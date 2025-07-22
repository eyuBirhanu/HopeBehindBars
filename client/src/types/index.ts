
export interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  tags: string[];
  likes: number;
  createdAt: string;
}


export interface VolunteerApplication {
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
}


export interface NavLink {
  title: string;
  path: string;
}


export interface ImpactStat {
  value: string;
  label: string;
}


export interface NavLink {
  title: string;
  path: string;
}


export interface NavItem {
  title: string;
  path?: string; 
  children?: NavLink[];
}

export interface VolunteerApplication {
  
  _id: string;
  createdAt: string;
  updatedAt: string;

 
  fullName: string;
  email: string;
  phone: string;
  age: number;
  
 
  interest: string;
  skillSet?: string;
  otherInterestDetail?: string;
  
  
  motivation: string;
  availability: string;
  linkedin?: string;
  twitter?: string;
  additionalComments?: string;

 
  status: 'Pending' | 'Contacted' | 'Accepted' | 'Rejected' | 'Canceled';
}

export interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrls: string[]; 
  createdAt: string; 
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string; 
  excerpt: string;
  imageUrl: string;
  authorName: string;
  authorLinkedin?: string; 
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  createdAt: string;
  updatedAt:string;
}


export interface Publication {
    _id: string;
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}