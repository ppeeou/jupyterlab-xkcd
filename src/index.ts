import {
  JupyterLab, JupyterLabPlugin, ILayoutRestorer
} from '@jupyterlab/application';

import {
  ICommandPalette, InstanceTracker
} from '@jupyterlab/apputils'

import {
  JSONExt // new
} from '@phosphor/coreutils';

import {
  Widget
} from '@phosphor/widgets';

import XkcdWidget from './XkcdWidget';

import '../style/index.css';

function activate(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer) {
  console.log('JupyterLab extension jupyterlab_xkcd is activated!');

  let widget: XkcdWidget = new XkcdWidget();

  const command: string = 'xkcd:open';
  app.commands.addCommand(command, {
    label: 'Create xkcd lab',
    execute: () => {
      console.log('widget',widget)
      if (!widget) {
        widget = new XkcdWidget();
        widget.update();
      }

      if (!tracker.has(widget)) {
        tracker.add(widget);
      }

      if (!widget.isAttached) {
        app.shell.addToMainArea(widget);
      } else {
        widget.update();
      }

      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({ command, category: 'XKCD-LAB' });
  let tracker = new InstanceTracker<Widget>({ namespace: 'xkcd' });
  restorer.restore(tracker, {
    command,
    args: () => JSONExt.emptyObject,
    name: () => 'xkcd',
  })
}

/**
 * Initialization data for the jupyterlab_xkcd extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_xkcd',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate: activate,
};

export default extension;
