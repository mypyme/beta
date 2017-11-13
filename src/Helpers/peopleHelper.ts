import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';

export class PeopleHelper {

    public static SearchUsers(key : string, context : any) : Promise<any> {
       
        return context.spHttpClient.get(encodeURI(context.pageContext.web.absoluteUrl + `/_api/search/query?querytext='PreferredName:*`+key+`*'&sourceid='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31'&selectproperties='PreferredName,WorkEmail,Department,PictureURL,WorkPhone'`), SPHttpClient.configurations.v1, {
            headers: {
              'odata-version': '3.0'
            }})
            .then((response)=>{
                return response.json().then((res)=>{
                    return res.PrimaryQueryResult.RelevantResults.Table.Rows.map((row)=>{
                          return row.Cells;
                    });
                });
            }); 
    }

    public static GetTodaysBirthdaysUsers(context : any, managedPropertyName:string) : Promise<any> {
        let currentDate = new Date();
        let currentMonth = currentDate.getUTCMonth()+1;
        let currentDay = currentDate.getUTCDate()+1;
        
         return context.spHttpClient.get(encodeURI(context.pageContext.web.absoluteUrl + `/_api/search/query?querytext='*'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&selectproperties='PreferredName,WorkEmail,Department,PictureURL,WorkPhone'&refinementfilters='`+managedPropertyName+`:datetime("2000-`+currentMonth+`-`+currentDay+`")'`), SPHttpClient.configurations.v1, {
             headers: {
               'odata-version': '3.0'
             }})
             .then((response)=>{
                 return response.json().then((res)=>{
                     return res.PrimaryQueryResult.RelevantResults.Table.Rows.map((row)=>{
                           return row.Cells;
                     });
                 });
             });     
     }
 

}