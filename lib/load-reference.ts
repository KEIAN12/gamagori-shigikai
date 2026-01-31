import type { GamagoriReference } from "@/types";
import ref from "@/data/gamagori-reference.json";

export function loadGamagoriReference(): GamagoriReference {
  return ref as GamagoriReference;
}
