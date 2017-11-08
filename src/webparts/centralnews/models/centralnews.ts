import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
  
  export class CentralNewsModel {
  
      private _context : any;
      private static _instance : CentralNewsModel = null;
  
      public getAllItems(): Promise<any[]> {
          return this._context.spHttpClient.get(this._context.pageContext.web.absoluteUrl + `/_api/lists/getbytitle('Central News')/items`, SPHttpClient.configurations.v1)
              .then((response: SPHttpClientResponse) => {
                  return response.json();
              });
      }
  
      public static Instance() : CentralNewsModel {
          if(this._instance == null) {
              this._instance = new CentralNewsModel();
          }
          return this._instance;
      }
  
      public SetContext(context) : void {
          this._context = context;
      }
  }
  