import { AxiosResponse } from "axios";
import http from "../../shared/http-common";
import { GithubBranchResponse, GithubCommitResponse, GithubIssueResponse, GithubRepositoryResponse, GithubUserResponse } from "../model/Response";
import { GithubTagResponse } from './../model/Response';

// export abstract class GithubService {
//   abstract fetchData(request: IGithubRequest): Promise<AxiosResponse<Array<IGithubResponse>>>;
// };

export class GithubUserService /*extends GithubService*/ {
  public fetchData(): Promise<AxiosResponse<Array<GithubUserResponse>>> {
    return http.get<Array<GithubUserResponse>>("users");
  }
}

export class GithubRepoService /*extends GithubService*/ {
  public fetchData(loginname: string): Promise<AxiosResponse<Array<GithubRepositoryResponse>>> {
    return http.get<Array<GithubRepositoryResponse>>(`users/${loginname}/repos`);
  }
}

export class GithubBranchService /*extends GithubService*/ {
  public fetchData(loginname: string, reponame: string): Promise<AxiosResponse<Array<GithubBranchResponse>>> {
    return http.get<Array<GithubBranchResponse>>(`repos/${loginname}/${reponame}/branches`);
  }
}

export class GithubCommitService /*extends GithubService*/ {
  public fetchData(loginname: string, reponame: string): Promise<AxiosResponse<Array<GithubCommitResponse>>> {
    return http.get<Array<GithubCommitResponse>>(`repos/${loginname}/${reponame}/commits`);
  }
}

export class GithubIssueService /*extends GithubService*/ {
  public fetchData(loginname: string, reponame: string): Promise<AxiosResponse<Array<GithubIssueResponse>>> {
    return http.get<Array<GithubIssueResponse>>(`repos/${loginname}/${reponame}/issues`);
  }
}

export class GithubTagService /*extends GithubService*/ {
  public fetchData(loginname: string, reponame: string): Promise<AxiosResponse<Array<GithubTagResponse>>> {
    return http.get<Array<GithubTagResponse>>(`repos/${loginname}/${reponame}/tags`);
  }
}