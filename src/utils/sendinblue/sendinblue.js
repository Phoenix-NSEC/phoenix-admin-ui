import axios from "axios";

const SB_API_KEY =
  "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";

// Create a contact in SendinBlue
export const addContact = async (email, name, contact_number) => {
  let firstName, lastName;
  try {
    [firstName, lastName] = name.split(" ");
  } catch {
    firstName = "";
    lastName = "";
  }
  const contactValue = {
    email: emails,
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      // SMS: contact_number,
    },
    updateEnabled: false,
  };
  return await callSendinBlue("contacts", contactValue);
};

export const addContactToList = (emails, listId) => {
  let data = {
    emails: emails,
  };
  return callSendinBlue(`contacts/lists/${listId}/contacts/add`, data);
};

const callSendinBlue = async (endpoint, data) => {
  return await axios({
    method: "POST",
    url: `https://api.sendinblue.com/v3/${endpoint}`,
    headers: {
      "api-key": SB_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    data: data,
  });
};
