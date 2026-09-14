import "./Image.css"

export function Image(image: string, alt: string)
{
    return (
        <img className="event-image" src={image} alt={alt}/>
    )
}