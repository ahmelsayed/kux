import * as React from 'react';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import * as ReactDataGrid from 'react-data-grid';
// import * as update from 'immutability-helper';
import { DataService, ScaleWorkerUnit } from './DataService';
// import { Toolbar } from 'react-data-grid-addons';

import './App.css';
import { Column } from 'react-data-grid';
import { WorkerContextMenu } from './WorkerContextMenu';

const logo = require('./logo.svg');

interface AppState { rows: ScaleWorkerUnit[]; }

class App extends React.Component<{}, AppState> {
  grid: ReactDataGrid | null;
  _columns: ScaleWorkerUnit[];
  _getRowAt: (index: number) => ScaleWorkerUnit;

  constructor() {
    super();
    this.setState({ rows: []});
    this._getRowAt = this.getRowAt.bind(this);
  }

  componentDidMount() {
    DataService.getWorkers()
      .then(workers => {
        if (workers !== null) {
          this.setState({ rows: workers });
        }
      });
  }

  handleClick(e: Event, data: string) {
    // tslint:disable-next-line:no-console
    console.log(data);
  }

  getColumns(): Column[] {
    let columns = DataService.getWorkersColumns();
    return columns;
  }

  getRowAt(index: number): ScaleWorkerUnit {
    // tslint:disable-next-line:no-console
    if (index > 0 && this.state) {
      return this.state.rows[index];
    } else {
      return {};
    }
  }

  getSize(): number {
    if (this.state && this.state.rows) {
      return this.state.rows.length;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, yo</h2>
        </div>
        <div>
          <ReactDataGrid
            contextMenu = {<WorkerContextMenu
              // tslint:disable-next-line:no-console
              onWorkerAdd={(e, d) => console.log(e, d)}
              // tslint:disable-next-line:no-console
              onWorkerRenew={(e, d) => console.log(e, d)}
              // tslint:disable-next-line:no-console
              onWorkerPing={(e, d) => console.log(e, d)}
            />}
            ref={node => this.grid = node}
            // enableCellSelect={true}
            columns={this.getColumns()}
            rowGetter={this._getRowAt}
            rowsCount={this.getSize()}
            // onGridRowsUpdated={this.handleGridRowsUpdated}
            // toolbar={<Toolbar />}
            // enableRowSelect={true}
            rowHeight={50}
            minHeight={600}

            // rowScrollTimeout={200}
          />
        </div>
      </div>
    );
  }
}

export default App;
