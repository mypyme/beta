import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EventsWebPartStrings';
import Events from './components/Events';
import { IEventsProps } from './components/IEventsProps';
import { EventsModel } from './models/Events';
import { IEvents } from './models/IEvents';

export interface IEventsWebPartProps {
  Descripcion: string;
}

export default class EventsWebPart extends BaseClientSideWebPart<IEventsWebPartProps> {

  public render(): void {
    EventsModel.Instance().SetContext(this.context);
    EventsModel.Instance().getAllItems().then((response) => {

      const element: React.ReactElement<IEventsProps> = React.createElement(
        Events,
        {
          CurrentEvents : response
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
