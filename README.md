Braze integrated into a React app with Express in the backend.

To get started,

**1.** Clone this repo onto your machine by running this command in your IDE terminal:

git clone https://github.com/yromashov/Braze-React-Integration.git

**2.** cd into Braze-React-Integration by typing this into your IDE terminal:

cd Braze-React-Integration

**3.** Then, run this command in the terminal :

npm i

**4.** After you cloned the repo and downloaded all the dependencies, go into the client/app.js file and replace the values in this object within that file with all your necessary information from your Braze Dashboard (make sure to leave all the quotes in):
```
const [keys, setKeys] = useState({
    sdkEndpoint: "your sdk endpoint here",   
    appIdentifierApiKey: "your app identifier here",    
    apiEndpoint: "your rest api endpoint here",    
    restApiKey: "your rest api key here",    
  });
```
**5.** To see this site in action on the web, type this into the IDE Terminal:

npm run start-dev

You will now be able to see this site live if you go to http://localhost:3000/ in your browser!

For reference:

[Braze Docs](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup/)
[Braze Web SDK JS reference](https://js.appboycdn.com/web-sdk/5.0/doc/modules/braze.html)
