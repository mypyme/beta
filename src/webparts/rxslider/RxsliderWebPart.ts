import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import Rxslider from './components/Rxslider';
import { IRxsliderProps } from './components/IRxsliderProps';
import { createStore, IState } from './store/index'; 
import { Store } from 'redux';
import { updateSlides, updateConnection } from './reducers/webpart';
import { SlideModel } from './models/slider';
import * as $ from 'jquery';
import 'slick-carousel';

export interface IRxsliderWebPartProps {
  description: string;
  Description: string;
  Link: string;
  Image: string;
  Title: string;
  List: string;
  Width: string;
}

export default class RxsliderWebPart extends BaseClientSideWebPart<IRxsliderWebPartProps> {
  private store: Store<IState>;
  private newValue: any;

  constructor() {
    super();
    // Initialization of the store
    this.store = createStore();
  }

  public render(): void {
    let properties = this.getWebpartProperties();
    this.store.dispatch(updateConnection(properties));
    this.getSlideData(properties);
    this.store.subscribe(this.updateUI.bind(this));
  }

  private getSlideData(webpartProperties: any) {
    SlideModel.Instance().SetContext(this.context);
    SlideModel.Instance().getAllItems(webpartProperties).then((response: any) => {

      if(response.error) {
        ReactDom.render(React.createElement('div', null, 'Properties are not filled correctly, please check propertie webpart values'), this.domElement);
        return;
      }

      // update store
      let properties = this.getWebpartProperties();

      this.newValue = response.value.map((news) => {
        return {
          'link':  news[properties.linkField] ? news[properties.linkField].Url : '',
          'title': news[properties.titleField],
          'image': news[properties.imageField] ? news[properties.imageField].Url : '',
          'description': news[properties.descriptionField] ? news[properties.descriptionField] : ''
        }
      });

      this.store.dispatch(updateSlides(this.newValue));
    });
  }

  private updateUI() {
    const element: React.ReactElement<IRxsliderProps> = React.createElement(
      Rxslider,
      {
        slides: this.store.getState().webpart
      }
    );
    ReactDom.render(element, this.domElement);
    try {
      $('.slider-container').slick({
        dots: true,
        speed: 500
      });
    } catch (err) { }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onAfterPropertyPaneChangesApplied()  {
      let webpartProperties = this.getWebpartProperties();
      this.store.dispatch(updateConnection(webpartProperties));
      this.getSlideData(webpartProperties);
  }

protected getWebpartProperties() {
    let webpartProperties = {
    'descriptionField' : this.properties.Description,
    'listField' : this.properties.List,
    'imageField' : this.properties.Image,
    'titleField': this.properties.Title,
    'linkField' : this.properties.Link,
    'width': this.properties.Width
  }
  return webpartProperties;
}

  protected get disableReactivePropertyChanges() {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Properties'
          },
          groups: [
            {
              groupName: 'Configuration',
              groupFields: [
                PropertyPaneTextField('List', {
                  label: 'List Name'
                }),
                PropertyPaneTextField('Title', {
                  label: 'Title Field'
                }),
                PropertyPaneTextField('Image', {
                  label: 'Image Field'
                }),
                PropertyPaneTextField('Description', {
                  label: 'Description Field'
                }),
                PropertyPaneTextField('Link', {
                  label: 'Link Field'
                }),
                PropertyPaneTextField('Width', {
                  label: 'Component Width'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
