export interface Listing<T> {
  data: {
    children: Array<Data<T>>;
    after: string;
    before: string | null;
    dist: number;
    modhash: string | null;
  };
  kind: "Listing";
}

export interface Data<T> {
  data: T;
  kind: string;
}

export type LoadType = "more" | "refresh";
