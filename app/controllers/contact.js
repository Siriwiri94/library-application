import Controller from '@ember/controller';
import { match, not } from '@ember/object/computed';
//import { notEmpty } from '@ember/object/computed';
import { gte } from '@ember/object/computed';
export default Controller.extend({
    emailAddress: '',
    isValid: match('emailAddress', /^.+@.+\..+$/) && gte("message.length", 5),
    //notEmpty('message') ,
    //isBothTrue: and('firstComputedProperty', 'secondComputedProperty'),
    isDisabled: not('isValid'),
    actions: {
        sendMessage() {
            const email = this.get('emailAddress');
            const message = this.get('message');
            const newMessage = this.store.createRecord('message', { email, message });
    
            newMessage.save().then(response => {
            this.set('responseMessage', `Thank you! We saved your message with the following id: ${response.get('id')}`);
            this.set('emailAddress', '');
            this.set('message', '');
            });
        }
    }
});