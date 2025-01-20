export type TBox = {
    x: number,
    y: number,
    width: number
    height: number
}
export default function ImageHighlighter({src,  highlights}: { src: string, highlights: TBox[]}) {
  return (
    <div className={`${src ? "relative inline-block p-3 w-full" : "hidden"}`}>
        <img src={src} alt="Skin Image" className="w-full h-full block rounded-md object-cover" />
        {highlights.map((box, index) => (
            <div key={index} style={{
                position: "absolute",
                top: `${box.x}px`, 
                left: `${box.y}px`,
                width: `${box.width}px`,
                height: `${box.height}px`,
                border: `2px solid red`,
                zIndex: 20
            }} />
        ))}
    </div>
  )
}
