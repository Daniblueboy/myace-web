'use client';

import { useAutoScrollRow } from '@/hooks/useAutoScrollRow';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  photoUrl?: string | null;
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

// Mary's photo is a standing full-body shot (unlike everyone else's tighter
// headshot), so object-cover's default center crop cuts off her face —
// shift the crop window up for just this one image.
const PHOTO_POSITION: Record<string, string> = {
  'fallback-team-client-service': 'object-[center_12%]',
};

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const { ref, handlers } = useAutoScrollRow<HTMLDivElement>({ itemCount: members.length });

  return (
    <div
      ref={ref}
      {...handlers}
      className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl lg:mx-auto"
    >
      {members.map((member) => (
        <div key={member.id} className="glass-card backdrop-blur-lg shrink-0 w-[65%] snap-center bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm p-6 text-center lg:w-auto lg:shrink">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className={`h-28 w-28 rounded-full object-cover mx-auto mb-4 ${PHOTO_POSITION[member.id] || ''}`}
            />
          ) : (
            <div className="h-28 w-28 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-red-800 text-white text-2xl font-semibold">
              {initials(member.name)}
            </div>
          )}
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
