import { LightningElement, track } from 'lwc';

const columns = [
  {
    label: 'Topic',
    fieldName: 'topic'
  }
];

export default class TopicInfos extends LightningElement {
  @track data = [];
  @track columns = columns;

  getTopics() {
    return [{"topic": "pairing"}, {"topic": "phone"}, {"topic": "Speedbit Blaze"}, {"topic": "iPhone"}];
    // return [];
  }

  connectedCallback() {
    this.data = this.getTopics();
  }
}