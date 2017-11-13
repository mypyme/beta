import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TodaysbirthdaysWebPartStrings';
import Todaysbirthdays from './components/Todaysbirthdays';
import { ITodaysbirthdaysProps } from './components/ITodaysbirthdaysProps';
import { BirthdaysModel } from './models/birthdaysModels';

export interface ITodaysbirthdaysWebPartProps {
  description: string;
  managedPropertyName: string;  
}

export default class TodaysbirthdaysWebPart extends BaseClientSideWebPart<ITodaysbirthdaysWebPartProps> {

  public render(): void {
    if(!this.properties.managedPropertyName) {
      return;
    }

    this.updateUI();
  }

  private updateUI() : void {
    BirthdaysModel.Instance().SetContext(this.context);
    BirthdaysModel.Instance().getTodaysBirthdays(this.properties.managedPropertyName).then((response)=>{
      const element: React.ReactElement<ITodaysbirthdaysProps > = React.createElement(
        Todaysbirthdays,
        {
          users: response,
          description: this.properties.description
        }
      );
  
      ReactDom.render(element, this.domElement);
  
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges() {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied()  {
    this.updateUI();
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
                }),
                PropertyPaneTextField('managedPropertyName', {
                  label: 'Birthday Property Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
