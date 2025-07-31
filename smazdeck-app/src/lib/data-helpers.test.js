import { describe, it, expect } from 'vitest';
import {
  getAllSmazs,
  getSmazById,
  getTraits,
  getTierLists,
} from './data-helpers.js';

describe('Data Helpers', () => {
  describe('getAllSmazs', () => {
    it('should return an array of Smazs with IDs and slugs', () => {
      const smazs = getAllSmazs();
      expect(Array.isArray(smazs)).toBe(true);
      expect(smazs.length).toBeGreaterThan(0);

      // Check first Smaz has required properties
      const firstSmaz = smazs[0];
      expect(firstSmaz).toHaveProperty('id');
      expect(firstSmaz).toHaveProperty('name');
      expect(firstSmaz).toHaveProperty('slug');
      expect(firstSmaz).toHaveProperty('skills');
    });

    it('should generate unique IDs for each Smaz', () => {
      const smazs = getAllSmazs();
      const ids = smazs.map(smaz => smaz.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });
  });

  describe('getSmazById', () => {
    it('should return a Smaz by ID', () => {
      const smazs = getAllSmazs();
      const firstSmazId = smazs[0].id;
      const smaz = getSmazById(firstSmazId);

      expect(smaz).toBeTruthy();
      expect(smaz.id).toBe(firstSmazId);
    });

    it('should return null for non-existent ID', () => {
      const smaz = getSmazById('non-existent-id');
      expect(smaz).toBeNull();
    });
  });

  describe('getTraits', () => {
    it('should return traits data with proper structure', () => {
      const traits = getTraits();
      expect(traits).toHaveProperty('traits');
      expect(traits.traits).toHaveProperty('battle_traits');
      expect(traits.traits).toHaveProperty('production_traits');
    });
  });

  describe('getTierLists', () => {
    it('should load tier lists with processed Smaz data', async () => {
      const tierLists = await getTierLists();
      expect(typeof tierLists).toBe('object');

      // Check if at least one tier list was loaded
      const tierListKeys = Object.keys(tierLists);
      expect(tierListKeys.length).toBeGreaterThan(0);

      // Check structure of first tier list
      const firstTierList = tierLists[tierListKeys[0]];
      if (firstTierList) {
        expect(firstTierList).toHaveProperty('title');
        expect(firstTierList).toHaveProperty('tiers');
        expect(Array.isArray(firstTierList.tiers)).toBe(true);
      }
    });
  });
});
