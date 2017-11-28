import * as React from 'react';
import styles from './Todaysbirthdays.module.scss';
import { ITodaysbirthdaysProps } from './ITodaysbirthdaysProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Todaysbirthdays extends React.Component<ITodaysbirthdaysProps, {}> {
  public render(): React.ReactElement<ITodaysbirthdaysProps> {
    return ( 
      <div className={styles.todaysbirthdays}>
      <h3>Nuestros Cumpleaños</h3>
      {
          this.props.users ? this.props.users.map(function (item, index) {
            return <div>
              <img src={item.picture}/>
              <div className={styles.detail}>
                <span>{item.name}</span>
                <div>{item.department}</div>
                <div>{item.workPhone}</div>
                <div className={styles.highlight}>{item.workEmail}</div>
              </div>
            </div>
          }) : ''
      } 
      </div>
    );
  }
}
