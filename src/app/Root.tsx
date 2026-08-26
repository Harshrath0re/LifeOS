import React from 'react';
import { RootNavigation } from '../navigation/RootNavigation';
import { Providers } from './Providers';
import { Bootstrap } from './Bootstrap';

export const Root: React.FC = () => {
  return (
    <Providers>
      <Bootstrap>
        <RootNavigation />
      </Bootstrap>
    </Providers>
  );
};
