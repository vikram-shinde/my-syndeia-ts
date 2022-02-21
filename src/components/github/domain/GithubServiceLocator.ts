import { GithubBranchResponse, GithubCommitResponse, GithubIssueResponse, GithubRepositoryResponse, IGithubResponse } from '../model/Response';
import { IGithubRequest } from './../model/Request';
import { GithubService, GithubUserService, GithubRepoService, GithubBranchService, GithubCommitService, GithubIssueService, GithubTagService } from './GithubService';
import { GithubUserResponse, GithubTagResponse } from './../model/Response';
import { GithubResponseViewModel } from './../viewmodel/GithubResponseViewModel';

export interface IGithubServiceLocator {
    execute(item: IGithubRequest): Array<GithubResponseViewModel>
};

export class GithubServiceLocator implements IGithubServiceLocator {
    public execute(request: IGithubRequest): Array<GithubResponseViewModel> {
        let service: GithubService;

        switch (request.model) {
            case undefined:
                service = new GithubUserService();
                const users = (service.fetchData(request) as Array<GithubUserResponse>).
                map(item => new GithubResponseViewModel("userChildren", item.id, item.login, ""));
                return users;

            case "userChildren":
                service = new GithubRepoService();
                const repos = (service.fetchData(request) as Array<GithubRepositoryResponse>)
                .map(item => new GithubResponseViewModel("repoChildren", item.id, item.name, ""));
                return repos;

            case "repoChildren":
                const statics: Array<GithubResponseViewModel> = [
                    new GithubResponseViewModel("branchChildren", 101, "Branches", ""),
                    new GithubResponseViewModel("commitChildren", 102, "Commits", ""),
                    new GithubResponseViewModel("issueChildren", 103, "Issues", ""),
                    new GithubResponseViewModel("tagChildren", 104, "Tags", "")
                ];
                return statics;

            case "branchChildren":
                service = new GithubBranchService();
                const branches = (service.fetchData(request) as Array<GithubBranchResponse>).map((item, index) => new GithubResponseViewModel("", index, item.name, ""));
                return branches;

            case "commitChildren":
                service = new GithubCommitService();
                const commits = (service.fetchData(request) as Array<GithubCommitResponse>)
                .map((item, index) => new GithubResponseViewModel("", index, item.node_id, ""));
                return commits;

            case "issueChildren":
                service = new GithubIssueService();
                const issues = (service.fetchData(request) as Array<GithubIssueResponse>)
                .map((item, index) => new GithubResponseViewModel("", index, item.title, ""));
                return issues;

            case "tagChildren":
                service = new GithubTagService();
                const tags = (service.fetchData(request) as Array<GithubTagResponse>)
                .map((item, index) => new GithubResponseViewModel("", index, item.name, ""));
                return tags;

            default:
                return []
        }
    }
}