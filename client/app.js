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
  useEffect(() => {
    initialize("your API key here", {
      enableLogging: true,
      baseUrl: "your SDK endpoint here",
      serviceWorkerLocation: "/service-worker.js",
    });
    automaticallyShowInAppMessages();
    requestContentCardsRefresh();
    openSession();
    getUser().getUserId(function (userId) {
      console.log("The user is " + userId);
      setUser(userId);
    });
  }, []);

  const sendMessage = async () => {
    try {
      const res = await Axios.post(
        "your REST API endpoint here/messages/send",
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
            Authorization: "Bearer your API key here",
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
        "your REST API endpoint here/messages/send",
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
            Authorization: "Bearer your API key here",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [user, setUser] = useState("");

  const [values, setValues] = useState({
    userId: "",
  });

  const [value2, setValue2] = useState({
    email: "",
  });

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [color, setColor] = useState("");

  const handleIdInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      userId: event.target.value,
    }));
  };

  const handleEmailInputChange = (event) => {
    event.persist();
    setValue2((value2) => ({
      ...value2,
      email: event.target.value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUser(values.userId);
    setUser(values.userId);
    setValues({ userId: "" });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    getUser().setEmail(value2.email);
    logCustomEvent(`Updated Email to ${value2.email}`);
    setValue2({ email: "" });
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
      <h3>Made with React and Express in backend (with some Axios sprinkled in)</h3>
      <h2>The user now is {user}</h2>
      <br />
      <br />
      <input
        type="text"
        placeholder="Chosen ID"
        name="userId"
        value={values.userId}
        onChange={handleIdInputChange}
      />
      <button onClick={handleSubmit}>Change User</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Your email"
        name="email"
        value={value2.email}
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
      <button onClick={sendMeContentCard}>
        Send me a Content Card!
      </button>
    </div>
  );
};

export default App;
