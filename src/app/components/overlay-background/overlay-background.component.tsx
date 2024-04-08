export const OverlayBackground = ({onClick}: {onClick: () => void}) => (
    <div className="fixed top-0 opacity-30 h-screen w-screen bg-black z-40" onClick={onClick}></div>
);