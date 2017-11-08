import * as React from 'react';
import styles from './CentralNews.module.scss';
import { ICentralNewsProps } from './ICentralNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CentralNews extends React.Component<ICentralNewsProps, {}> {
  public render(): React.ReactElement<ICentralNewsProps> {
    return (
      <div className='news-container'>
        {this.props.news.value.map(function (item, index) {
          var rawMarkup= item.Noticia;
          return <div>
            <div><a href={item.Link.Url}>{item.Title}</a></div>
            <img src={item.Imagen.Url}></img>
            <div dangerouslySetInnerHTML={{__html: rawMarkup}}></div>
          </div>
        })}
      </div>
    );
  }
}
