import * as React from 'react';
import styles from './Usersdirectory.module.scss';
import { IUsersdirectoryProps } from './IUsersdirectoryProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Usersdirectory extends React.Component<IUsersdirectoryProps, {}> {
  public render(): React.ReactElement<IUsersdirectoryProps> {
    return (
      <div className={styles.usersdirectory}>
        <h3>Nuestros Colaboradores</h3>
        <input className={styles.searchinput} type='text' onChange={this.props.changeEvent}></input>
        <div className={styles.searchbutton} onClick={this.props.searchEvent}></div>
        <div>
        {
            this.props.results ? this.props.results.map(function (item, index) {
              return <div className={styles.row}>
                <img src={item.picture} className={styles.img}/>
                <div className={styles.detail}>
                  <span>{item.name}</span>
                  <div>{item.department}</div>
                  <div>{item.workPhone}</div>
                </div>
              </div>
            }) : ''
        } 
        </div>
      </div>
    );
  }
}
