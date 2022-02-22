import { GithubRequest } from './../model/Request';
import { GithubResponseViewModel } from './../viewmodel/GithubResponseViewModel';
import { GithubBranchService, GithubCommitService, GithubIssueService, GithubRepoService, GithubTagService, /*GithubService,*/ GithubUserService } from './GithubService';
export interface IGithubServiceLocator {
    execute(item: GithubRequest): Promise<Array<GithubResponseViewModel>>
};

export class GithubServiceLocator implements IGithubServiceLocator {

    public execute(request: GithubRequest): Promise<Array<GithubResponseViewModel>> {
        switch (request.model) {
            case undefined:
                return new GithubUserService().fetchData()
                    .then(response => {
                        //console.log('GithubUserResponse: ', response.data);
                        return response.data
                            .map(item => new GithubResponseViewModel("repos", "users", item.id, item.login));
                    })
                    .catch((e: Error) => {
                        console.log('GithubUserResponse Error: ', e);
                        return [];
                    });

            case "repos":
                return new GithubRepoService().fetchData(request.getValue("users"))
                    .then(response => {
                        //console.log('GithubRepoService: ', response.data);
                        return response.data
                            .map(item => new GithubResponseViewModel("reposChildren", "repos", item.id, item.name));
                    })
                    .catch((e: Error) => {
                        console.log('GithubRepoService Error: ', e);
                        return [];
                    });

            case "reposChildren":
                const statics: Array<GithubResponseViewModel> = [
                    new GithubResponseViewModel("branches", "reposChildren", 101, "Branches"),
                    new GithubResponseViewModel("commits", "reposChildren", 102, "Commits"),
                    new GithubResponseViewModel("issues", "reposChildren", 103, "Issues"),
                    new GithubResponseViewModel("tags", "reposChildren", 104, "Tags")
                ];
                return new Promise((resolve) => { resolve(statics)});

            case "branches":
                return new GithubBranchService().fetchData(request.getValue("users"), request.getValue("repos"))
                    .then(response => {
                        //console.log('GithubBranchService: ', response.data);
                        return response.data
                            .map((item, index) => new GithubResponseViewModel("branchesChildren", "branches", index, item.name));
                    })
                    .catch((e: Error) => {
                        console.log('GithubBranchService Error: ', e);
                        return [];
                    });

            case "commits":
                return new GithubCommitService().fetchData(request.getValue("users"), request.getValue("repos"))
                    .then(response => {
                        //console.log('GithubCommitService: ', response.data);
                        return response.data
                            .map((item, index) => new GithubResponseViewModel("commitsChildren", "commits", index, item.node_id));
                    })
                    .catch((e: Error) => {
                        console.log('GithubCommitService Error: ', e);
                        return [];
                    });

            case "issues":
                return new GithubIssueService().fetchData(request.getValue("users"), request.getValue("repos"))
                    .then(response => {
                        //console.log('GithubIssueService: ', response.data);
                        return response.data
                            .map((item, index) => new GithubResponseViewModel("issuesChildren", "issues", index, item.title));
                    })
                    .catch((e: Error) => {
                        console.log('GithubIssueService Error: ', e);
                        return [];
                    });

            case "tags":
                return new GithubTagService().fetchData(request.getValue("users"), request.getValue("repos"))
                    .then(response => {
                        //console.log('GithubTagService: ', response.data);
                        return response.data
                            .map((item, index) => new GithubResponseViewModel("tagsChildren", "tags", index, item.name));
                    })
                    .catch((e: Error) => {
                        console.log('GithubTagService Error: ', e);
                        return [];
                    });

            default:
                return new Promise((resolve) => { resolve([]); });
        }
    }
}