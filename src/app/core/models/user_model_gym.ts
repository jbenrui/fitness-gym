<<<<<<< HEAD
export interface UserLogin{
    identifier:string,
    password:string,
}

export interface UserRegister{
    username:string,
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
    username:string,
    first_name:string,
    last_name:string,
    birthdate:string,
    email:string,
    password:string,
    phone:string,
    dni:string,
    photo:string
}

=======
export interface UserLogin{
    identifier:string,
    password:string,
}

export interface UserRegister{
    username:string,
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
    docId:string,
    username:string,
    first_name:string,
    last_name:string,
    birthdate:string,
    email:string,
    password:string,
    phone:string,
    dni:string,
    photo:string
}

>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
