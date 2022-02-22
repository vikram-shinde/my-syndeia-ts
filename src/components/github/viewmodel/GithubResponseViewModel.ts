
export class GithubResponseViewModel{
    model: string;
    currentModel: string;
    id: number;
    label: string;
    icon?: string;
    username?: string;
    reponame?: string;
    children: Array<GithubResponseViewModel>

    constructor(model: string, currentModel: string, id: number, label: string, username?: string, reponame?:string, icon?: string){
        this.model = model;
        this.currentModel = currentModel;
        this.id = id;
        this.label = label;
        this.icon = icon;
        this.username = username;
        this.reponame = reponame;
        this.children = [];
    }
}