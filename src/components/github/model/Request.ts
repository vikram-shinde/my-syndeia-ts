
import { GithubResponseViewModel } from './../viewmodel/GithubResponseViewModel';
export class GithubRequest{
    model: string | undefined = undefined;
    expandedTreeStructure: { key: string; value: string; }[] = [];

    constructor(model: string | undefined, expandedTreeStructure: { key: string; value: string; }[]){
        this.model = model;
        this.expandedTreeStructure = expandedTreeStructure;
    }

    public getValue(key: string){
        let item = this.expandedTreeStructure.find(kv=>kv.key === key);
        return item?.value ?? "";
    }
}