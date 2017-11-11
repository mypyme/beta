import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TabsnewsWebPartStrings';
import Tabsnews from './components/Tabsnews';
import { ITabsnewsProps } from './components/ITabsnewsProps';
import { TabsNews } from './Models/TabsNews';

export interface ITabsnewsWebPartProps {
  description: string;
}

export default class TabsnewsWebPart extends BaseClientSideWebPart<ITabsnewsWebPartProps> {

  public render(): void {

    // getting data
    TabsNews.Instance().SetContext(this.context);
    TabsNews.Instance().getAllItems().then((resolve) =>{
      const element: React.ReactElement<ITabsnewsProps > = React.createElement(
        Tabsnews,
        {
          News : resolve 
        }
      );
  
      ReactDom.render(element, this.domElement);  
    });

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
