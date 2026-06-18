'use client';
import { useState } from 'react';
import { RemixStudio } from './RemixStudio';
import { RemixGallery } from './RemixGallery';

export interface RemixData {
  id:          string;
  user_id:     string;
  photo_id:    string;
  image_path:  string;
  votes_count: number;
  created_at:  string;
  image_url:   string;
  profiles:    { pseudo: string } | null;
}

interface Tableau {
  id:        string;
  title:     string;
  thumbnail: string;
}

interface Props {
  tableaux:       Tableau[];
  initialRemixes: RemixData[];
  votedPhotoIds:  string[];
  currentUserId:  string;
}

export function RemixClientPage({ tableaux, initialRemixes, votedPhotoIds, currentUserId }: Props) {
  const [remixes,  setRemixes]  = useState<RemixData[]>(initialRemixes);
  const [voted,    setVoted]    = useState<string[]>(votedPhotoIds);

  function handleCreated(remix: RemixData) {
    setRemixes(prev => [remix, ...prev]);
  }

  function handleVoteSuccess(remixId: string, photoId: string) {
    setRemixes(prev =>
      prev.map(r => r.id === remixId ? { ...r, votes_count: r.votes_count + 1 } : r),
    );
    setVoted(prev => [...prev, photoId]);
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Studio</h2>
        <RemixStudio tableaux={tableaux} onCreated={handleCreated} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Galerie des remixes
          <span className="ml-2 text-sm font-normal text-gray-400">({remixes.length})</span>
        </h2>
        <RemixGallery
          remixes={remixes}
          votedPhotoIds={voted}
          currentUserId={currentUserId}
          onVoteSuccess={handleVoteSuccess}
        />
      </section>
    </div>
  );
}
