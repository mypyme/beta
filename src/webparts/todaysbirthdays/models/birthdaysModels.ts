import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
import { PeopleHelper } from '../../../Helpers/peopleHelper'

  export interface IUser{
    name : string,
    department : string,
    picture : string,
    workPhone: string,
    workEmail: string
}

  export class BirthdaysModel {
  
      private _context : any;
      private static _instance : BirthdaysModel = null;
  
      public getTodaysBirthdays(managedPropertyName : string): Promise<IUser> {
        return PeopleHelper.GetTodaysBirthdaysUsers(this._context, managedPropertyName).then((response)=>{
            return response.map((prop)=>{
                let user : IUser = {
                    name : this.getPropertyValue(prop, 'PreferredName'),
                    picture : this.getPropertyValue(prop, 'PictureURL'),
                    department : this.getPropertyValue(prop, 'Department'),
                    workPhone: this.getPropertyValue(prop, 'WorkPhone'),
                    workEmail: this.getPropertyValue(prop, 'WorkEmail')
                }
                return user;
            });
        });
      }
  
      public static Instance() : BirthdaysModel {
          if(this._instance == null) {
              this._instance = new BirthdaysModel();
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
  