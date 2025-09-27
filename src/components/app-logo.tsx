import { CandlestickChart } from 'lucide-react';
import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="bitgro home">
      <CandlestickChart className="h-6 w-6 text-primary" />
      <span className="font-semibold text-lg">bitgro</span>
    </div>
  );
}
