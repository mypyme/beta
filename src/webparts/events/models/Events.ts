import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
  
import { IEvents } from '../models/IEvents';

  export class EventsModel {
  
      private _context : any;
      private static _instance : EventsModel = null;
  
      public getAllItems(): Promise<IEvents[]> {
          let today = new Date();
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);

          return this._context.spHttpClient.get(this._context.pageContext.web.absoluteUrl + `/_api/lists/getbytitle('Eventos')/items?$filter=EventDate ge '` + today.toISOString() +`' and EventDate le '` + tomorrow.toISOString() + `'`, SPHttpClient.configurations.v1)
              .then((response: SPHttpClientResponse) => {
                  return response.json();
              });
      }
  
      public static Instance() : EventsModel {
          if(this._instance == null) {
              this._instance = new EventsModel();
          }
          return this._instance;
      }
  
      public SetContext(context) : void {
          this._context = context;
      }
  }  