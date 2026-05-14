export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="absolute -top-32 -left-32 size-[36rem] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.35)_0%,_transparent_60%)] blur-3xl animate-[aurora-1_18s_ease-in-out_infinite]" />
      <div className="absolute -right-32 top-20 size-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.30)_0%,_transparent_60%)] blur-3xl animate-[aurora-2_22s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 left-1/3 size-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.22)_0%,_transparent_60%)] blur-3xl animate-[aurora-3_26s_ease-in-out_infinite]" />

      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(40px, 30px) scale(1.08); }
          66%      { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-60px, 40px) scale(1.1); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(50px, -40px) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[aurora-1_18s_ease-in-out_infinite\\],
          .animate-\\[aurora-2_22s_ease-in-out_infinite\\],
          .animate-\\[aurora-3_26s_ease-in-out_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  );
}
