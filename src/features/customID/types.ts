export enum SegmentType {
  Fixed = 'fixed',
  Bit20 = '20bit',
  Bit32 = '32bit',
  Digit6 = '6digit',
  Digit9 = '9digit',
  UUID = 'uuid',
  Timestamp = 'timestamp',
  Sequence = 'sequence',
}

export interface IdSegment {
  type: SegmentType,
  value: number | string,
  position: number
}
