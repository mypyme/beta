import * as React from 'react';
import styles from './Menu.module.scss';
import { IMenuProps } from './IMenuProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Menu extends React.Component<IMenuProps, {}> {
  public render(): React.ReactElement<IMenuProps> {
    return (
      <div className={styles.menu}>
        {
          this.props.Items.map((item)=>{
            return <span className={styles.menuitem}><a href={item.Link}>{item.Titulo}</a></span>
          })
        }
      </div>
    );
  }
}
