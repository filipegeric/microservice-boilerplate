import { UserService } from '../services/user.service';
import { IHttpRequest, IHttpResponse } from '../types/http';

export class UserController {
  constructor(private userService: UserService) {}

  public async getUser(request: IHttpRequest): Promise<IHttpResponse<any>> {
    const username = request.params.username;
    const user = await this.userService.getUser(username);
    return {
      status: 200,
      data: user
    };
  }
}
