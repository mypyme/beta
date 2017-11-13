import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'UsersdirectoryWebPartStrings';
import Usersdirectory from './components/Usersdirectory';
import { IUsersdirectoryProps } from './components/IUsersdirectoryProps';
import { DirectoryModel } from'./models/usersDirectory'
import { createStore } from './store/index'
import { updateDirectory } from './reducers/webpart'

export interface IUsersdirectoryWebPartProps {
  description: string;
}

export default class UsersdirectoryWebPart extends BaseClientSideWebPart<IUsersdirectoryWebPartProps> {

  store : any = null;
  searchText : string = null;

  constructor() {
    super();
    // Initialization of the store
    this.store = createStore();
    this.store.subscribe(this.updateUI.bind(this));   
  }

  public render(): void {
    this.updateUI();
  }

  private searchUser(): void {
    DirectoryModel.Instance().SetContext(this.context);
    DirectoryModel.Instance().getAllItems(this.searchText).then((response) => {
      this.store.dispatch(updateDirectory(response));      
    });
  } 

private updateUI() : void {
  const element: React.ReactElement<IUsersdirectoryProps> = React.createElement(
    Usersdirectory,
    {
      results: this.store.getState().webpart.users,
      changeEvent: this.changeEvent.bind(this),
      searchEvent: this.searchEvent.bind(this)
    }
  );

  if(this && this.domElement) {
    ReactDom.render(element, this.domElement);
  }
}

  protected searchEvent(e) {
    this.searchUser();
  }

  protected changeEvent(e) {
    this.searchText = e.target.value;
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
