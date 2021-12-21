import React from 'react';
import { Navigation, Page, TopBar} from '@shopify/polaris';
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

export default function SideMenu() {
    return (
        <Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Home',
        icon: HomeMajor,
      },
    ]}
  />
  <Navigation.Section
 title = "MANAGE YOUR BUSINESS"
 items={[
  {
    url: '/path/to/place',
    label: 'Chats',
    icon: ChatMajor,
    badge: '15',
  },
  {
    url: '/path/to/place',
    label: 'Clients',
    icon: CustomersMajor,
  },
  {
    url: '/path/to/place',
    label: 'Orders',
    icon: OrdersMajor,
    badge: '2',
  },
  {
    url: '/path/to/place',
    label: 'Revenue',
    icon: AnalyticsMajor,
  },
  {
    url: '/path/to/place',
    label: 'Services',
    icon: ProductsMajor,
  },
 ]}
 />
  <Navigation.Section
    title="GROW YOUR BUSINESS"
    items={[
      {
        url: '/path/to/place',
        label: 'Coupons',
        icon: DiscountsMajor,
      },
      {
        url: '/path/to/place',
        label: 'Leads',
        icon: SocialAdMajor,
      },
    ]}
  />
    <Navigation.Section
    title="SETUP YOUR BUSINESS"
    items={[
      {
        url: '/path/to/place',
        label: 'Business Profile',
        icon: ProfileMajor,
        selected: true
      },

    ]}
  />
</Navigation>
    )
}
