import type { GamagoriReference, ComprehensiveDictionary } from "@/types";
import ref from "@/data/gamagori-reference.json";
import dict from "@/data/gamagori-comprehensive-dictionary.json";

export function loadGamagoriReference(): GamagoriReference {
  return ref as GamagoriReference;
}

export function loadComprehensiveDictionary(): ComprehensiveDictionary {
  return dict as ComprehensiveDictionary;
}
