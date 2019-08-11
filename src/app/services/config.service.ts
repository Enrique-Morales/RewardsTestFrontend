import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api: string = "http://localhost:8081/json";

  public get api(): string {
      return this._api;
  }

  public get header(): Object {
      const httpOptions = {
          'withCredentials': true
      };
      return httpOptions;
  }

  constructor() { }
}
