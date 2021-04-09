import React from 'react';
import { Button, Header, Icon, Modal} from 'semantic-ui-react';

function  Notification(payload)  {
    const [open, setOpen] = React.useState(true)
    console.log("we are here")
    return (
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
      >
        <Header icon>
          <Icon name='archive' />
          {payload.notification.title}
        </Header>
        <Modal.Content>
          <p>
           {payload.notification.body}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

export default Notification;