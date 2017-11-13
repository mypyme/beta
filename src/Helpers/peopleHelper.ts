import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';

export class PeopleHelper {

    public static SearchUsers(key : string, context : any) : Promise<any> {
       
        return context.spHttpClient.get(encodeURI(context.pageContext.web.absoluteUrl + `/_api/search/query?querytext='PreferredName:*`+key+`*'&sourceid='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31'`), SPHttpClient.configurations.v1, {
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