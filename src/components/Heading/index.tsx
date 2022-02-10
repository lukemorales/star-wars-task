import { AllHTMLAttributes } from 'react';

type HeaderNumbers = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = AllHTMLAttributes<HTMLHeadingElement> & {
  as: `h${HeaderNumbers}`;
};

const Heading = ({ as: As, children, className, ...attrs }: HeadingProps) => (
  <As className={`text-center ${className || ''}`} {...attrs}>
    {children}
  </As>
);

export default Heading;
