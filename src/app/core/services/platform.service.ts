<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private _isNative = new BehaviorSubject<boolean>(false);
  public isNative$ = this._isNative.asObservable();
  constructor(
    private platform:Platform,
  ) {
    this._isNative.next(this.platform.is('cordova') || this.platform.is('capacitor'));
  }

=======
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private _isNative = new BehaviorSubject<boolean>(false);
  public isNative$ = this._isNative.asObservable();
  constructor(
    private platform:Platform,
  ) {
    this._isNative.next(this.platform.is('cordova') || this.platform.is('capacitor'));
  }

>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
}