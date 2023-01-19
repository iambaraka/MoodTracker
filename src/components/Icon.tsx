import React, { FunctionComponent, PropsWithChildren } from 'react';

import { Svg } from 'react-native-svg';

type SvgProps = React.ComponentProps<typeof Svg>;

export const Icon: FunctionComponent<PropsWithChildren<SvgProps>> = ({
  children,
  ...props
}) => {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill={props.color}
      stroke={props.color}
      strokeWidth="2"
      {...props}
    >
      {children}
    </Svg>
  );
};

export type IconProps = {
  color?: string;
  size?: number;
};
