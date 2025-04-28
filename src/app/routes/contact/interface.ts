export interface Contact{
    id?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    userId?: string;
    tags?: string[];
    address: string;
    city: string;
    zipCode: string;
    gender: string;
    website:string;
    image?: string;
}