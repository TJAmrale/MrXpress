/*

  Needs the Nav Bar along the top
  Needs to connect to the 'Become a Technician' Heading in the NAV bar
  Needs to have same css/styling as the rest of the website

  Identity check:
    User must be logged in as a customer - if not, redirect to sign in page with the message "Please sign in to continue."
    If logged in, check if user ID is found in the technician table; if so, redirect to the index page and give error message "You are already a technician!"

  Will have the following fields:
    Full Name (auto-filled)
    Email (auto-filled)
    DOB (auto-filled) --oh gosh this needs to be in the users table in db !
    Phone Number (auto-filled)
    Address (auto-filled)

    "Is this information correct?" Yes/No
    If No:
    "Please edit your information through /My Profile/"
    If Yes:
    "Confirm Submission" button appears. When clicked, redirects to the Request Submitted page.
    Information is sent to the Admin's inbox (this may not be functional at this point) -- may need a RequestForm table in the database?

    Error catching:
      There was an issue submitting your request. Please try again later or contact us if you are experiencing issues. (If the request submission doesn't work for some reason)

*/

function BecomeATechnician() {
  return (
    <div>Something</div>
  )
}

export default BecomeATechnician