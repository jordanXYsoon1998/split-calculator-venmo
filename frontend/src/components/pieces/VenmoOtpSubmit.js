import React from 'react';
import Field from './Field';

const VenmoOtpSubmit = ({ otp, setOtp, otpSentTo }) => {
  return (
    <React.Fragment>
      <Field
        label={`Enter OTP sent to ${otpSentTo}`}
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={setOtp}
      >
        <i className="hourglass start icon" />
      </Field>
      <button className="ui fluid primary button" type="submit">Submit</button>
    </React.Fragment>
  );
};

export default VenmoOtpSubmit;
