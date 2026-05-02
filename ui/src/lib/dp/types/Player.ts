import type {BaseballPosition} from "$lib/dp/types/BaseballPosition.ts";
import type {Handedness} from "$lib/dp/types/Handedness.ts";
import type {Media} from "$lib/dp/types/MediaData.ts";

export interface Player {
  uid?: number;
  pid?: number;
  fullname: string;
  firstname: string;
  lastname: string;
  birthday: number;
  admission: string;
  number: string;
  throwing: Handedness;
  batting: Handedness;
  coach: string;
  slug?: string;
  bsm_id: number;
  media: Media[];
  positions: BaseballPosition[];
  teams: { uid: number; name: string }[];
}
