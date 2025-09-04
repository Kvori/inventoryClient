import { SegmentType } from "./types";

export const CustomIdFieldsSelectorOptions = [
    {
        value: SegmentType.Fixed,
        title: 'Fixed'
    },
    {
        value: SegmentType.Bit20,
        title: '20-bit random'
    },
    {
        value: SegmentType.Bit32,
        title: '32-bit random'
    },
    {
        value: SegmentType.Digit6,
        title: '6-digit random'
    },
    {
        value: SegmentType.Digit9,
        title: '9-digit random'
    },
    {
        value: SegmentType.UUID,
        title: 'GUID'
    },
    {
        value: SegmentType.Timestamp,
        title: 'Date/time'
    },
    {
        value: SegmentType.Sequence,
        title: 'Sequence'
    },
]
