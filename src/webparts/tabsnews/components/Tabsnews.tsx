import * as React from 'react';
import styles from './Tabsnews.module.scss';
import { ITabsnewsProps } from './ITabsnewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Tabs, Tab } from 'react-tab-view';
require('./ReactTabs.css');

export default class Tabsnews extends React.Component<ITabsnewsProps, {}> {
  public render(): React.ReactElement<ITabsnewsProps> {

    const headers = this.props.News ? this.props.News.map((value)=>{
      return value.categoria;
    }) : null; 
    
       return (
         <div>
           <Tabs headers={headers}>
             { this.props.News ?  this.props.News.map(element => {
               return <Tab>
                 <div><a href={element.content.Link}>{element.content.Titulo}</a></div>
                 <img src={element.content.Imagen}></img>
                 <div  dangerouslySetInnerHTML={{ __html : element.content.Noticia }} />
               </Tab>

             }) :''
             }
           </Tabs>
         </div>
       );
  }
}
