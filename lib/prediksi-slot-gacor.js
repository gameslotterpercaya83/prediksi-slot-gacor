'use babel';

import PrediksiSlotGacorView from './prediksi-slot-gacor-view';
import { CompositeDisposable } from 'atom';

export default {

  prediksiSlotGacorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.prediksiSlotGacorView = new PrediksiSlotGacorView(state.prediksiSlotGacorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.prediksiSlotGacorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'prediksi-slot-gacor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.prediksiSlotGacorView.destroy();
  },

  serialize() {
    return {
      prediksiSlotGacorViewState: this.prediksiSlotGacorView.serialize()
    };
  },

  toggle() {
    console.log('PrediksiSlotGacor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
