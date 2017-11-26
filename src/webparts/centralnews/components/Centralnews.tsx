import * as React from 'react';
import styles from './CentralNews.module.scss';
import { ICentralNewsProps } from './ICentralNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CentralNews extends React.Component<ICentralNewsProps, {}> {
  public render(): React.ReactElement<ICentralNewsProps> {
    return (
      <div className={styles.centralnews}>
        <h3>Cuídate / Cuidame</h3>
        {this.props.news.value.map(function (item, index) {
          var rawMarkup= item.Noticia;
          return <div className={styles.new}>
            <div className={styles.image}>
              <img src={item.Imagen.Url}></img>
            </div>
            <div className={styles.detail}>
              <a href={item.Link.Url}>{item.Title}</a>
              <span dangerouslySetInnerHTML={{__html: rawMarkup}}></span>
            </div>
          </div>
        })}
      </div>
    );
  }
}
