export interface Paises {
  name:         Name;
  tld?:         string[];
  cca2:         string;
  ccn3?:        string;
  cca3:         string;
  cioc?:        string;
  independent?: boolean;
  status:       Status;
  unMember:     boolean;
  currencies?:  Currencies;
  idd:          Idd;
  capital?:     string[];
  altSpellings: string[];
  region:       Region;
  subregion?:   string;
  languages?:   { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders?:     string[];
  area:         number;
  demonyms?:    Demonyms;
  flag?:        string;
  maps:         Maps;
  population:   number;
  gini?:        { [key: string]: number };
  fifa?:        string;
  car:          Car;
  timezones:    string[];
  continents:   Continent[];
  flags:        CoatOfArms;
  coatOfArms:   CoatOfArms;
  startOfWeek:  StartOfWeek;
  capitalInfo:  CapitalInfo;
  postalCode?:  PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side:   Side;
}

export enum Side {
  Left = "left",
  Right = "right",
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

export interface Currencies {
  SEK?: Aed;
  ALL?: Aed;
  VUV?: Aed;
  MUR?: Aed;
  GBP?: Aed;
  EUR?: Aed;
  XOF?: Aed;
  GEL?: Aed;
  BTN?: Aed;
  INR?: Aed;
  NAD?: Aed;
  ZAR?: Aed;
  UYU?: Aed;
  GGP?: Aed;
  USD?: Aed;
  UGX?: Aed;
  CHF?: Aed;
  KRW?: Aed;
  CUC?: Aed;
  CUP?: Aed;
  NOK?: Aed;
  XCD?: Aed;
  PYG?: Aed;
  JEP?: Aed;
  LAK?: Aed;
  QAR?: Aed;
  DOP?: Aed;
  BAM?: BAM;
  PAB?: Aed;
  MMK?: Aed;
  BBD?: Aed;
  KHR?: Aed;
  KES?: Aed;
  STN?: Aed;
  DKK?: Aed;
  FOK?: Aed;
  CZK?: Aed;
  SHP?: Aed;
  UAH?: Aed;
  DJF?: Aed;
  TOP?: Aed;
  AUD?: Aed;
  XAF?: Aed;
  LBP?: Aed;
  UZS?: Aed;
  TVD?: Aed;
  BMD?: Aed;
  SSP?: Aed;
  CRC?: Aed;
  GMD?: Aed;
  XPF?: Aed;
  BZD?: Aed;
  KID?: Aed;
  MZN?: Aed;
  AZN?: Aed;
  SDG?: BAM;
  ERN?: Aed;
  MYR?: Aed;
  KWD?: Aed;
  NZD?: Aed;
  MAD?: Aed;
  SOS?: Aed;
  SGD?: Aed;
  BWP?: Aed;
  IDR?: Aed;
  MKD?: Aed;
  TZS?: Aed;
  SZL?: Aed;
  BOB?: Aed;
  SBD?: Aed;
  THB?: Aed;
  HRK?: Aed;
  BIF?: Aed;
  AED?: Aed;
  FKP?: Aed;
  MWK?: Aed;
  BDT?: Aed;
  CAD?: Aed;
  JMD?: Aed;
  TND?: Aed;
  CVE?: Aed;
  AWG?: Aed;
  NGN?: Aed;
  IQD?: Aed;
  ZWL?: Aed;
  GNF?: Aed;
  GHS?: Aed;
  KGS?: Aed;
  MOP?: Aed;
  BHD?: Aed;
  ETB?: Aed;
  GIP?: Aed;
  IMP?: Aed;
  PKR?: Aed;
  HNL?: Aed;
  HTG?: Aed;
  TTD?: Aed;
  CDF?: Aed;
  VES?: Aed;
  MRU?: Aed;
  EGP?: Aed;
  TJS?: Aed;
  JPY?: Aed;
  ILS?: Aed;
  JOD?: Aed;
  MXN?: Aed;
  PGK?: Aed;
  RSD?: Aed;
  ARS?: Aed;
  OMR?: Aed;
  MVR?: Aed;
  DZD?: Aed;
  KPW?: Aed;
  COP?: Aed;
  RWF?: Aed;
  MGA?: Aed;
  MDL?: Aed;
  NPR?: Aed;
  AFN?: Aed;
  SAR?: Aed;
  ZMW?: Aed;
  TRY?: Aed;
  YER?: Aed;
  KMF?: Aed;
  ANG?: Aed;
  BGN?: Aed;
  BRL?: Aed;
  LSL?: Aed;
  HUF?: Aed;
  GTQ?: Aed;
  CLP?: Aed;
  SLL?: Aed;
  BND?: Aed;
  SCR?: Aed;
  PEN?: Aed;
  RON?: Aed;
  CNY?: Aed;
  MNT?: Aed;
  LYD?: Aed;
  HKD?: Aed;
  GYD?: Aed;
  PHP?: Aed;
  PLN?: Aed;
  AMD?: Aed;
  AOA?: Aed;
  CKD?: Aed;
  RUB?: Aed;
  KYD?: Aed;
  TMT?: Aed;
  SYP?: Aed;
  KZT?: Aed;
  BYN?: Aed;
  LKR?: Aed;
  LRD?: Aed;
  ISK?: Aed;
  BSD?: Aed;
  WST?: Aed;
  VND?: Aed;
  FJD?: Aed;
  NIO?: Aed;
  TWD?: Aed;
  IRR?: Aed;
  SRD?: Aed;
}

export interface Aed {
  name:   string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Idd {
  root?:     string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:      string;
  official:    string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

export enum StartOfWeek {
  Monday = "monday",
  Sunday = "sunday",
  Turday = "turday",
}

export enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}
