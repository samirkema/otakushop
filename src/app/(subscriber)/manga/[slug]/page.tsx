// TODO Phase 3 : lecteur manga (scroll vertical webtoon / page par page manga)

export default function MangaReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  void params; // utilisé en Phase 3
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-gray-500">Lecteur disponible en Phase 3.</p>
    </div>
  );
}
