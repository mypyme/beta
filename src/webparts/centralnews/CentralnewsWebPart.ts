import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CentralnewsWebPartStrings';
import CentralNews from './components/CentralNews';
import { ICentralNewsProps } from './components/ICentralnewsProps';
import { createStore, IState } from './store';
import { Store } from 'redux';
import { CentralNewsModel } from './models/centralnews';

export interface ICentralNewsWebPartProps {
  description: string;
}

export default class CentralNewsWebPart extends BaseClientSideWebPart<ICentralNewsWebPartProps> {

  private store : Store<IState>;

  constructor() {
    super();
    // Initialization of the store
    this.store = createStore();
  }

  public render(): void {

    CentralNewsModel.Instance().SetContext(this.context);
    CentralNewsModel.Instance().getAllItems().then((response)=>{
      const element: React.ReactElement<ICentralNewsProps > = React.createElement(
      CentralNews,
      {
        news: response
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
