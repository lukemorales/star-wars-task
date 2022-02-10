import { PropsWithChildren } from 'react';

const Container = ({ children }: PropsWithChildren<unknown>) => (
  <div className="text-center d-flex flex-column align-items-center justify-content-between">
    {children}
  </div>
);

export default Container;
