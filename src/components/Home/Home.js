import React from 'react';
import Training from '../../features/Training/Training';
import Profile from '../../features/Profile/Profile';
import Dictionary from '../../features/Dictionary/Dictionary';
import {Tabs} from '../../core/navigation/navigation';

const tabs = [
  {name: 'Dictionary', Component: Dictionary},
  {name: 'Training', Component: Training},
  {name: 'Profile', Component: Profile},
];

const Home = () => <Tabs tabs={tabs} />;

export default Home;
