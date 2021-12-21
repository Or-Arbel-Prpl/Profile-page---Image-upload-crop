import React from 'react';
import './App.css';
import {Frame, Heading, Navigation, Page, TopBar} from '@shopify/polaris';
import {
  HomeMajor,
  ChatMajor,
  CustomersMajor,
  OrdersMajor,
  AnalyticsMajor,
  ProductsMajor,
  DiscountsMajor,
  SocialAdMajor,
  ProfileMajor,

} from '@shopify/polaris-icons';
import TopNav from './components/TopNav'
import PageContent from './components/PageContent';
import SideMenu from './components/SideMenu';

const navigationMarkup = <SideMenu/>;
const topBarMarkup = <TopNav/>;


function App() {
  return (
    <React.Fragment>
    {/* <div className="App"> */}
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
      >
          {/* <TopNav/> */}
          {/* <SideMenu/> */}
          <PageContent/>
      </Frame>


    {/* </div> */}
    </React.Fragment>
  );
}

export default App;
