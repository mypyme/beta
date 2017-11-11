import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
  

  export class TabsNews {
  
      private _context : any;
      private static _instance : TabsNews = null;
  
      public getAllItems(): Promise<any> {
          return this._context.spHttpClient.get(this._context.pageContext.web.absoluteUrl + `/_api/lists/getbytitle('Tabs News')/items`, SPHttpClient.configurations.v1)
              .then((response: SPHttpClientResponse) => {
                  return response.json().then((result)=>{
                      return result.value.reduce((acum, current) => {

                        let content = acum.find((value)=>{
                            return value.Categoria === current.Categoria;
                        });

                        if(!content) {
                            acum.push({
                                'categoria': current.Categoria,
                                'content': {
                                    'Categoria': current.Categoria,
                                    'Noticia': current.Noticia,
                                    'Link': current.Link.Url,
                                    'Imagen': current.Imagen.Url,
                                    'Titulo': current.Title
                                }
                            });
                        } 
                        return acum;
                      }, []);
                  });
              });
      }
  
      public static Instance() : TabsNews {
          if(this._instance == null) {
              this._instance = new TabsNews();
          }
          return this._instance;
      }
  
      public SetContext(context) : void {
          this._context = context;
      }
  }
  