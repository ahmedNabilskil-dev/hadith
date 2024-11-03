export interface MaqsadI {
  _id: number;
  icon: string;
  short_title: string;
  title: string;
  ketab: Ketab[];
}

export interface Ketab {
  _id: number;
  maqsad_id: number;
  ketab_ayah: any;
  title: string;
}
