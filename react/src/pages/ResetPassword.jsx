/*
  
  Read user's details through email link (for example purposes, instead of an email link, it will read the current logged in user)
  "Please choose your new password:" Input
  "Enter password again:" Input
  "Confirm" button appears. When clicked, updates database and redirects to the Request Submitted page

  Input Sanitisation:
    Do not allow SQL injection, etc.
    Hash the password !!!
    Ensure both passwords match
    Ensure the password is: longer than 5 characters, includes a capital letter, a number and a symbol

  Error Catching:
    These passwords do not match. (If don't match)
    This password is not allowed. (SQL Injection)
    Please ensure your password is longer than 5 characters and includes at least one: capital letter, number and symbol (!, ?, *) (Meet these standards)
    There was an issue submitting your request. Please try again later or contact us if you are experiencing issues. (If the request submission doesn't work for some reason)

    Disallow anyone to get to this page unless they clicked on an email link (emails may not be functional at this point)

*/

function ForgotPassword() {
  return (
    <div>Something</div>
  )
}

export default ForgotPassword