import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

class StripeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.total
    };
  }

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        name="Shoobay" // the pop-in header title
        description="Shoos what you like" // the pop-in header subtitle
        // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
        ComponentClass="div"
        panelLabel="Pay Now" // prepended to the amount in the bottom pay button
        amount={this.state.total} // cents
        currency="CAD"
        stripeKey="pk_test_rTunijSwxzcDoAQW0SuvMScu006Ejl022o"
        locale="en"
        email="support@shoobay.com"
        allowRememberMe // "Remember Me" option (default true)
        token={() => fetch('/clear-cart')} // submit callback
        opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
        closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
        // you are using multiple stripe keys
      >
        {/* <button className="btn btn-primary">
          Use your own child component, which gets wrapped in whatever component
          you pass into as "ComponentClass" (defaults to span)
        </button> */}
      </StripeCheckout>
    );
  }
}

export default connect()(StripeButton);
