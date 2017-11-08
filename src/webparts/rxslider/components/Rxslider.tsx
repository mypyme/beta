import * as React from 'react';
import styles from './Rxslider.module.scss';
import { IRxsliderProps } from './IRxsliderProps';
import { escape } from '@microsoft/sp-lodash-subset';
require('./slider.css');

export default class Rxslider extends React.Component<IRxsliderProps, {}> {


  public render(): React.ReactElement<IRxsliderProps> {

    let slideWidth = {
      width : this.props.slides.connection.width
    };

    return (
        <div className='slider-container' style={slideWidth}>
        {
         this.props.slides.slides ?  this.props.slides.slides.map(function (item, index) {
              return <div>
                <div><a href={item.link}>{item.title}</a></div>
                <img src={item.image}></img>
                <div dangerouslySetInnerHTML={{ __html : item.description }}/>
              </div>
            }.bind(this)) : ''
        }
        </div>
    );
  }
}
