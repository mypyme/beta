import * as React from 'react';
import styles from './Events.module.scss';
import { IEventsProps } from './IEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Events extends React.Component<IEventsProps, {}> {
  public render(): React.ReactElement<IEventsProps> {
    return (
      <div className={styles.events}>
        <h3>Eventos de Hoy</h3>
        {this.props.CurrentEvents.value.map(function (item, index) {
          let initial = new Date(item.EventDate).getHours()+':'+new Date(item.EventDate).getMinutes();
          let endDate = new Date(item.EndDate).getHours()+':'+new Date(item.EndDate).getMinutes();
          
          return <div className={styles.event}>
            <div className={styles.image}/>
            <div className={styles.detail}>
              <div className={styles.title}>{item.Title}</div>
              <div><b>Lugar:</b> {item.Location}</div>
              <div><b>Hora:</b> {initial}-{endDate}</div>
            </div>
          </div>
        })}
      </div>
    );
  }
}
