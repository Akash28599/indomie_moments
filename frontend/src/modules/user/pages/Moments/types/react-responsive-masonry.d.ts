declare module 'react-responsive-masonry' {
  import * as React from 'react';

  interface MasonryProps {
    children: React.ReactNode;
    columnsCountBreakPoints?: Record<number, number>;
    gutter?: string | number;
    className?: string;
  }

  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}
