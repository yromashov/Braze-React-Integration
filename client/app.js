import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";

import {
  initialize,
  openSession,
  getUser,
  changeUser,
  logCustomEvent,
  requestPushPermission,
  requestImmediateDataFlush,
  automaticallyShowInAppMessages,
  showContentCards,
  getCachedContentCards,
  requestContentCardsRefresh,
  ModalMessage,
  InAppMessage,
  showInAppMessage,
} from "@braze/web-sdk";

const App = () => {

  const [keys, setKeys] = useState({
    sdkEndpoint: "your sdk endpoint here",   
    appIdentifierApiKey: "your app identifier here",    
    apiEndpoint: "your rest api endpoint here",    
    restApiKey: "your rest api key here",       
  });

  useEffect(() => {
    initialize(keys.appIdentifierApiKey, {
      enableLogging: true,
      baseUrl: keys.sdkEndpoint,
      serviceWorkerLocation: "/service-worker.js",
      allowUserSuppliedJavascript: true,
    });
    automaticallyShowInAppMessages();
    requestContentCardsRefresh();
    openSession();
    let user = getUser().getUserId();
    function settingUser(user) {
      if (user == null) {
        console.log("The user has not been identified yet");
      } else {
        console.log("The user is " + user);
        setUser(user);
      }
    }
    settingUser(user);
  }, []);

  const sendMessage = async () => {
    try {
      const res = await Axios.post(
        `https://${keys.apiEndpoint}/messages/send`,
        {
          external_user_ids: [`${user}`],
          messages: {
            web_push: {
              alert: "Your push here",
              title: "Hey...",
            },
          },
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${keys.restApiKey}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const sendContentCard = async () => {
    try {
      const res = await Axios.post(
        `https://${keys.apiEndpoint}/messages/send`,
        {
          external_user_ids: [`${user}`],
          messages: {
            content_card: {
              type: "CLASSIC",
              title: "Requested Content Card",
              description: "Content Card description",
              time_to_live: 3,
            },
          },
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${keys.restApiKey}`,
          },
        }
      );
      requestContentCardsRefresh();
      requestImmediateDataFlush();
    } catch (err) {
      console.log(err);
    }
  };

  const [user, setUser] = useState("");

  const [userValue, setUserValue] = useState("");

  const [emailValue, setEmailValue] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [color, setColor] = useState("");

  const handleIdInputChange = (event) => {
    event.persist();
    setUserValue(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    event.persist();
    setEmailValue(event.target.value);
  };

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setFirstName(event.target.value);
  };

  const handleLastNameInputChange = (event) => {
    event.persist();
    setLastName(event.target.value);
  };

  const handleColorInputChange = (event) => {
    event.persist();
    setColor(event.target.value);
  };

  const sendMeIAM = () => {
    logCustomEvent("Requesting IAM");
    const message = new ModalMessage("Requested IAM");
    message.slideFrom = InAppMessage.SlideFrom.TOP;
    message.header = "Well...";
    message.animateIn = true;
    message.animateOut = true;
    showInAppMessage(message);
  };

  const handleRegisterPushClick = () => {
    requestImmediateDataFlush();
    requestPushPermission(() => {
      logCustomEvent("Requesting web push");
      requestImmediateDataFlush();
    });
    sendMessage();
  };

  const sendMeContentCard = () => {
    sendContentCard();
    requestContentCardsRefresh();
    getCachedContentCards();
    showContentCards();
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    changeUser(userValue);
    setUser(userValue);
    setUserValue("");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    getUser().setEmail(emailValue);
    logCustomEvent(`Updated Email to ${emailValue}`);
    setEmailValue("");
  };

  const handleFirstNameSubmit = (e) => {
    e.preventDefault();
    getUser().setFirstName(firstName);
    logCustomEvent(`Changed First Name to ${firstName}`);
    setFirstName("");
  };

  const handleLastNameSubmit = (e) => {
    e.preventDefault();
    getUser().setLastName(lastName);
    logCustomEvent(`Changed Last Name to ${lastName}`);
    setLastName("");
  };

  const handleColorSubmit = (e) => {
    e.preventDefault();
    getUser().setCustomUserAttribute("color", `${color}`);
    logCustomEvent(`Changed Color to ${color}`);
    setColor("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Ugene's Sample Braze React app</h1>
      <h3>
        Made with React and Express in backend (with some Axios sprinkled in)
      </h3>
      {user ? (
        <h2>The user now is {user}</h2>
      ) : (
        <h2>The user has not been identified yet</h2>
      )}
      <br />
      <br />
      <input
        type="text"
        placeholder="Chosen ID"
        name="userId"
        value={userValue}
        onChange={handleIdInputChange}
      />
      <button onClick={handleUserSubmit}>Change User</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Your email"
        name="email"
        value={emailValue}
        onChange={handleEmailInputChange}
      />
      <button onClick={handleEmailSubmit}>Change Email</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Your First Name"
        name="firstName"
        value={firstName}
        onChange={handleFirstNameInputChange}
      />
      <button onClick={handleFirstNameSubmit}>Change Your First Name</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Your Last Name"
        name="lastName"
        value={lastName}
        onChange={handleLastNameInputChange}
      />
      <button onClick={handleLastNameSubmit}>Change Your Last Name</button>
      <br />
      <br />
      <p>What is your favorite color?</p>
      <input
        type="text"
        placeholder="Your Favorite Color"
        name="color"
        value={color}
        onChange={handleColorInputChange}
      />
      <button onClick={handleColorSubmit}>Submit</button>
      <br />
      <br />
      <button onClick={handleRegisterPushClick}>Send me a push!</button>
      <br />
      <br />
      <button onClick={sendMeIAM}>Send me an IAM!</button>
      <br />
      <br />
      <button onClick={sendMeContentCard}>Send me a Content Card!</button>
    </div>
  );
};

export default App;
