export interface UserLogin{
    identifier:string,
    password:string,
}

export interface UserRegister{
    first_name:string,
    last_name:string,
    birthdate:string,
    email:string,
    password:string,
    phone:string,
    dni:string,
}

export interface User{
    id:number,
    uid:string,
    first_name:string,
    last_name:string,
    birthdate:string,
    email:string,
    password:string,
    phone:string,
    dni:string,
    photo:string
}
