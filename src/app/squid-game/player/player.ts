import { PlayerStatus } from './player-status.constant';

export type Player = {
  id: number;
  name: string;
  avatar: string;
  luckyStar: number;
  status: string;
  selected?: boolean;
};
