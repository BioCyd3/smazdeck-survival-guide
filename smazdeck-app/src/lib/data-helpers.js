import smazsData from '../data/smazs.json';
import traitsData from '../data/traits.json';
import buildsData from '../data/builds/best_battle_builds.json';
import teamCompsData from '../data/builds/team-comps.json';
import campUpgradesData from '../data/game_mechanics/camp_upgrades.json';
import techTreeData from '../data/game_mechanics/tech_tree_buffs.json';

// Process smazs data to add a unique ID
const getAllSmazs = () => {
  try {
    if (!smazsData || !Array.isArray(smazsData)) {
      throw new Error('Smazs data is not available or malformed');
    }
    return smazsData.map((smaz, index) => {
      if (!smaz.name) {
        console.warn(`Smaz at index ${index} is missing a name`);
      }
      return {
        ...smaz,
        id: `smaz-${index + 1}`,
        // Generate a URL-friendly slug from the name
        slug: smaz.name
          ? smaz.name
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
          : `smaz-${index + 1}`,
      };
    });
  } catch (error) {
    console.error('Error processing Smazs data:', error);
    return [];
  }
};

// Legacy function name for backward compatibility
const getSmazs = getAllSmazs;

const getSmazById = id => {
  try {
    const smazs = getAllSmazs();
    const smaz = smazs.find(smaz => smaz.id === id || smaz.id === parseInt(id));
    if (!smaz) {
      console.warn(`Smaz with ID ${id} not found`);
      return null;
    }
    return smaz;
  } catch (error) {
    console.error('Error getting Smaz by ID:', error);
    return null;
  }
};

const getTraits = () => {
  try {
    if (!traitsData || !traitsData.traits) {
      throw new Error('Traits data is not available or malformed');
    }
    return traitsData;
  } catch (error) {
    console.error('Error getting traits data:', error);
    return {
      traits: {
        battle_traits: { offensive: [], defensive: [] },
        production_traits: [],
      },
    };
  }
};

const loadTierList = async fileName => {
  try {
    const tierListModule = await import(`../data/tier_lists/${fileName}.json`);
    const tierListData = tierListModule.default;

    if (!tierListData || !tierListData.tiers) {
      throw new Error(
        `Tier list ${fileName} is missing required data structure`
      );
    }

    // Process tier list to replace Smaz names with full Smaz objects
    const smazs = getAllSmazs();
    const processedTierList = {
      ...tierListData,
      tiers: tierListData.tiers.map(tier => ({
        ...tier,
        entries: tier.entries.map(entry => {
          const smaz = smazs.find(s => s.name === entry.name);
          return {
            ...entry,
            smaz: smaz || null,
          };
        }),
      })),
    };

    return processedTierList;
  } catch (error) {
    console.error(`Error loading tier list ${fileName}:`, error);
    throw error;
  }
};

const getTierLists = async () => {
  try {
    // List of available tier lists
    const tierListFiles = [
      'overall_battle_tier_list',
      'pure_dps_tier_list',
      'backline_dps_tier_list',
      'frontline_hybrid_tier_list',
      'tank_bruiser_tier_list',
      'support_debuff_tier_list',
      'rage_skill_tier_list',
      'offensive_battle_trait_tier_list',
      'defensive_battle_trait_tier_list',
      'production_pal_tier_list',
    ];

    const tierLists = {};

    // Load all tier lists
    for (const fileName of tierListFiles) {
      try {
        tierLists[fileName] = await loadTierList(fileName);
      } catch (error) {
        console.warn(`Failed to load tier list ${fileName}:`, error);
        // Continue loading other tier lists even if one fails
      }
    }

    return tierLists;
  } catch (error) {
    console.error('Error loading tier lists:', error);
    return {};
  }
};

const loadBuilds = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!buildsData || !buildsData.best_battle_builds) {
          reject(new Error('Builds data is not available or malformed'));
          return;
        }
        resolve(buildsData);
      }, 500);
    });
  } catch (error) {
    console.error('Error loading builds data:', error);
    throw error;
  }
};

const loadTeamComps = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!teamCompsData || !teamCompsData.team_composition_guide) {
          reject(
            new Error('Team compositions data is not available or malformed')
          );
          return;
        }
        resolve(teamCompsData);
      }, 500);
    });
  } catch (error) {
    console.error('Error loading team compositions data:', error);
    throw error;
  }
};

const loadCampUpgrades = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!campUpgradesData || !campUpgradesData.camp_upgrades) {
          reject(new Error('Camp upgrades data is not available or malformed'));
          return;
        }
        resolve(campUpgradesData);
      }, 500);
    });
  } catch (error) {
    console.error('Error loading camp upgrades data:', error);
    throw error;
  }
};

const loadTechTreeBuffs = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!techTreeData || !techTreeData.tech_tree_buffs) {
          reject(new Error('Tech tree data is not available or malformed'));
          return;
        }
        resolve(techTreeData);
      }, 500);
    });
  } catch (error) {
    console.error('Error loading tech tree data:', error);
    throw error;
  }
};

export {
  getAllSmazs,
  getSmazs, // Legacy function name for backward compatibility
  getSmazById,
  getTraits,
  loadTierList,
  getTierLists,
  loadBuilds,
  loadTeamComps,
  loadCampUpgrades,
  loadTechTreeBuffs,
};
