export interface IUser {
  id:number;
  first_name:string;
  last_name:string;
  email:string;
  gender:string;
  ip_address: string;
  pic:string;
  city: string;
  strt_addrss: string;
  phone: string;
  edit:boolean;
}
export class User implements IUser{
  id:number;
  first_name:string;
  last_name:string;
  email:string;
  gender:string;
  ip_address: string;
  pic:string;
  city: string;
  strt_addrss: string;
  phone: string;
  edit:boolean;
}
