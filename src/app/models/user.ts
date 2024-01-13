export class User {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public role?: string;

    constructor(id: number, name: string,email: string,  pwd: string, role?: string) {
        this.id = id;
        this.username = name;
        this.email=email;
        this.password = pwd; 
        this.role = role || '';  
    }

}
