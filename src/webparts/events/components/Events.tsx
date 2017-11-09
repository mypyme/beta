import * as React from 'react';
import styles from './Events.module.scss';
import { IEventsProps } from './IEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Events extends React.Component<IEventsProps, {}> {
  public render(): React.ReactElement<IEventsProps> {
    return (
      <div className='events-container'>
        <span>Today's Events</span>
        {this.props.CurrentEvents.value.map(function (item, index) {
          let initial = new Date(item.EventDate).getHours()+':'+new Date(item.EventDate).getMinutes();
          let endDate = new Date(item.EndDate).getHours()+':'+new Date(item.EndDate).getMinutes();
          
          return <div>
            <div>{item.Title}</div>
            <div>{initial}-{endDate}</div>
          </div>
        })}
      </div>
    );
  }
}
