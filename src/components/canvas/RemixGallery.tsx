'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { RemixData } from './RemixClientPage';

interface Props {
  remixes:       RemixData[];
  votedPhotoIds: string[];
  currentUserId: string;
  onVoteSuccess: (remixId: string, photoId: string) => void;
}

export function RemixGallery({ remixes, votedPhotoIds, currentUserId, onVoteSuccess }: Props) {
  const [voting, setVoting] = useState<string | null>(null);
  const [err,    setErr]    = useState<string | null>(null);

  const voted = new Set(votedPhotoIds);

  async function vote(remix: RemixData) {
    if (voted.has(remix.photo_id) || remix.user_id === currentUserId) return;
    setVoting(remix.id);
    setErr(null);

    const res  = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remixId: remix.id, photoId: remix.photo_id }),
    });
    const json = await res.json() as { error?: string };

    if (!res.ok) {
      setErr(json.error ?? 'Erreur lors du vote.');
      setVoting(null);
      return;
    }

    onVoteSuccess(remix.id, remix.photo_id);
    setVoting(null);
  }

  if (remixes.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic text-center py-10">
        Aucun remix partagé pour l'instant — soyez le premier !
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {remixes.map(r => {
          const isOwn    = r.user_id === currentUserId;
          const hasVoted = voted.has(r.photo_id);
          const isVoting = voting === r.id;

          return (
            <article key={r.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={r.image_url}
                  alt={`Remix par ${r.profiles?.pseudo ?? 'inconnu'}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-500 truncate">
                  par{' '}
                  <span className="font-medium text-gray-700">
                    {r.profiles?.pseudo ?? '—'}
                  </span>
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-gray-700 tabular-nums">
                    {r.votes_count}
                  </span>
                  <button
                    onClick={() => vote(r)}
                    disabled={isOwn || hasVoted || isVoting}
                    title={
                      isOwn
                        ? 'Vous ne pouvez pas voter pour votre propre remix'
                        : hasVoted
                          ? 'Déjà voté pour ce tableau'
                          : 'Voter pour ce remix'
                    }
                    aria-label={`Voter pour le remix de ${r.profiles?.pseudo ?? 'inconnu'} — ${r.votes_count} vote${r.votes_count !== 1 ? 's' : ''}`}
                    className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                      hasVoted
                        ? 'bg-indigo-100 text-indigo-600 cursor-default'
                        : isOwn
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50'
                    }`}
                  >
                    {isVoting ? '…' : hasVoted ? '✓ Voté' : '♥ Voter'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
