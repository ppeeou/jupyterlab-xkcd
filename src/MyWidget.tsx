
import {
  VDomModel,
  VDomRenderer
} from '@jupyterlab/apputils';

// import {
//   Button
// } from '@jupyterlab/ui-components';

import * as React from 'react';
import * as api from './api';


// import { Terminal } from './Widget'

class LauncherModel extends VDomModel {

}

class MyWidget extends VDomRenderer<LauncherModel> {
  /**
   * Construct a new launcher widget.
   */
  constructor(options: any = {}) {
    super();
    this.id = 'xkcd-jupyterlabb';
    this.title.label = 'xkcd.com';
    this.title.closable = true;
    this.addClass('mywidget-container');

    // this._cwd = options.cwd;
    // this._callback = options.callback;
    // this._commands = options.commands;
    // this.addClass(LAUNCHER_CLASS);
  }

  dispose() {
    api
      .getMethod('https://google.com')
      .then((origin) => { console.log('origin', origin) })
  }

  onUpdateRequest() {
    
  }

  protected render(): React.ReactElement<any> {
    const list = [
      { url: 'https://naver.com', name: 'naver' },
      { url: 'https://google.com', name: 'google' },
    ]

    return (
      <div>
        {list.map((data, key) => {
          return (
            <div key={key} onClick={() => console.log('click', data.name)}>
              <a href={data.url}>{data.name}</a>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MyWidget;