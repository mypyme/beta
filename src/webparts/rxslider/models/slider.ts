import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

export interface ISPList {
    Title: string;
    Id: string;
    Descripci_x00f3_n: string;
    Link: string;
    Imagen: string;
}

export class SlideModel {

    private _context : any;
    private static _instance : SlideModel = null;

    public getAllItems(webpartProperties : any): Promise<ISPList> {
        return this._context.spHttpClient.get(this._context.pageContext.web.absoluteUrl + `/_api/lists/getbytitle('`+ webpartProperties.listField +`')/items?select=`+webpartProperties.titleField+`,`+webpartProperties.linkField+`,`+webpartProperties.imageFiel+`,`+webpartProperties.descriptionField, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            });
    }

    public static Instance() : SlideModel {
        if(this._instance == null) {
            this._instance = new SlideModel();
        }
        return this._instance;
    }

    public SetContext(context) : void {
        this._context = context;
    }
}
