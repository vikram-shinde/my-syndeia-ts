
export class GithubResponseViewModel{
    model: string;
    id: number;
    label: string;
    icon: string;
    children: Array<GithubResponseViewModel>

    constructor(model: string, id: number, label: string, icon: string){
        this.model = model;
        this.id = id;
        this.label = label;
        this.icon = icon;
        this.children = [];
    }
}