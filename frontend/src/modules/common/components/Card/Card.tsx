import MuiCard from '@mui/material/Card';
import type { CardProps as MuiCardProps } from '@mui/material/Card';

export type CardProps = MuiCardProps;

export function Card(props: CardProps) {
  return <MuiCard {...props} />;
}
