import consumer from '../consumer';

class Room extends React.Component {
  // ...
  enterRoom() {
    // ...
    // Add the following lines to create a subscription:
    this.subscription = consumer.subscriptions.create(
      { channel: 'RoomsChannel', id: roomId },
      {
        received: message => {
          console.log('Received message: ', message)
        }
      }
    );
  }

  componentDidUpdate(/* ...destructured prevProps... */) {
    // ...
    if (prevRoomId !== curRoomId) {
      // Add this line to unsubscribe from previous room upon switching rooms:
      this.subscription?.unsubscribe();
      this.enterRoom();
    } // ...
  }

  // Add a componentWillUnmount to unsubscribe on leaving the room show page:
  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }
  // ...
}