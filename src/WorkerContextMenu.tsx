import * as React from 'react';
import './WorkerContextMenu.css';
import { Menu } from 'react-data-grid-addons';
import {ScaleWorkerUnit } from './DataService';

type ContextEventHandler = (e: Event, d: { rowIdx: number }) => void;

interface ContextProps {
  onWorkerAdd: ContextEventHandler;
  onWorkerPing: ContextEventHandler;
  onWorkerRenew: ContextEventHandler;
  rowIdx?: number;
  idx?: number;
}

export class WorkerContextMenu extends React.Component<ContextProps, { rows: ScaleWorkerUnit[] }> {
  onAdd: ContextEventHandler;
  onRenew: ContextEventHandler;
  onPing: ContextEventHandler;

  constructor() {
    super();
    this.onAdd = (e, d) => this.props.onWorkerAdd(e, d);
    this.onRenew = (e, d) => this.props.onWorkerRenew(e, d);
    this.onPing = (e, d) => this.props.onWorkerPing(e, d);
  }

  render() {
    return (
      <Menu.ContextMenu id="">
        <Menu.MenuItem
          data={{rowIdx: this.props.rowIdx}}
          onClick={this.onAdd}
        >
        Add
        </Menu.MenuItem>
        <Menu.MenuItem
          data={{rowIdx: this.props.rowIdx}}
          onClick={this.onRenew}
        >
        Renew
        </Menu.MenuItem>
        <Menu.MenuItem
          data={{rowIdx: this.props.rowIdx}}
          onClick={this.onPing}
        >
        Ping
        </Menu.MenuItem>
      </Menu.ContextMenu>
    );
  }
}