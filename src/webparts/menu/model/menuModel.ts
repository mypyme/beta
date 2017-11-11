import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
  

  export class MainMenu {
  
      private _context : any;
      private static _instance : MainMenu = null;
  
      public getAllItems(): Promise<any> {
          return this._context.spHttpClient.get(this._context.pageContext.web.absoluteUrl + `/_api/lists/getbytitle('Menu')/items`, SPHttpClient.configurations.v1)
              .then((response: SPHttpClientResponse) => {
                  return response.json().then((result)=>{
                      return result.value.map((item)=>{
                        return {
                            'Titulo' : item.Title,
                            'Orden' : item.Orden,
                            'Link' : item.Link.Url
                        }
                      }).sort((a, b)=>{
                          return a.Orden - b.Orden;
                      });
                  });
              });
      }
  
      public static Instance() : MainMenu {
          if(this._instance == null) {
              this._instance = new MainMenu();
          }
          return this._instance;
      }
  
      public SetContext(context) : void {
          this._context = context;
      }
  }
  