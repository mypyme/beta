import * as React from 'react';
import styles from './Todaysbirthdays.module.scss';
import { ITodaysbirthdaysProps } from './ITodaysbirthdaysProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Todaysbirthdays extends React.Component<ITodaysbirthdaysProps, {}> {
  public render(): React.ReactElement<ITodaysbirthdaysProps> {
    return ( 
      <div>
      <h3>Today's Birthdays</h3>
      {
          this.props.users ? this.props.users.map(function (item, index) {
            return <div>
              <img src={item.picture}/>
              <span>{item.name}</span>
              <div>Department:{item.department}</div>
              <div>WorkPhone:{item.workPhone}</div>
            </div>
          }) : ''
      } 
      </div>
    );
  }
}
