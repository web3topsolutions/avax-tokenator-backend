import { CreateTokenResponse } from '../domain/modules/crete-token-response';
import {CreateTokenRequest} from "../domain/modules/create-token-request";

export interface IBaseService {
  createToken(request: CreateTokenRequest): Promise<CreateTokenResponse>;
}