import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {RestService} from '../../msk-core/service/rest-service';
import {StorageUtils} from '../../../utils/storage-utils';
import {JsonContainer} from '../../msk-core/service/json-container';
import { BookingEvent } from './billing';
import {PhotoUpload} from '../../msk-core/photo/photo-upload';


@Injectable()
export class BillingService extends RestService {

  constructor(private client: HttpClient, private storageUtils: StorageUtils) {
    super(client, 'report', storageUtils);
  }

  save(billing: BookingEvent, callback: (result: JsonContainer, billing: BookingEvent) => void) {
    this.executePost('save', billing, callback)
  }

  saveImage(photoUpload: PhotoUpload, callback: (result: JsonContainer) => void) {
    this.executePost('saveImage', photoUpload, callback)
  }

  saveMobile(billing: BookingEvent, callback: (result: JsonContainer, billing: BookingEvent) => void) {
    this.executePost('saveMobile', billing, callback)
  }

  updateFile(billing: BookingEvent, callback: (result: JsonContainer, billing: BookingEvent) => void) {
    this.executePost('updateFile', billing, callback)
  }

  newUser(billing: BookingEvent, callback: (result: JsonContainer, billing: BookingEvent) => void) {
    this.executePost('newUser', billing, callback)
  }

  uploadFile(billing: BookingEvent, callback: (result: JsonContainer, billing: BookingEvent) => void) {
    this.executePost('uploadFile', billing, callback)
  }

  listAll(callback: (result: JsonContainer, roles: BookingEvent[]) => void) {
    this.executeGet('listTotalBookings', callback)
  }

  listPendingApprove(callback: (result: JsonContainer, roles: BookingEvent[]) => void) {
    this.executeGet('listPendingApprove', callback)
  }

  listActives(callback: (result: JsonContainer, roles: BookingEvent[]) => void) {
    this.executeGet('listActives', callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: BookingEvent) => void) {
    this.executeGet('listBookingsByEvent/' + id, callback)
  }
}
