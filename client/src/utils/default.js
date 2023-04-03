const user={id:0,username:'',password:''};

export class Default{

    static get user(){
        return Object.assign({},user);
    }

}