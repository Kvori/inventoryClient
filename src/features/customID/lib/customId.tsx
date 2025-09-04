import seedrandom from 'seedrandom';
import { v5 as uuidv5 } from 'uuid';
import { IdSegment, SegmentType } from '../types';

export class CustomId {
  private seed: string;
  private sequence: number;

  constructor(seed: string | number, sequence: number) {
    this.seed = String(seed);
    this.sequence = sequence
  }

  generate20Bit(): number {
    const rng = seedrandom(this.seed);
    return Math.floor(rng() * (2 ** 20));
  }

  generate32Bit(): number {
    const rng = seedrandom(this.seed);
    return Math.floor(rng() * (2 ** 32));
  }

  generate6Digit(): number {
    const rng = seedrandom(this.seed);
    return Math.floor(rng() * 900_000) + 100_000;
  }

  generate9Digit(): number {
    const rng = seedrandom(this.seed);
    return Math.floor(rng() * 900_000_000) + 100_000_000;
  }

  generateUUID(): string {
    return uuidv5(this.seed, uuidv5.URL);
  }

  getTimestamp(): string {
    return new Date().toISOString();
  }

  getSequence(length: number): string {
    const sequenceFormated = String(this.sequence).slice(0, length)
    return sequenceFormated
  }

  static create(
    seed: string | number,
    sequence: number,
    segments: IdSegment[]
  ): string {
    const newCustomId = new CustomId(seed, sequence);

    const result = [...segments]
      .sort((a, b) => a.position - b.position)
      .map(segment => {
        switch (segment.type) {
          case SegmentType.Fixed:
            return segment.value;
          case SegmentType.Bit20:
            return newCustomId.generate20Bit();
          case SegmentType.Bit32:
            return newCustomId.generate32Bit();
          case SegmentType.Digit6:
            return newCustomId.generate6Digit();
          case SegmentType.Digit9:
            return newCustomId.generate9Digit();
          case SegmentType.UUID:
            return newCustomId.generateUUID();
          case SegmentType.Timestamp:
            return newCustomId.getTimestamp();
          case SegmentType.Sequence:
            return newCustomId.getSequence(1);
          default:
            throw new Error(`Неверный тип сегмента: ${segment.type}`);
        }
      });

    return result.join('_');
  }
}
