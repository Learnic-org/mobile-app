import React from 'react';
import Study from '../../features/Study/Study';
import Profile from '../../features/Profile/Profile';
import Dictionary from '../../features/Dictionary/Dictionary';
import {Tabs} from '../../core/navigation/navigation';

const tabs = [
  {name: 'Dictionary', Component: Dictionary},
  {name: 'Study', Component: Study},
  {name: 'Profile', Component: Profile},
];

const Home = () => <Tabs tabs={tabs} />;

export default Home;
