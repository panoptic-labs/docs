import React, { useState } from 'react';
import './EmailSignup.css';

const EMAIL_FORM_URL= "https://script.google.com/macros/s/AKfycbwDZCLGxMYHX9Vyc4iwSnT14mEsi8LoEGDfRyooy1_tLVnHu5yxTmE1x4KQzbTRTkNY/exec"

const EmailSignUp = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    fetch(EMAIL_FORM_URL, {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      }
    }).catch(error => {
      console.log(error);
    });
  };

  return (
      <div className="email-signup">
        <p className="email-signup-header">Get the latest updates</p>
        {submitted ? (
        <p className="thank-you-message">Thanks for subscribing!</p>
        ) : (
            <form onSubmit={handleSubmit} className='email-signup-form'>
              <input 
                type="email" 
                className="email-input" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button type="submit" disabled={submitted} className="signup-button">{submitted ? "Done" : "Submit"}</button>
            </form>
        )}
      </div>
    )
}

export default EmailSignUp;