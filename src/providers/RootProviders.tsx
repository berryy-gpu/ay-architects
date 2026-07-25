import type { ReactNode } from "react";

import { LenisProvider } from "@/providers/LenisProvider";

interface RootProvidersProps {
  children: ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  return <LenisProvider>{children}</LenisProvider>;
}
