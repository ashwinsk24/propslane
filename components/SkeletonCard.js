export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-slate-200 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-6 w-1/2 bg-slate-200 rounded"></div>
        <div className="h-4 w-3/4 bg-slate-200 rounded mt-2"></div>
        <div className="flex space-x-4 mt-4 border-t pt-3">
          <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
          <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
