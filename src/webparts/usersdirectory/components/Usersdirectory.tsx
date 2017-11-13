import * as React from 'react';
import styles from './Usersdirectory.module.scss';
import { IUsersdirectoryProps } from './IUsersdirectoryProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Usersdirectory extends React.Component<IUsersdirectoryProps, {}> {
  public render(): React.ReactElement<IUsersdirectoryProps> {
    return (
      <div>
        <input type='text' onChange={this.props.changeEvent}></input>
        <input type='button' onClick={this.props.searchEvent} value='Search'></input>
        <div>
        {
            this.props.results ? this.props.results.map(function (item, index) {
              return <div>
                <img src={item.picture}/>
                <span>{item.name}</span>
                <div>{item.department}</div>
                <div>WorkPhone:{item.workPhone}</div>
              </div>
            }) : ''
        } 
        </div>
      </div>
    );
  }
}
