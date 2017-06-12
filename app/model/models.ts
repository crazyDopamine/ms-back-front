export class User {
    id: number;
    account: string;
    name: string;
    type:number;
}

export class Msg {
    id: number;
    title:string;
    description:string;
    type: number;
    content:string;
    photo:string;
}

export class Dictionary {
    id: number;
    code: string;
    name: string;
    value: string;
}