export interface SearchItem {
  ankama_id: number;
  name: string;
  type: Type;
  level: number;
  image_urls: ImageUrls;
}

export interface ExtendedItem {
  ankama_id: number;
  name: string;
  description: string;
  type: Type;
  is_weapon: boolean;
  level: number;
  pods: number;
  image_urls: ImageUrls;
  effects: Effect[];
  conditions: Condition[];
  critical_hit_probability: number;
  critical_hit_bonus: number;
  is_two_handed: boolean;
  max_cast_per_turn: number;
  ap_cost: number;
  range: Range;
  recipe: Recipe[];
  quantity: number;
}

export interface Resource {
  ankama_id: number;
  name: string;
  description: string;
  type: Type;
  level: number;
  pods: number;
  image_urls: ImageUrls;
}

export interface TAutocompleteItem extends ExtendedItem {
  value: string;
}

export interface Condition {
  operator: string;
  int_value: number;
  element: Element;
}

export interface Element {
  name: string;
  id: number;
}

export interface Effect {
  int_minimum: number;
  int_maximum: number;
  type: EffectType;
  ignore_int_min: boolean;
  ignore_int_max: boolean;
  formatted: string;
}

export interface EffectType {
  name: string;
  id: number;
  is_meta: boolean;
  is_active: boolean;
}

export interface ImageUrls {
  icon: string;
  sd: string;
  hq: string;
  hd: string;
}

export interface Range {
  min: number;
  max: number;
}

export interface Recipe {
  item_ankama_id: number;
  item_subtype: 'resources' | 'consumables' | 'equipment';
  quantity: number;
}

export interface Type {
  name: string;
}

export interface AlmanaxEntry {
  bonus: Bonus;
  date: Date;
  tribute: Tribute;
}

export interface Bonus {
  description: string;
  type: Type;
}

export interface Tribute {
  item: SearchItem;
  quantity: number;
}
