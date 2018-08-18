import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Cadastre} from "./cadastre";
import {PhotoUpload} from '../../msk-core/photo/photo-upload';



@Injectable()
export class CadastreService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "userBackoffice", storageUtils);
  }

  saveUser(cadastre: Cadastre, callback: (result: JsonContainer, cadastre: Cadastre) => void){
    this.executePost("saveUser", cadastre, callback)
  }

  saveImage(photoUpload: PhotoUpload, callback: (result: JsonContainer) => void){
    this.executePost("saveImage", photoUpload, callback)
  }

  saveMobile(cadastre: Cadastre, callback: (result: JsonContainer, cadastre: Cadastre) => void){
    this.executePost("saveMobile", cadastre, callback)
  }

  changeStatus(cadastre: Cadastre, callback: (result: JsonContainer, cadastre: Cadastre) => void){
    this.executePost("changeStatus", cadastre, callback)
  }

  newUser(cadastre: Cadastre, callback: (result: JsonContainer, cadastre: Cadastre) => void){
    this.executePost("newUser", cadastre, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Cadastre[]) => void){
    this.executeGet("listAdminUsers", callback)
  }

  listPendingApprove(callback: (result: JsonContainer, roles: Cadastre[]) => void){
    this.executeGet("listPendingApprove", callback)
  }

  listActives(callback: (result: JsonContainer, roles: Cadastre[]) => void){
    this.executeGet("listActives", callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: Cadastre) => void){
    this.executeGet("load/" + id, callback)
  }
}

