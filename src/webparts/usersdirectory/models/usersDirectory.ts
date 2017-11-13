import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
import { PeopleHelper } from '../../../Helpers/peopleHelper'

  export interface IUser{
    name : string,
    department : string,
    picture : string
}

  export class DirectoryModel {
  
      private _context : any;
      private static _instance : DirectoryModel = null;
  
      public getAllItems(token : string): Promise<IUser> {
        return PeopleHelper.SearchUsers(token, this._context).then((response)=>{
            return response.map((prop)=>{
                let user : IUser = {
                    name : this.getPropertyValue(prop, 'PreferredName'),
                    picture : this.getPropertyValue(prop, 'PictureURL'),
                    department : this.getPropertyValue(prop, 'Department')
                }
                return user;
            });
        });
      }
  
      public static Instance() : DirectoryModel {
          if(this._instance == null) {
              this._instance = new DirectoryModel();
          }
          return this._instance;
      }
  
      public SetContext(context) : void {
          this._context = context;
      }

      private getPropertyValue(arrayProp, nameProp) : string  {
        let foundItem = arrayProp.find((item)=>{
            return item.Key === nameProp;
        });

        return foundItem? foundItem.Value : null;
      }
  }
  