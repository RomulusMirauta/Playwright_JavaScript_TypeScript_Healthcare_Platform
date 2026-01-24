import { test, expect } from '@playwright/test';
import { extractId } from './extract-id';

test.describe('extractId helper', () => {
  test('returns id when id is present (number)', () => {
    expect(extractId({ id: 123 })).toBe(123);
  });

  test('returns id when id is present (string)', () => {
    expect(extractId({ id: 'abc' })).toBe('abc');
  });

  test('returns drugId or patientId when present', () => {
    expect(extractId({ drugId: 55 })).toBe(55);
    expect(extractId({ patientId: 'p-1' })).toBe('p-1');
  });

  test('returns DrugID / PatientID (capitalized) when present', () => {
    expect(extractId({ DrugID: 77 })).toBe(77);
    expect(extractId({ PatientID: 'P99' })).toBe('P99');
  });

  test('prefers id over other keys', () => {
    expect(extractId({ id: 1, drugId: 2, DrugID: 3 })).toBe(1);
  });

  test('returns undefined for null/undefined or missing keys', () => {
    expect(extractId(undefined)).toBeUndefined();
    expect(extractId(null)).toBeUndefined();
    expect(extractId({ foo: 'bar' } as any)).toBeUndefined();
  });
});
