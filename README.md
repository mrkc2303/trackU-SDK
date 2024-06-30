<h1>@mrkc2303/tracku-sdk</h1>

Link: https://www.npmjs.com/package/@mrkc2303/tracku-sdk

<p>
TrackU SDK is a cutting-edge analytics tool designed to track user activities across web3 and web2 applications seamlessly. Leveraging on-chain edge functions provided by Fleek, this SDK offers reduced latency, minimized overhead, auto-scaling capabilities, cost-effective pricing, and self-sovereignty. Our goal is to bridge the gap between web3 and web2 ecosystems, providing all applications with the robust benefits of web3 infrastructure. <br> <br>
By providing a comprehensive, secure, and scalable solution, we empower developers and businesses to leverage the full potential of web3 infrastructure while gaining invaluable insights into their user base. Join us in bringing the future of analytics to the present, and enjoy the myriad benefits that TrackU offers.
<br> <br>
This SDK can be used to track user interactions, page views, custom events, errors, and performance metrics.
</p>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)


## ➤ Installation
To install the TrackU SDK, run the following command:
```
npm install @mrkc2303/tracku-sdk
```
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Initialization
To initialize the SDK, you need to provide your API key and project ID from the Dashboard.
```javascript
import TrackU from '@mrkc2303/tracku-sdk';

const apiKey = 'YOUR_API_KEY';
const projectId = 'YOUR_PROJECT_ID';

const trackingSDK = new TrackU(apiKey, projectId);

```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Methods
* ```setUser(userId, userDetails)```
Sets the user ID and user details for tracking purposes. This should be called when a user logs in or when you have user information to track.
```javascript
trackingSDK.setUser('USER_ID', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```
<br>

* ```endSession()``` 
Ends the current user session and tracks the session duration.
```javascript
trackingSDK.endSession();
```
<br>

* ```setupPageViewTracking()```
Tracks a page view, including the current URL and document title.
```javascript
trackingSDK.setupPageViewTracking();
```
<br>

* ```setupInteractionTracking()```
Sets up tracking for user interactions such as clicks and scrolls. This method also sends heatmap data when the user unloads the page.
```javascript
trackingSDK.setupInteractionTracking();
```
<br>

* ```setUpCustomEvent(eventName, properties)```
Tracks a custom event with the specified name and properties.
```javascript
trackingSDK.setUpCustomEvent('custom_event', {
  property1: 'value1',
  property2: 'value2'
});

```
<br>

* ```setUpErrorAndPerformanceEvent()```
Sets up tracking for JavaScript errors and performance metrics.
```javascript
trackingSDK.setUpErrorAndPerformanceEvent()

```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Example
Here’s an example of how to use the TrackU SDK in a React application:
```javascript
import React, { useEffect } from 'react';
import TrackU from '@mrkc2303/tracku-sdk';

function App() {
  useEffect(() => {
    const apiKey = 'YOUR_API_KEY';
    const projectId = 'YOUR_PROJECT_ID';
    const trackingSDK = new TrackU(apiKey, projectId);

    trackingSDK.setUser('USER_ID', { name: 'John Doe' });
    trackingSDK.setupPageViewTracking();
    trackingSDK.setupInteractionTracking();
    trackingSDK.setUpErrorAndPerformanceEvent();

    return () => {
      trackingSDK.endSession();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TrackU</h1>
      </header>
    </div>
  );
}

export default App;


```
