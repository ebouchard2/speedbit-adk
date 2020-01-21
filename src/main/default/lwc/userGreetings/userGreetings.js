import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';

import USER_ID from '@salesforce/user/Id';

const FIELDS = ['User.FirstName'];

export default class UserGreetings extends LightningElement {
  @track userRecord;
  @track userFirstName;
  @wire(getRecord, { recordId: USER_ID, fields: FIELDS })
    wiredRecord({error, data}) {
      if(error) {
        this.dispatchEvent(
          new ShowToastEvent({
              title: 'Error loading contact',
              error,
              variant: 'error',
          }),
        );
      } else if (data) {
        this.userRecord = data;
        this.userFirstName = this.userRecord.fields.FirstName.value;
      }
    }
}